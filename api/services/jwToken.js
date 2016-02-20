/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var
    jwt = require('jsonwebtoken'),
    tokenSecret = sails.config.globals.authentication.secret;

// Generates a token from supplied payload
module.exports.issue = function (payload) {
    return jwt.sign(
        payload,
        tokenSecret
        ////////////////No Expire//////////
        //tokenSecret, // Token Secret that we sign it with
        //{
        //  expiresInMinutes: 180 // Token Expire time
        //}
    );
};

// Verifies token on a request
module.exports.verify = function (token, callback) {
    return jwt.verify(
        token, // The token to be verified
        tokenSecret, // Same token we used to sign
        {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
        callback //Pass errors or decoded token to callback
    );
};

// Gets the User ID from the Token
module.exports.getUserId = function (token) {
    var token_clean = token.split(' ')[1];
    var verified = jwt.verify(token_clean, sails.config.globals.authentication.secret);
    return verified.id;
};

// Gets the Token clean
module.exports.getToken = function (token) {
    return token.split(' ')[1];
};
