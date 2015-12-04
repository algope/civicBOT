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

        var text = update.message.text;
        var command = commands.processIt(text);
        sails.log.debug("Message: ", update.message.text);
        sails.log.debug("Command: ", command);

        stages.findOrCreateEntry({user_id: userId}, {user_id: userId, stage: 1}).then(
            function (user) {
                if (user.stage == 1) { //Initial stage
                    if (command.commandId == 0 || !command) {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    } else if (command.commandType == 1) {
                        switch (command.commandId) {
                            case 1: //start
                                telegram.sendMessage(userId, "Hola " + userName + ", encantado de conocerte!\n" +
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
                                telegram.sendMessage(userId, "Para enviar información, escribe: /enviar_info\n\n" +
                                    "Para volver a empezar, escribe /start\n\n" +
                                    "Para enviarnos una sugerencia sobre civicBOT, escribe /sugerencia", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                stages.updateStage({user_id: userId}, {stage: 2}).then(
                                    function (response) {
                                        sails.log.debug("Updated Stage", response);
                                    }, function (error) {
                                        sails.log.error("FAILED updating stage", error);
                                    }
                                );
                                break;
                        }
                    } else {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }

                } else if (user.stage == 2) { //Command /enviar_info executed

                    if (command.commandId == 0 || !command) {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    } else if (command.commandType == 1) {
                        switch (command.commandId) {
                            case 1: //start
                                telegram.sendMessage(userId, "Hola " + userName + ", encantado de conocerte!\n" +
                                    "Mi nombre es civicBOT y te ayudaré a enviar y clasificar la información sobre la actuación de los partidos políticos.\n" +
                                    "Para empezar a enviar información, escribe: /enviar_info ").then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                stages.updateStage({user_id: userId}, {stage: 1}).then(
                                    function (response) {
                                        sails.log.debug("Updated Stage", response);
                                    }, function (error) {
                                        sails.log.error("FAILED updating stage", error);
                                    }
                                );

                                break;
                            case 2: //ayuda
                                telegram.sendMessage(userId, "Ahora dinos qué tipo de información quieres hacernos llegar: TEXTO o IMAGEN.\n\n" +
                                    "Para volver a empezar, escribe /start", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                stages.updateStage({user_id: userId}, {stage: 10}).then(
                                    function (response) {
                                        sails.log.debug("Updated Stage", response);
                                    }, function (error) {
                                        sails.log.error("FAILED updating stage", error);
                                    }
                                );
                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                stages.updateStage({user_id: userId}, {stage: 2}).then(
                                    function (response) {
                                        sails.log.debug("Updated Stage", response);
                                    }, function (error) {
                                        sails.log.error("FAILED updating stage", error);
                                    }
                                );
                                break;
                        }
                    } else if (command.commandType == 3) {
                        switch (command.commandId) {
                            case 1: //TEXTO
                                telegram.sendMessage(userId, "Ahora escribe el texto que quieras enviarnos:\n\n", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                            case 2: //IMAGEN
                                telegram.sendMessage(userId, "Ahora envía la imagen:\n\n", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;

                        }
                        stages.updateStage({user_id: userId}, {stage: 3}).then(
                            function (response) {
                                sails.log.debug("Updated Stage", response);
                            }, function (error) {
                                sails.log.error("FAILED updating stage", error);
                            }
                        );

                    }
                    else {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }

                } else if (user.stage == 3) { //Data type selected

                    if (command.commandId == 0 || !command) {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    } else if (command.commandType == 1) {
                        switch (command.commandId) {
                            case 1: //start
                                telegram.sendMessage(userId, "Hola " + userName + ", encantado de conocerte!\n" +
                                    "Mi nombre es civicBOT y te ayudaré a enviar y clasificar la información sobre la actuación de los partidos políticos.\n" +
                                    "Para empezar a enviar información, escribe: /enviar_info ").then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                stages.updateStage({user_id: userId}, {stage: 1}).then(
                                    function (response) {
                                        sails.log.debug("Updated Stage", response);
                                    }, function (error) {
                                        sails.log.error("FAILED updating stage", error);
                                    }
                                );

                                break;
                            case 2: //ayuda
                                telegram.sendMessage(userId, "Ahora envía la información del tipo que has seleccionado anteriormente.\n\n" +
                                    "Para volver a seleccionar un tipo de información distinto, escribe /enviar_info \n\n" +
                                    "Para volver a empezar, escribe /start", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, null).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                stages.updateStage({user_id: userId}, {stage: 10}).then(
                                    function (response) {
                                        sails.log.debug("Updated Stage", response);
                                    }, function (error) {
                                        sails.log.error("FAILED updating stage", error);
                                    }
                                );
                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        sails.log.debug("Message Sent", response);
                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                stages.updateStage({user_id: userId}, {stage: 2}).then(
                                    function (response) {
                                        sails.log.debug("Updated Stage", response);
                                    }, function (error) {
                                        sails.log.error("FAILED updating stage", error);
                                    }
                                );
                                break;
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
                                sails.log.debug("Message Sent", response);
                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }

                } else if (user.stage == 4) { //Data recieved, not labeled

                } else if (user.stage == 5) { //

                }

            }
        );


        /*else if (command.commandType == 3) {
         telegram.sendMessage(userId, "¡Muchas gracias!").then(
         function (response) {
         sails.log.debug("Message Sent", response);
         }, function (error) {
         sails.log.error("Failed", error);
         }
         );
         }*/


        /*
         else if (update.message.photo) {
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

