/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Policy for restrict update requests by means of the host.
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

module.exports = function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    sails.log.error("TELEGRAM HOST------: "+ ip);


    next();
};