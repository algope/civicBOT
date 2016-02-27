/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Policy for restrict update requests by means of the user ID
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

module.exports = function (req, res, next) {
    var token = req.headers.authorization;
    var user_id_requested = req.params.id;
    var user_id_token = jwToken.getUserId(token);

    if (user_id_requested != user_id_token) { //If the user making the request !match, 403
        return res.forbbiden('You are not authorized to perform this action');
    }
    next();
};