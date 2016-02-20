/**
 * PrivateController
 *
 * @description :: Server-side logic for managing privates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var useragent = require('useragent');
var requestIp = require('request-ip');
var nodemailer = require('nodemailer');
var fs = require('fs');
var ejs = require('ejs');
var bcrypt = require('bcrypt');
var flash = require('express-flash');

module.exports = {

    login: function (req, res) {
        var agent = useragent.lookup(req.headers['user-agent']);
        var ip = requestIp.getClientIp(req);
        var email = req.param('email');
        var password = req.param('password');

        if (!email || !password) {
            return res.json(401, {err: 'email and password required'});
        }

        Admin.findOne({email: email}, function (err, user) {

            if (!user) {
                return res.json(401, {err: 'invalid email or password'});
            }
            Admin.comparePassword(password, user, function (err, valid) {
                if (err) {
                    return res.json(403, {err: 'forbidden'});
                }

                if (!valid) {
                    return res.json(401, {err: 'invalid email or password'});
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

    getPartyList: function (req, res){

    },

    getLocationList: function (req, res){

    },



    setParty: function (req, res){

    },

    setMedia: function (req, res){

    },

    setLocation: function (req, res){
        var id= req.body.contribId;
        var location = req.body.locationId;

        if(!id || !location){
            return res.badRequest("Parameters Expected");
        }
        else{
            Location.find({id: id}).exec(function (ko, ok){
                if(ko){
                    res.serverError(ko);
                }
                else if(ok){
                    var name = ok.name;
                    Classify.update({id:id},{location:name}).exec(function (ko, ok){
                        if(ko){
                            res.serverError(ko);
                        }else if(ok){
                            res.ok(ok);
                        }

                    });

                }

            })
        }

    },

    setLabel: function (req, res){

    }
	
};

