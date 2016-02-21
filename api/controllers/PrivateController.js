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
            return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
        }
        Admin.create(req.body).exec(function (err, user) {
            if (err) {
                return res.json(err.status, {err: err});
            }
            // If user created successfuly we return user and token as response
            if (user) {
                var generatedToken = jwToken.issue({id: user.user_id});
                Token.create({
                    token: generatedToken,
                    user_id: user.user_id,
                    isValid: true,
                    os: agent.os.toString(),
                    agent: agent.toAgent(),
                    device: agent.device.toString(),
                    ip: requestIp.getClientIp(req)

                }, function (err, success) {
                    if (err) {
                        sails.log.error("Error updating Token DB entry " + err);
                    }
                    if (success) {

                        sails.log.verbose("Token for User ID: " + user.user_id + " Generated");
                        sails.log.verbose("Issued token for user: " + user.user_id);

                        res.json(200, {user: user, token: generatedToken});
                    }
                });
            }
        });
    },

    login: function (req, res) {
        var agent = useragent.lookup(req.headers['user-agent']);
        var ip = requestIp.getClientIp(req);
        var email = req.param('email');
        var password = req.param('password');

        if (!email || !password) {
            return res.badRequest("Email and Password required");
        }
        Admin.findOne({email: email}, function (err, user) {

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

                    Token.findOne({user_id: user.user_id, isValid: true}, function (err, tokenFound) {
                        if (err) {
                            sails.log.error("Error getting Token from DB: " + err);
                        }

                        if (tokenFound) {
                            sails.log.verbose("Found Token with ID: " + tokenFound.id);
                            Token.update({token: tokenFound.token}, {isValid: false}, function (err, updated) {
                                if (err) {
                                    sails.log.error("Error updating Token DB entry " + err);
                                }
                                if (updated) {
                                    sails.log.verbose("Token id: " + tokenFound.id + " Invalidated");
                                    var generatedToken = jwToken.issue({id: user.user_id});
                                    Token.create({
                                        token: generatedToken,
                                        user_id: user.user_id,
                                        isValid: true,
                                        os: agent.os.toString(),
                                        agent: agent.toAgent(),
                                        device: agent.device.toString(),
                                        ip: ip

                                    }, function (err, success) {
                                        if (err) {
                                            sails.log.error("Error updating Token DB entry " + err);
                                        }
                                        if (success) {

                                            sails.log.verbose("Token for User ID: " + user.user_id + " Generated");
                                            sails.log.verbose("Issued token for user: " + user.user_id);

                                            res.json(200, {
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
                                user_id: user.user_id,
                                isValid: true,
                                os: agent.os.toString(),
                                agent: agent.toAgent(),
                                device: agent.device.toString(),
                                ip: requestIp.getClientIp(req)

                            }, function (err, success) {
                                if (err) {
                                    sails.log.error("Error updating Token DB entry " + err);
                                }
                                if (success) {

                                    sails.log.verbose("Token for User ID " + user.user_id + " Generated");
                                    sails.log.verbose("Issued token for user: " + user.user_id);

                                    res.json(200, {
                                        session: success
                                    });
                                }
                            });

                        }
                    });
                }
            });
        })
    },

    logout: function (req, res) {
        var token = req.headers.authorization;
        var user_id_token = jwToken.getUserId(token);
        Token.findOne({user_id: user_id_token, token: jwToken.getToken(token)}, function (err, tokenFound) {
            if (err) {
                sails.log.verbose("Error invalidating Token, Token not found, clean DB to prevent this again");
                res.json(200, {msg: "Bye!"});
            }

            if (tokenFound) {

                Token.update({token: tokenFound.token}, {isValid: false}, function (err, updated) {
                    if (err) {
                        sails.log.error("Error updating Token DB entry");
                    }

                    if (updated) {
                        sails.log.verbose("Token from User ID " + user_id_token + " Invalidated");
                        res.json(200, {msg: "Bye!"});
                    }

                })
            }
        });

    },

    getPartyList: function (req, res) {
        Party.find().exec(function(ko, parties){
            if(ko){
                res.serverError(ko);
            }
            else if(parties){
                res.ok(parties);
            }

        });

    },

    getLocationList: function (req, res) {

    },

    getContributionList: function (req, res){

    },

    setParty: function (req, res) {

    },

    setMedia: function (req, res) {

    },

    setLocation: function (req, res) {
        var id = req.body.contribId;
        var location = req.body.locationId;

        if (!id || !location) {
            return res.badRequest("Parameters Expected");
        }
        else {
            Location.find({id: id}).exec(function (ko, ok) {
                if (ko) {
                    res.serverError(ko);
                }
                else if (ok) {
                    var name = ok.name;
                    Classify.update({id: id}, {location: name}).exec(function (ko, ok) {
                        if (ko) {
                            res.serverError(ko);
                        } else if (ok) {
                            res.ok(ok);
                        }

                    });

                }

            })
        }

    },

    setLabel: function (req, res) {

    },

    setToPublish: function (req, res){

    }



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

