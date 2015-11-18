/**
 * HolaController
 *
 * @description :: Server-side logic for managing holas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  setBotToken: function(req, res){
    global.TelegramToken = req.param('token');
    res.json(200, {msg: "ok"});
  },

  setWebHook: function(req, res){
    var webHookUrl = req.param('url');
    sails.log(webHookUrl);
    telegram.setWebHook(webHookUrl).then(
      function(response){
        res.json(200, response);
        BotToken.create({token: req.body.token}, function(err, success){
          if (err) {
            return sails.log.error("Error updating Token DB entry " + err);
          }
          if (success) {
            return sails.log("Updated Token Database");
          }
        })
      }, function(error) {
        return sails.log.error("Telegram Web Hook --> Failed: ", error);
      }
    );
  }

/*
  sendMessage: function(req, res){
    telegram.sendMessage("108416823", "Esto es una prueba").then(
      function(response) {
        res.json(response);
      }, function(error) {
        sails.log.error("Failed", error);
      }
    )
  }
 */
};


