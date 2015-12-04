/**
 * UpdatesController
 *
 * @description :: Server-side logic for managing Updates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init('');

module.exports = {

    update: function (req, res) {
        var update = req.body;
        var userId = update.message.from.id;
        var userName = update.message.from.first_name;
        var userLast = update.message.from.last_name;
        var userAlias = update.message.from.username;
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
                mixpanel.track("Update", {
                    distinct_id: update.update_id,
                    from: userId,
                    user_id: userAlias,
                    text: update.message.text,
                    photo: update.message.photo
                });
            }
        });

        if (update.message.text) {
            var text = update.message.text;
            var command = commands.processIt(text);
        } else command = false;

        sails.log.debug("Message: ", update.message.text);
        sails.log.debug("Command: ", command);

        stages.findOrCreateEntry({user_id: userId}, {user_id: userId, stage: 1}).then(
            function (user) {
                mixpanel.people.set(userId, {
                    "$first_name": userName,
                    "$last_name": userLast,
                    "user_name": userAlias,
                    "$created": user.createdAt,
                    "stage": user.stage,
                    "contributions": 1
                });

                if (user.stage == 1) { //Initial stage

                    if (update.message.photo || command.commandId == 0 || !command) {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

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

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 2: //ayuda
                                telegram.sendMessage(userId, "Para enviar información, escribe: /enviar_info\n\n" +
                                    "Para volver a empezar, escribe /start\n\n" +
                                    "Para enviarnos una sugerencia sobre civicBOT, escribe /sugerencia", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 10}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 2}).then(
                                            function (response) {

                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                        }
                    } else {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }

                } else if (user.stage == 2) { //Command /enviar_info executed

                    if (update.message.photo || command.commandId == 0 || !command) {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

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
                                        stages.updateStage({user_id: userId}, {stage: 1}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );


                                break;
                            case 2: //ayuda
                                telegram.sendMessage(userId, "Ahora dinos qué tipo de información quieres hacernos llegar: TEXTO o IMAGEN.\n\n" +
                                    "Para volver a empezar, escribe /start", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 10}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 2}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                        }
                    } else if (command.commandType == 3) {
                        switch (command.commandId) {
                            case 1: //TEXTO
                                telegram.sendMessage(userId, "Ahora escribe el texto que quieras enviarnos:\n\n", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 3, data_type_selected: 1}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                            case 2: //IMAGEN
                                telegram.sendMessage(userId, "Ahora envía la imagen:\n\n", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 3, data_type_selected: 2}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;

                        }


                    }
                    else {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }

                } else if (user.stage == 3) { //Data type selected

                    if (command && command.commandType == 1) {
                        switch (command.commandId) {
                            case 1: //start
                                telegram.sendMessage(userId, "Hola " + userName + ", encantado de conocerte!\n" +
                                    "Mi nombre es civicBOT y te ayudaré a enviar y clasificar la información sobre la actuación de los partidos políticos.\n" +
                                    "Para empezar a enviar información, escribe: /enviar_info ").then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 1}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                            case 2: //ayuda
                                telegram.sendMessage(userId, "Ahora envía la información del tipo que has seleccionado anteriormente.\n\n" +
                                    "Para volver a seleccionar un tipo de información distinto, escribe /enviar_info \n\n" +
                                    "Para volver a empezar, escribe /start", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 10}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 2}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                        }
                    } else if (update.message.photo && user.data_type_selected == 2) {
                        telegram.sendMessage(userId, "Si la información está relacionada con:\n\n" +
                            "Campañas de comunicación institucionales o con medios de comunicación,\n ->pulsa A\n\n" +
                            "Acceso y permanencia en el sistema educativo o con el Tercer Sector,\n ->pulsa B\n\n" +
                            "Transparencia, participación o rendición de cuentas,\n ->pulsa C\n\n" +
                            "Otros temas,\n ->pulsa D", "", true, null, keyboards.createKeyboard(1)).then(
                            function (response) {
                                UserMedia.create({
                                    user_id: userId,
                                    photo: update.message.photo
                                }, function (err, newUpdate) {
                                    if (err) {
                                        sails.log.error("Error updating USERMEDIA", err);
                                    }
                                    if (newUpdate) {
                                        stages.updateStage({user_id: userId}, {stage: 4}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }

                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );


                    } else if (update.message.text && user.data_type_selected == 1) {
                        telegram.sendMessage(userId, "Si la información está relacionada con:\n\n" +
                            "Campañas de comunicación institucionales o con medios de comunicación,\n ->pulsa A\n\n" +
                            "Acceso y permanencia en el sistema educativo o con el Tercer Sector,\n ->pulsa B\n\n" +
                            "Transparencia, participación o rendición de cuentas,\n ->pulsa C\n\n" +
                            "Otros temas,\n ->pulsa D", "", true, null, keyboards.createKeyboard(1)).then(
                            function (response) {
                                UserMedia.create({user_id: userId, text: text}, function (err, newUpdate) {
                                    if (err) {
                                        sails.log.error("Error updating USERMEDIA");
                                    }
                                    if (newUpdate) {
                                        stages.updateStage({user_id: userId}, {stage: 4}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }

                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );

                    }

                    else {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }

                } else if (user.stage == 4) { //Data recieved, not labeled
                    if (update.message.photo || command.commandId == 0 || !command) {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

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
                                        stages.updateStage({user_id: userId}, {stage: 1}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

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
                                    "Otros temas,\n ->pulsa D", "", true, null, keyboards.createKeyboard(1)).then(
                                    function (response) {

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 10}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 2}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                        }
                    } else if (command.commandType == 2) {
                        telegram.sendMessage(userId, "¡Muchas gracias!", "", true, null, {hide_keyboard: true}).then(
                            function (response) {

                                UserMedia.findOne({user_id: userId}, function (err, found) {
                                    if (err) {
                                        sails.log.error("Error destroying temp db");
                                    }
                                    if (found) {
                                        if (found.photo) {
                                            PhotoLabel.create({
                                                photo: found.photo,
                                                label: command.commandId,
                                                message: update.message.message_id
                                            }, function (err, ok) {
                                                if (err) {
                                                    sails.log.error("ERROR labeling image");
                                                }
                                                if (ok) {
                                                    stages.updateStage({user_id: userId}, {stage: 1}).then(
                                                        function (response) {
                                                            UserMedia.destroy({user_id: userId}, function (ko, ok) {
                                                                if (ko) sails.log.error("ERRROR DESTROYING MEDIA PIC".ko);
                                                                if (ok) mixpanel.people.increment(userId, "contributions");
                                                            });
                                                        }, function (error) {
                                                            sails.log.error("FAILED updating stage", error);
                                                        }
                                                    );
                                                }
                                            })

                                        } else if (found.text) {
                                            TextLabel.create({
                                                text: found.text,
                                                label: command.commandId,
                                                message: update.message.message_id
                                            }, function (err, ok) {
                                                if (err) {
                                                    sails.log.error("ERROR labeling image");
                                                }
                                                if (ok) {
                                                    stages.updateStage({user_id: userId}, {stage: 1}).then(
                                                        function (response) {
                                                            sails.log.debug("DESTROYING MEDIA TEXT");
                                                            UserMedia.destroy({user_id: userId}, function (ko, ok) {
                                                                if (ko) sails.log.error("ERRRO DESTROYING MEDIA TEXT".ko);
                                                            });
                                                        }, function (error) {
                                                            sails.log.error("FAILED updating stage", error);
                                                        }
                                                    );
                                                }
                                            })

                                        }
                                    }
                                });


                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                        //STORE THE IMAGE

                        //DESTROY TEMP RECORD

                    }
                    else {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }

                } else if (user.stage == 10) { //FeedBack

                    if (update.message.photo || command.commandId == 0) {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    } else if (command && command.commandType == 1) {
                        switch (command.commandId) {
                            case 1: //start
                                telegram.sendMessage(userId, "Hola " + userName + ", encantado de conocerte!\n" +
                                    "Mi nombre es civicBOT y te ayudaré a enviar y clasificar la información sobre la actuación de los partidos políticos.\n" +
                                    "Para empezar a enviar información, escribe: /enviar_info ").then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 1}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );


                                break;
                            case 2: //ayuda
                                telegram.sendMessage(userId, "Envíanos tus sugerencias:\n\n", true, null, {hide_keyboard: true}).then(
                                    function (response) {

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                            case 3: //sugerencias
                                telegram.sendMessage(userId, "Escribe la sugerencia que nos quieras hacer llegar:\n\n", "", true, null, {hide_keyboard: true}).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 10}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );

                                break;
                            case 4: //enviar_info
                                telegram.sendMessage(userId, "Selecciona el tipo de información que quieres hacernos llegar:\n\n", "", true, null, keyboards.createKeyboard(2)).then(
                                    function (response) {
                                        stages.updateStage({user_id: userId}, {stage: 2}).then(
                                            function (response) {
                                                sails.log.debug("Updated Stage", response);
                                            }, function (error) {
                                                sails.log.error("FAILED updating stage", error);
                                            }
                                        );

                                    }, function (error) {
                                        sails.log.error("Failed", error);
                                    }
                                );
                                break;
                        }
                    } else if (update.message.text) {
                        telegram.sendMessage(userId, "¡Muchas gracias!", "", true, null, {hide_keyboard: true}).then(
                            function (response) {
                                Feedbacks.create({user_id: userId, text: update.message.text}, function (ko, ok) {
                                    if (ko) sails.log.error("FAILED adding feedback", error);
                                    if (ok) {
                                        mixpanel.track("Feedback", {
                                            distinct_id: update.update_id,
                                            from: userId,
                                            user_id: userAlias,
                                            text: update.message.text,
                                        });

                                    }
                                })

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );

                    } else {
                        telegram.sendMessage(userId, "Ups, eso no me lo esperaba... ¿Te has equivocado?").then(
                            function (response) {
                                mixpanel.track("Error", {
                                    distinct_id: update.update_id,
                                    from: userId,
                                    user_id: userAlias,
                                    text: update.message.text,
                                    photo: update.message.photo,
                                    user_stage: user.stage
                                });

                            }, function (error) {
                                sails.log.error("Failed", error);
                            }
                        );
                    }


                }

            }
        );
        res.json(200);

    }
};

