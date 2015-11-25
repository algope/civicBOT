/**
 * UpdatesController
 *
 * @description :: Server-side logic for managing Updates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    update: function (req, res) {
        var update = req.body;
        var userId = update.message.from.id;
        var userName = update.message.from.first_name;
        if (update.message.text) {
            var text = update.message.text;

            sails.log.debug("Message: ", update.message.text);
            var command = commands.processIt(text);
            sails.log.debug("Command: ", command);

            if (command) {
                telegram.sendMessage(userId, "Comando procesado correctamente, commandID: " + command).then(
                    function (response) {

                    }, function (error) {
                        sails.log.error("Failed", error);
                    }
                );
            }

        } else if (update.message.photo) {
            sails.log.info("Photo content: ", update.message.photo);
            telegram.sendMessage(userId, "Ahora clasifica la foto...", "", true, null, null).then(
                function (response) {
                    sails.log.debug("Message Sent", response);
                }, function (error) {
                    sails.log.error("Failed", error);
                }
            ).then(
                telegram.sendMessage(userId, "Si la información está relacionada con:\n"+
                    "Reducción de las desigualdades y la exclusión social, pulsa A\n"+
                    "Transparencia, participación ciudadanía o rendición de cuentas, pulsa B\n"+
                    "Acceso y permanencia en el sistema educativo o con el Tercer Sector, pulsa C\n"+
                    "Campañas de comunicación institucionales o con medios de comunicación, pulsa D\n","", true, null, keyboards.createKeyboard()).then(
                    function (response) {
                        sails.log.debug("Message Sent", response);
                    }, function (error) {
                        sails.log.error("Failed", error);
                    }
                )
            );
        } else {
            telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                function (response) {

                }, function (error) {
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

