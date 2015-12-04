/**
 * Created by joamolpe on 04/12/2015.
 */
* isAuthenticated
*
* @module      :: Policy
* @description :: Simple policy to allow any authenticated user
*                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
* @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
    *
*/
module.exports = function (req, res, next) {

    if (req.session.authenticated){
         return next();
    }
    if (req.session.authenticated) return next();

    return res.forbidden('You are not permitted to perform this action.');
};
