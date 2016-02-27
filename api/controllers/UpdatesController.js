/**
 * UpdatesController
 *
 * @description :: Server-side logic for managing Telegram's BOT Updates
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 */

var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init('2ac0d6d54c481e7dea88d065874c806f');

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
        update.message.chat.chat_id = update.message.chat.id;
        delete update.message.chat.id;
        res.ok(update);
        sails.log.debug("I'M HERE 1");
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
        sails.log.debug("I'M HERE 2--");

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
                    "contributions": 0
                });
                /**
                 * STAGE 1 > First stage, no commands executed.
                 */
                if (user.stage == 1) { //Initial stage

                    if (update.message.photo || command.commandId == 0 || !command) {
                        answers.answeringError(userId, update, userAlias, user);
                    } else if (command.commandType == 1) {
                        answers.answeringCommandsS1(command, userId, userName)
                    } else {
                        answers.answeringError(userId, update, userAlias, user);
                    }

                    /**
                     * STAGE 2 > Second stage, command /enviar_info executed
                     */
                } else if (user.stage == 2) { //Command /enviar_info

                    if (update.message.photo || command.commandId == 0 || !command) {
                        answers.answeringError(userId, update, userAlias, user);
                    } else if (command.commandType == 1) {
                        answers.answeringCommandsS2(command, userId, userName);
                    } else if (command.commandType == 3) {
                        answers.answeringTextOrImage(command, userId);
                    } else {
                        answers.answeringError(userId, update, userAlias, user);
                    }

                    /**
                     * STAGE 3 > Third stage, the user had selected datatype
                     */
                } else if (user.stage == 3) { //Data type selected

                    if (command && command.commandType == 1) {
                        answers.answeringCommandsS3(command, userId, userName);
                    } else if (update.message.photo && user.data_type_selected == 2) {
                        answers.answeringLabelingS3(1, update, userId);
                    } else if (update.message.text && user.data_type_selected == 1) {
                        answers.answeringLabelingS3(2, update, userId);
                    } else {
                        answers.answeringError(userId, update, userAlias, user);
                    }


                    /**
                     * STAGE 4 > Fourth stage, the bot had recieved the media
                     */
                } else if (user.stage == 4) { //Data recieved, not labeled

                    sails.log.debug("commandID: ", command.commandId);
                    if (update.message.photo || command.commandId == 0 || !command) {
                        answers.answeringError(userId, update, userAlias, user);
                    } else if (command.commandType == 1) {
                        answers.answeringCommandsS4(command, userId, userName);
                    } else if (command.commandType == 2) {
                        answers.answeringThanksS4(userId, command, update);
                    } else {
                        answers.answeringError(userId, update, userAlias, user);
                    }

                    /**
                     * STAGE 10 > Tenth stage (no regular), FeedBack Stage
                     */
                } else if (user.stage == 10) { //FeedBack

                    if (update.message.photo || command.commandId == 0) {
                        answers.answeringError(userId, update, userAlias, user);
                    } else if (command && command.commandType == 1) {
                        answers.answeringCommandsS10(command, userId ,userName);
                    } else if (update.message.text) {
                        answers.answeringThanksS10(userId, update, userAlias);
                    } else {
                        answers.answeringError(userId, update, userAlias, user);
                    }
                }
            }
        );
        res.ok();
    }
};

