/**
 * HolaController
 *
 * @description :: Server-side logic for managing holas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    setWebHook: function (req, res) {
        var webHookUrl = req.param('url');
        //Modificado
        req.session.authenticated  = true;
        //this
        sails.log(webHookUrl);
        telegram.setWebHook(webHookUrl).then(
            function (response) {
                res.json(200, response);
                BotToken.create({token: req.body.token}, function (err, success) {
                    if (err) {
                        return sails.log.error("Error updating Token DB entry " + err);
                    }
                    if (success) {
                        return sails.log("Updated Token Database");
                    }
                })
            }, function (error) {
                return sails.log.error("Telegram Web Hook --> Failed: ", error);
            }
        );
    }

};


