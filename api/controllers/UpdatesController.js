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
        if (update.message.text){
            var text = update.message.text;

            sails.log.debug("Message: ", update.message.text);
            var command = commands.processIt(text);
            sails.log.debug("Command: ", command);
            if(command.commandId==0 || !command){
                telegram.sendMessage(userId, "Ups, eso no me lo esperaba... 驴Te has equivocado?").then(
                    function (response) {
                        sails.log.debug("Message Sent", response);
                    }, function (error) {
                        sails.log.error("Failed", error);
                    }
                );
            }else if(command.commandType==2) {
                telegram.sendMessage(userId, "翸uchas gracias!").then(
                    function (response) {
                        sails.log.debug("Message Sent", response);
                    }, function (error) {
                        sails.log.error("Failed", error);
                    }
                );
            }else if(command.commandType==1){
                switch(command.commandId){
                    case 1:
                        telegram.sendMessage(userId, "隆Bienvenidx!, para empezar env铆a una foto").then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                        break;
                    case 2:
                        telegram.sendMessage(userId, "Si la informaci贸n est谩 relacionada con:\n\n"+
                            "Campa帽as de comunicaci贸n institucionales o con medios de comunicaci贸n,\n ->pulsa A\n\n"+
                            "Acceso y permanencia en el sistema educativo o con el Tercer Sector,\n ->pulsa B\n\n"+
                            "Reducci贸n de las desigualdades y la exclusi贸n social,\n ->pulsa C\n\n"+
                            "Transparencia, participaci贸n ciudadan铆a o rendici贸n de cuentas,\n ->pulsa D\n\n"+
                            "Otros temas,\n ->pulsa E", "", true, null, null).then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                        break;
                }
            }

        } else if (update.message.photo) {
            sails.log.info("Photo content: ", update.message.photo);
            telegram.sendMessage(userId, "Si la informaci贸n est谩 relacionada con:\n\n"+
                "Campa帽as de comunicaci贸n institucionales o con medios de comunicaci贸n,\n ->pulsa A\n\n"+
                "Acceso y permanencia en el sistema educativo o con el Tercer Sector,\n ->pulsa B\n\n"+
                "Reducci贸n de las desigualdades y la exclusi贸n social,\n ->pulsa C\n\n"+
                "Transparencia, participaci贸n ciudadan铆a o rendici贸n de cuentas,\n ->pulsa D\n\n"+
                "Otros temas,\n ->pulsa E", "", true, null, keyboards.createKeyboard()).then(
                function (response) {
                    sails.log.debug("Message Sent", response);
                }, function (error) {
                    sails.log.error("Failed", error);
                }
            );
        } else {
            telegram.sendMessage(userId, "Ups, eso no me lo esperaba... 驴Te has equivocado?").then(
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

