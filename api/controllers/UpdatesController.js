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
        var messageId = update.message.message_id;
        var photo = null;
        var message = "";
        var classification = "";
        var isAPhoto = false;

        Updates.create(req.body, function (err, newUpdate) {
            if (err) {
                sails.log.error("Database error: ", err);
            }
            if (newUpdate) {
                sails.log.debug("New update entry into DB");
            }
        });

        if (update.message.text) {
            stages.findOrCreateEntry({user_id:userId}, {user_id:userId, stage:1}).then(
                function (user){
                    if(user.stage == 1){
                        sails.log.error("HOLIIIIIIIIII, el usuario se encuentra en STAGE 1");
                    }

                }
            );


            var text = update.message.text;
            var command = commands.processIt(text);
            sails.log.debug("Message: ", update.message.text);
            sails.log.debug("Command: ", command);
            if (command.commandId == 0 || !command) {
                telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                    function (response) {
                        sails.log.debug("Message Sent", response);
                    }, function (error) {
                        sails.log.error("Failed", error);
                    }
                );
            } else if (command.commandType == 2) {
                telegram.sendMessage(userId, "¡Muchas gracias!").then(
                    function (response) {
                        sails.log.debug("Message Sent", response);
                    }, function (error) {
                        sails.log.error("Failed", error);
                    }
                );
            } else if (command.commandType == 1) {
                switch (command.commandId) {
                    case 1: //start
                        telegram.sendMessage(userId, "Hola "+userName+", encantado de conocerte!\n" +
                            "Mi nombre es civicBOT y te ayudaré a enviar y clasificar la información sobre la actuación de los partidos políticos.\n" +
                            "Para empezar a enviar información, escribe: /enviar_info ").then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                        break;
                    case 2: //ayuda
                        telegram.sendMessage(userId, "Si la información está relacionada con:\n\n" +
                            "Campañas de comunicación institucionales o con medios de comunicación,\n ->pulsa A\n\n" +
                            "Acceso y permanencia en el sistema educativo o con el Tercer Sector,\n ->pulsa B\n\n" +
                            "Transparencia, participación o rendición de cuentas,\n ->pulsa C\n\n" +
                            "Otros temas,\n ->pulsa D", "", true, null, null).then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                        break;
                    case 3: //sugerencias
                        telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n" , "", true, null, null).then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                        break;
                    case 4: //enviar_info
                        telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n" , "", true, null, keyboards.createKeyboard(2)).then(
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
            telegram.sendMessage(userId, "Si la información está relacionada con:\n\n" +
                "Campañas de comunicación institucionales o con medios de comunicación,\n ->pulsa A\n\n" +
                "Acceso y permanencia en el sistema educativo o con el Tercer Sector,\n ->pulsa B\n\n" +
                "Transparencia, participación o rendición de cuentas,\n ->pulsa C\n\n" +
                "Otros temas,\n ->pulsa D", "", true, null, keyboards.createKeyboard(1)).then(
                function (response) {
                    sails.log.debug("Message Sent", response);
                }, function (error) {
                    sails.log.error("Failed", error);
                }
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

