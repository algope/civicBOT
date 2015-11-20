/**
 * UpdatesController
 *
 * @description :: Server-side logic for managing Updates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  update: function(req, res){
    var update = req.body;
    var userId = update.message.from.id;
    var userName = update.message.from.first_name;
    if(update.message.text){
      var text = update.message.text;

      sails.log("Message: ",update.message.text);

      var command = commands.processIt(text);

      console.log("Command: ",command);
      if (command){
        telegram.sendMessage(userId, "Comando procesado correctamente, commandID: "+command).then(
          function(response) {

          }, function(error) {
            sails.log.error("Failed", error);
          }
        );
      }

    }

    if(update.message.photo){
      sails.log.info("Photo content: ", update.message.photo);
      telegram.sendMessage(userId, "Ahora clasifica la foto...", true, null, keyboards.createKeyboard()).then(
        function(response) {

        }, function(error) {
          sails.log.error("Failed", error);
        }
      );
    }

    else{
      telegram.sendMessage(userId, "¡Gracias!").then(
        function(response) {

        }, function(error) {
          sails.log.error("Failed", error);
        }
      );

    }
    res.json(200);

    /*
    Updates.create(req.body).exec(function(err, message){
      if (err) {
        sails.log.error("Web Hook --> Error", err)
      }
      if (message) {
        sails.log("OK");
      }
    })
    */
  }
};

