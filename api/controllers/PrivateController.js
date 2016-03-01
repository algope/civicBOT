/**
 * PrivateController
 *
 * @description :: Server-side logic for managing privates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var useragent = require('useragent');
var requestIp = require('request-ip');
var fs = require('fs');
var ejs = require('ejs');
var bcrypt = require('bcrypt');
//var flash = require('express-flash');
//var nodemailer = require('nodemailer');

module.exports = {

    create: function (req, res) {
        var agent = useragent.lookup(req.headers['user-agent']);
        if (req.body.password !== req.body.confirmPassword) {
            return res.badRequest({err: 'Password doesn\'t match, What a shame!'});
        }
        Admin.create(req.body).exec(function (err, user) {
            if (err) {
                return res.serverError(err);
            }
            // If user created successfuly we return user and token as response
            if (user) {
                var generatedToken = jwToken.issue({id: user.id});
                Token.create({
                    token: generatedToken,
                    user_id: user.id,
                    isValid: true,
                    os: agent.os.toString(),
                    agent: agent.toAgent(),
                    device: agent.device.toString(),
                    ip: requestIp.getClientIp(req)

                }).exec( function (err, success) {
                    if (err) {
                        sails.log.error("Error updating Token DB entry " + err);
                    }
                    if (success) {

                        sails.log.verbose("Token for User ID: " + user.id + " Generated");
                        sails.log.verbose("Issued token for user: " + user.id);

                        return res.ok({user: user, token: generatedToken});
                    }
                });
            }
        });
    }, //CHECKED!

    login: function (req, res) {
        var agent = useragent.lookup(req.headers['user-agent']);
        var ip = requestIp.getClientIp(req);
        var email = req.param('email');
        var password = req.param('password');

        if (!email || !password) {
            return res.badRequest("Email and Password required");
        }
        Admin.findOne({email: email}).exec(function (err, user) {

            if (!user) {
                return res.badRequest("Invalid Email or Password");
            }
            Admin.comparePassword(password, user, function (err, valid) {
                if (err) {
                    return res.forbidden();
                }

                if (!valid) {
                    return res.badRequest("Invalid Email or Password");
                } else {

                    Token.findOne({user_id: user.id, isValid: true}).exec(function (err, tokenFound) {
                        if (err) {
                            sails.log.error("Error getting Token from DB: " + err);
                        }
                        if (tokenFound) {
                            Token.update({token: tokenFound.token}, {isValid: false}).exec(function (err, updated) {
                                if (err) {
                                    sails.log.error("Error updating Token DB entry " + err);
                                }
                                if (updated) {
                                    sails.log.verbose("Token id: " + tokenFound.id + " Invalidated");
                                    var generatedToken = jwToken.issue({id: user.user_id});
                                    Token.create({
                                        token: generatedToken,
                                        user_id: user.id,
                                        isValid: true,
                                        os: agent.os.toString(),
                                        agent: agent.toAgent(),
                                        device: agent.device.toString(),
                                        ip: ip

                                    }).exec( function (err, success) {
                                        if (err) {
                                            sails.log.error("Error updating Token DB entry " + err);
                                        }
                                        if (success) {

                                            sails.log.verbose("Token for User ID: " + user.id + " Generated");
                                            sails.log.verbose("Issued token for user: " + user.id);

                                            return res.ok({
                                                session: success
                                            });
                                        }
                                    });
                                }
                            });

                        } else {
                            var generatedToken = jwToken.issue({id: user.user_id});
                            Token.create({
                                token: generatedToken,
                                user_id: user.id,
                                isValid: true,
                                os: agent.os.toString(),
                                agent: agent.toAgent(),
                                device: agent.device.toString(),
                                ip: requestIp.getClientIp(req)

                            }).exec( function (err, success) {
                                if (err) {
                                    sails.log.error("Error updating Token DB entry " + err);
                                }
                                if (success) {

                                    sails.log.verbose("Token for User ID " + user.id + " Generated");
                                    sails.log.verbose("Issued token for user: " + user.id);

                                    return res.ok({
                                        session: success
                                    });
                                }
                            });

                        }
                    });
                }
            });
        })
    }, //CHECKED!

    logout: function (req, res) {
        var token = req.headers.authorization;
        var user_id_token = jwToken.getUserId(token);

        sails.log.debug("TOKEN: "+token);
        sails.log.debug("USER_ID_TOKEN: "+user_id_token);

        Token.findOne({user_id: user_id_token, token: jwToken.getToken(token)}).exec( function (err, tokenFound) {
            if (err) {
                sails.log.verbose("Error invalidating Token, Token not found, clean DB to prevent this again");
                return res.ok({msg: "Bye!"});
            }
            sails.log.debug("TOKENFOUND: : : : : "+JSON.stringify(tokenFound));
            if (tokenFound) {

                Token.update({token: tokenFound.token}, {isValid: false}).exec( function (err, updated) {
                    if (err) {
                        sails.log.error("Error updating Token DB entry");
                    }

                    if (updated) {
                        sails.log.verbose("Token from User ID " + user_id_token + " Invalidated");
                        return res.ok({msg: "Bye!"});
                    }

                })
            }
        });

    }, //CHECKED!

    getPartyList: function (req, res) {
        Party.find().exec(function (ko, parties) {
            if (ko) {
               return res.serverError(ko);
            }
            else if (parties) {
                return res.ok(parties);
            }

        });

    },  //CHECKED!

    getLocationList: function (req, res) {
        Location.find().exec(function (ko, locations) {
            if (ko) {
                return res.serverError(ko);
            }
            else if (locations) {
                return res.ok(locations);
            }

        });


    }, //CHECKED!

    getMediaList: function (req, res) {
        Media.find().exec(function (ko, media) {
            if (ko) {
                return res.serverError(ko);
            }
            else if (media) {
                return res.ok(media);
            }

        });

    }, //CHECKED!

    getContributionList: function (req, res) {
        Classify.find().populate(['label', 'party', 'location', 'media']).exec(function (ko, contributions) {
            if (ko) {
                return res.serverError(ko);
            }
            else if (contributions) {
               return res.ok(contributions);
            }

        });

    }, //CHECKED!

    getLabelList: function (req, res) {
        Label.find().exec(function (ko, label) {
            if (ko) {
                return res.serverError(ko);
            }
            else if (label) {
                return res.ok(label);
            }

        });

    }, //CHECKED!


    setParty: function (req, res) {
        var id = req.body.contribId;
        var party = req.body.partyId;

        if (!id || !party) {
            return res.badRequest("Parameters Expected");
        }
        else {

            Classify.update({id: id}, {party: party, edited: 1}).exec(function (ko, ok) {
                if (ko) {
                    return res.serverError(ko);
                } else if (ok) {
                    return res.ok(ok);
                }

            });

        }

    }, //CHECKED!

    setMedia: function (req, res) {
        var id = req.body.contribId;
        var media = req.body.mediaName;
        var mediaId = req.body.mediaId;

        if (!id && (!media || !mediaId)) {
            return res.badRequest("Parameters Expected");
        } else if (media && mediaId) {
            return res.badRequest("Too Many Parameters");
        }
        else {
            if (mediaId) {
                Classify.update({id: id}, {media: mediaId, edited: 1}).exec(function (ko, ok) {
                    if (ko) {
                        return res.serverError(ko);
                    } else if (ok) {
                        return res.ok(ok);
                    }

                });
            } else if (media) {
                Media.create({media: media}).exec(function (ko, ok) {
                    if (ko) {
                        return res.serverError(ko);
                    } else if (ok) {
                        Classify.update({id: id}, {media: ok.id, edited: 1}).exec(function (ko, ok) {
                            if (ko) {
                                return res.serverError(ko);
                            } else if (ok) {
                                return res.ok(ok);
                            }

                        });
                    }
                });
            }


        }

    }, //CHECKED!

    setLocation: function (req, res) {
        var id = req.body.contribId;
        var location = req.body.locationId;

        if (!id || !location) {
            return res.badRequest("Parameters Expected");
        }
        else {

            Classify.update({id: id}, {location: location, edited: 1}).exec(function (ko, ok) {
                if (ko) {
                    return res.serverError(ko);
                } else if (ok) {
                    return res.ok(ok);
                }

            });

        }

    }, //CHECKED!

    setLabel: function (req, res) {
        var id = req.body.contribId;
        var label = req.body.labelId;

        if (!id || !label) {
            return res.badRequest("Parameters Expected");
        }
        else {

            Classify.update({id: id}, {label: label, edited: 1}).exec(function (ko, ok) {
                if (ko) {
                    return res.serverError(ko);
                } else if (ok) {
                    return res.ok(ok);
                }

            });

        }

    }, //CHECKED!

    setToPublish: function (req, res) {
        var id = req.body.contribId;
        var publish = req.body.publish;
        if (!id || publish == undefined) {
            return res.badRequest("Parameters Expected");
        }else if (publish >1){
            return res.badRequest("Wrong Parameter Value");
        }
        else {
            if (publish == 1) {
                Classify.find({id: id}).exec(function (ko, ok) {
                    if (ko) {
                        return res.serverError(ko);
                    } else if (ok) {
                        var isPublished = ok[0].published;
                        if (isPublished == publish) {
                            return res.badRequest("Element Already Published");
                        }
                        else {
                            Classify.update({id: id}, {
                                published: 1,
                                edited: 0
                            }).exec(function (ko, contribution) {
                                if (ko) {
                                    return res.serverError(contribution);
                                } else if (contribution) {
                                    TopLocations.findOrCreate({location: contribution[0].location}, {location: contribution[0].location}).exec(function (ko, topLocation) {
                                        if (ko) {
                                            return res.serverError(ko);
                                        } else if (topLocation) {
                                            topLocation.count++;
                                            topLocation.save(function () {
                                                TopMedia.findOrCreate({media: contribution[0].media}, {media: contribution[0].media}).exec(function (ko, topMedia) {
                                                    if (ko) {
                                                        return res.serverError(ko);
                                                    } else if (topMedia) {
                                                        topMedia.count++;
                                                        topMedia.save(function () {
                                                            TopParties.findOrCreate({party: contribution[0].party}, {party: contribution[0].party}).exec(function (ko, topParty) {
                                                                if (ko) {
                                                                    return res.serverError(ko);
                                                                } else if (topParty) {
                                                                    topParty.count++;
                                                                    topParty.save(function () {
                                                                        return res.ok(contribution);
                                                                    });
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                })
            }
            else if (publish == 0) {
                Classify.update({id: id}, {published: 0, edited: 0}).exec(function (ko, contribution) {
                    if (ko) {
                        return res.serverError(contribution);
                    } else if (contribution) {
                        TopLocations.findOrCreate({location: contribution[0].location}, {location: contribution[0].location}).exec(function (ko, topLocation) {
                            if (ko) {
                                return res.serverError(ko);
                            } else if (topLocation) {
                                topLocation.count--;
                                topLocation.save(function () {
                                    TopMedia.findOrCreate({media: contribution[0].media}, {media: contribution[0].media}).exec(function (ko, topMedia) {
                                        if (ko) {
                                            return res.serverError(ko);
                                        } else if (topMedia) {
                                            topMedia.count--;
                                            topMedia.save(function () {
                                                TopParties.findOrCreate({party: contribution[0].party}, {party: contribution[0].party}).exec(function (ko, topParty) {
                                                    if (ko) {
                                                        return res.serverError(ko);
                                                    } else if (topParty) {
                                                        topParty.count--;
                                                        topParty.save(function () {
                                                            return res.ok(contribution);
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            }
        }
    } //CHECKED!

    /*
     resetPassword: function (req, res) {
     var email = req.param('email');
     var auth = {
     auth: {
     api_key: 'key-582904d973f3e3816807f8b49c826abd',
     domain: ''
     }
     };

     Admin.findOne({email: email}, function (err, user) {
     if (err) {
     return res.json(err.status, {err: err});
     }

     if (user) {
     //var nodemailerMailgun = nodemailer.createTransport(mg(auth));
     //var template = process.cwd() + '/views/emailTemplates/passwordRecovery/html.ejs';

     var token = jwToken.issue({id: user.user_id});


     var host = req.headers.host;

     var emailLink = "http://" + host + "/users/changePassword/?token=" + token;
     fs.readFile(template, 'utf8', function (err, file) {
     if (err) return callback(err);

     var html = ejs.render(file, {emailLink: emailLink});

     //nodemailerMailgun.sendMail({
     //  from: 'hello@hubcivico.org',
     //to: user.email, // An array if you have multiple recipients.
     //subject: 'Seems that you forgot something',
     //'h:Reply-To': '',
     //html: html

     // }, function (err, info) {
     //   if (err) {
     //     console.log('Error: ' + err);
     //}
     //else {
     //console.log('Response: ' + info);
     //}
     //});


     });
     }
     res.send(200, {msg: "Email sent"});

     })

     },

     changePassword: function (req, res) {

     var token = req.param('token');
     var thisToken = "Bearer " + token;

     var user_id_token = jwToken.getUserId(thisToken);

     Users.findOne({user_id: user_id_token}, function (err, user) {
     if (err) {
     return res.json(err.status, {err: err});
     }

     if (user) {
     res.view('resetPassword', {token: token});
     }
     })


     },

     modifyPassword: function (req, res) {
     var token = req.body.token;
     var thisToken = "Bearer " + token;
     var user_id_token = jwToken.getUserId(thisToken);
     if (req.body.password !== req.body.confirmPassword) {
     return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
     }
     var password = req.body.password;

     jwToken.verify(token, function (err, token) {
     if (err) return res.json(401, {err: 'Invalid Token!'});

     if (token) {
     bcrypt.genSalt(10, function (err, salt) {
     if (err) return next(err);
     bcrypt.hash(password, salt, function (err, hash) {
     if (err) sails.log.error("ERROR ecripting password");
     Users.update({user_id: user_id_token}, {encryptedPassword: hash}, function (err, updated) {
     if (err) sails.log.error("ERROR UPDATING PASSWORD");
     res.view('resetPasswordOK');
     });

     })
     });

     }

     });
     },

     deleteUser: function (req, res) {
     var token = req.headers.authorization;
     var user_id_token = jwToken.getUserId(token);
     //TODO HardCoded!
     Admin.destroy({user_id: user_id_token}, function (err, userDeleted) {
     if (err) {
     sails.log.error("Error deleting a user");
     res.json(500, {msg: "Error"});
     }
     if (!err) {
     res.json(200, {msg: "User deleted"});
     }


     })
     },

     checkEmail: function (req, res) {
     var email = req.param('email');

     Admin.findOne({email: email}, function (err, user) {
     if (err) {
     return res.json(err.status, {err: err});
     }

     if (!user) {
     return res.json(200, {code: 0, msg: 'Email not registered'});
     }
     if (user) {
     return res.json(200, {code: 1, msg: 'Email already exists'})
     }

     })
     },
     */

};

