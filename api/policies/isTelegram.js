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
    var host = req.headers.host;

    sails.log.error("TELEGRAM HOST------: "+ req.toString());


    next();
};