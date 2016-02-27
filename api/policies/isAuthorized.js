/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {
    var token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.badRequest('Format is Authorization: Bearer [token]');
        }
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        return res.badRequest('No Authorization header was found');
    }

    jwToken.verify(token, function (err, token) {
        if (err) return res.badRequest('Invalid Token!');
        req.token = token; // This is the decrypted token or the payload you provided
        var tokenToFind = jwToken.getToken(req.headers.authorization);
        Token.findOne({token: tokenToFind}, function (err, find) {
            if (err) {
                sails.log.error("Error trying to find a Token in the Token DB, clean DB to prevent this happen again: ", err);
            }
            if (find) {
                if (!find.isValid) {
                    return res.badRequest('Token expired, log in again');
                }
            }
        });
        next();
    });
};

