/**
 * UpdatesController
 *
 * @description :: Server-side logic for managing Telegram Updates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Mixpanel = require('mixpanel');
//var mixpanel = Mixpanel.init('');

module.exports = {

    update: function (req, res) {
        var update = req.body;
        var userId = update.message.from.id;
        var userName = update.message.from.first_name;
        var userLast = update.message.from.last_name;
        var userAlias = update.message.from.username;
        if (update.message.text) {
            var text = update.message.text;
            var command = commands.processIt(text);
        } else command = false;

        /**
         * Creates a new entry into Updates table
         */
        Updates.create(req.body, function (ko, ok) {
            if (ko) {
                sails.log.error("[DB] - Updates.create error: ", err);
            }
            if (ok) {
                mixpanel.track("Update", {
                    distinct_id: update.update_id,
                    from: userId,
                    user_id: userAlias,
                    text: update.message.text,
                    photo: update.message.photo
                });
            }
        });


        /**
         * Let's look for a previous user, otherwise we create a new one
         */
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


                /**
                 * STAGE 1
                 */
                if (user.stage == 1) { //Initial stage

                    if (update.message.photo || command.commandId == 0 || !command) {
                        answers.answeringError();
                    } else if (command.commandType == 1) {
                        answers.answeringCommandsS1(command, userName)
                    } else {
                        answers.answeringError();
                    }

                    /**
                     * STAGE 2
                     */
                } else if (user.stage == 2) { //Command /enviar_info executed

                    if (update.message.photo || command.commandId == 0 || !command) {
                        answers.answeringError();
                    } else if (command.commandType == 1) {
                        answers.answeringCommandsS2(command, userName);

                    } else if (command.commandType == 3) {
                        answers.answeringTextOrImage(command);
                    }
                    else {
                        answers.answeringError();
                    }

                    /**
                     * STAGE 3
                     */
                } else if (user.stage == 3) { //Data type selected

                    if (command && command.commandType == 1) {
                        answers.answeringCommandsS3(command, userName);

                    } else if (update.message.photo && user.data_type_selected == 2) {
                        telegram.sendMessage(userId, strings.getLabeling, "", true, null, keyboards.createKeyboard(1)).then(
                            function (response) {
                                UserMedia.create({
                                    user_id: userId,
                                    photo: update.message.photo
                                }, function (err, newUpdate) {
                                    if (newUpdate) {
                                        stages.updateStage({user_id: userId}, {stage: 4});
                                    }

                                });
                            }
                        );


                    } else if (update.message.text && user.data_type_selected == 1) {
                        telegram.sendMessage(userId, strings.getLabeling, "", true, null, keyboards.createKeyboard(1)).then(
                            function (response) {
                                UserMedia.create({user_id: userId, text: text}, function (err, newUpdate) {
                                    if (newUpdate) {
                                        stages.updateStage({user_id: userId}, {stage: 4});
                                    }

                                });
                            }
                        );

                    }

                    else {
                        answers.answeringError();

                    }

                    /**
                     * STAGE 4
                     */
                } else if (user.stage == 4) { //Data recieved, not labeled
                    if (update.message.photo || command.commandId == 0 || !command) {
                        answers.answeringError();
                    } else if (command.commandType == 1) {
                        answers.answeringCommandsS4(command, userName);

                    } else if (command.commandType == 2) {
                        telegram.sendMessage(userId, strings.getThanks, "", true, null, {hide_keyboard: true}).then(
                            function (response) {
                                UserMedia.findOne({user_id: userId}, function (err, found) {
                                    if (found) {
                                        if (found.photo) {
                                            PhotoLabel.create({
                                                photo: found.photo,
                                                label: command.commandId,
                                                message: update.message.message_id
                                            }, function (err, ok) {
                                                if (ok) {
                                                    stages.updateStage({user_id: userId}, {stage: 1}).then(
                                                        function (response) {
                                                            UserMedia.destroy({user_id: userId}, function (ko, ok) {
                                                                if (ok) mixpanel.people.increment(userId, "contributions");
                                                            });
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
                                                            UserMedia.destroy({user_id: userId}, function (ko, ok) {
                                                                if (ok) mixpanel.people.increment(userId, "contributions");
                                                            });
                                                        }
                                                    );
                                                }
                                            })

                                        }
                                    }
                                });
                            }
                        );

                    }
                    else {
                        answers.answeringError();
                    }

                    /**
                     * STAGE 10
                     */
                } else if (user.stage == 10) { //FeedBack

                    if (update.message.photo || command.commandId == 0) {
                        answers.answeringError();
                    } else if (command && command.commandType == 1) {
                        answers.answeringCommandsS10(command, userName);
                    } else if (update.message.text) {
                        telegram.sendMessage(userId, strings.getThanks, "", true, null, {hide_keyboard: true}).then(
                            function (response) {
                                Feedbacks.create({user_id: userId, text: update.message.text}, function (ko, ok) {
                                    if (ok) {
                                        mixpanel.track("Feedback", {
                                            distinct_id: update.update_id,
                                            from: userId,
                                            user_id: userAlias,
                                            text: update.message.text
                                        });
                                    }
                                })
                            }
                        );

                    } else {
                        answers.answeringError();
                    }

                }
            }
        );
        res.json(200);
    }
};

