/**
 * Answering Services
 *
 * @description :: Server-side logic for managing Telegram's BOT Updates
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */

var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init(sails.config.mixpanel.token);

module.exports.answeringCommandsS1 = function (command, userId, userName) {
    switch (command.commandId) {
        case 1: //start
            telegram.sendMessage(userId, strings.getWelcome(userName));
            break;
        case 2: //ayuda
            telegram.sendMessage(userId, strings.getHelp1, "", true, null, {hide_keyboard: true});
            break;
        case 3: //sugerencias
            telegram.sendMessage(userId, strings.getFeedback, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 10});
                }
            );
            break;
        case 4: //enviar_info
            telegram.sendMessage(userId, strings.getInfoSelect, "", true, null, keyboards.createKeyboard(2)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 2});

                }
            );
            break;
        case 5: //acerca_de
            telegram.sendMessage(userId, strings.getAcercaDe, "", true, null, {hide_keyboard: true});
            break;
        case 6: //cancelar
            telegram.sendMessage(userId, strings.getCancelar, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});

                }
            );
            break;
        case 7: //resultados
            statistics.getStatistics('A').then(
                function(sumA){
                    var statA=sumA;
                    statistics.getStatistics('B').then(
                        function(sumB){
                            var statB=sumB;
                            statistics.getStatistics('C').then(
                                function(sumC){
                                    var statC=sumC;
                                    statisctics.getStatistics('D').then(
                                        function(sumD){
                                            var statD=sumD;
                                            statistics.getStatistics('E').then(
                                                function(sumE){
                                                    var statE=sumE;
                                                    statistics.getStatistics('F').then(
                                                        function(sumF){
                                                            var statF=sumF;
                                                            statistics.getStatistics('G').then(
                                                                function(sumG){
                                                                    var statG=sumG;
                                                                    statistics.getStatistics('H').then(
                                                                        function(sumH){
                                                                            var statH=sumH;
                                                                            telegram.sendMessage(userId, strings.getProvStatistics(statA,statB,statC,statD,statE,statF,statG,statH), "", true, null, {hide_keyboard: true});


                                                                        }

                                                                    )
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            );
            break;




    }

};

module.exports.answeringCommandsS2 = function (command, userId, userName) {
    switch (command.commandId) {
        case 1: //start
            telegram.sendMessage(userId, strings.getWelcome(userName)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});

                });
            break;

        case 2: //ayuda
            telegram.sendMessage(userId, strings.getHelp2, "", true, null, {hide_keyboard: true});
            break;
        case 3: //sugerencias
            telegram.sendMessage(userId, strings.getFeedback, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 10});

                }
            );
            break;
        case 4: //enviar_info
            telegram.sendMessage(userId, strings.getInfoSelect, "", true, null, keyboards.createKeyboard(2)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 2})
                }
            );
            break;
        case 5: //acerca_de
            telegram.sendMessage(userId, strings.getAcercaDe, "", true, null, {hide_keyboard: true});
            break;
        case 6: //cancelar
            telegram.sendMessage(userId, strings.getCancelar, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});

                }
            );
            break;
        case 7: //resultados
            statistics.getStatistics('A').then(
                function(sumA){
                    var statA=sumA;
                    statistics.getStatistics('B').then(
                        function(sumB){
                            var statB=sumB;
                            statistics.getStatistics('C').then(
                                function(sumC){
                                    var statC=sumC;
                                    statisctics.getStatistics('D').then(
                                        function(sumD){
                                            var statD=sumD;
                                            statistics.getStatistics('E').then(
                                                function(sumE){
                                                    var statE=sumE;
                                                    statistics.getStatistics('F').then(
                                                        function(sumF){
                                                            var statF=sumF;
                                                            statistics.getStatistics('G').then(
                                                                function(sumG){
                                                                    var statG=sumG;
                                                                    statistics.getStatistics('H').then(
                                                                        function(sumH){
                                                                            var statH=sumH;
                                                                            telegram.sendMessage(userId, strings.getProvStatistics(statA,statB,statC,statD,statE,statF,statG,statH), "", true, null, {hide_keyboard: true});


                                                                        }

                                                                    )
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            );
            break;
    }

};

module.exports.answeringCommandsS3 = function (command, userName) {
    switch (command.commandId) {
        case 1: //start
            telegram.sendMessage(userId, strings.getWelcome(userName)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});
                }
            );
            break;
        case 2: //ayuda
            telegram.sendMessage(userId, strings.getHelp3, "", true, null, {hide_keyboard: true});
            break;
        case 3: //sugerencias
            telegram.sendMessage(userId, strings.getFeedback, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 10});
                }
            );
            break;
        case 4: //enviar_info
            telegram.sendMessage(userId, strings.getInfoSelect, "", true, null, keyboards.createKeyboard(2)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 2});
                }
            );
            break;
        case 5: //acerca_de
            telegram.sendMessage(userId, strings.getAcercaDe, "", true, null, {hide_keyboard: true});
            break;
        case 6: //cancelar
            telegram.sendMessage(userId, strings.getCancelar, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});

                }
            );
            break;
        case 7: //resultados
            statistics.getStatistics('A').then(
                function(sumA){
                    var statA=sumA;
                    statistics.getStatistics('B').then(
                        function(sumB){
                            var statB=sumB;
                            statistics.getStatistics('C').then(
                                function(sumC){
                                    var statC=sumC;
                                    statisctics.getStatistics('D').then(
                                        function(sumD){
                                            var statD=sumD;
                                            statistics.getStatistics('E').then(
                                                function(sumE){
                                                    var statE=sumE;
                                                    statistics.getStatistics('F').then(
                                                        function(sumF){
                                                            var statF=sumF;
                                                            statistics.getStatistics('G').then(
                                                                function(sumG){
                                                                    var statG=sumG;
                                                                    statistics.getStatistics('H').then(
                                                                        function(sumH){
                                                                            var statH=sumH;
                                                                            telegram.sendMessage(userId, strings.getProvStatistics(statA,statB,statC,statD,statE,statF,statG,statH), "", true, null, {hide_keyboard: true});


                                                                        }

                                                                    )
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            );
            break;
    }
};

module.exports.answeringCommandsS4 = function (command, userId, userName) {
    switch (command.commandId) {
        case 1: //start
            telegram.sendMessage(userId, strings.getWelcome(userName)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});
                }
            );
            break;

        case 2: //ayuda
            telegram.sendMessage(userId, strings.getLabeling, "", true, null, keyboards.createKeyboard(1));
            break;
        case 3: //sugerencias
            telegram.sendMessage(userId, strings.getFeedback, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 10});
                }
            );
            break;
        case 4: //enviar_info
            telegram.sendMessage(userId, strings.getInfoSelect, "", true, null, keyboards.createKeyboard(2)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 2});
                }
            );
            break;
        case 5: //acerca_de
            telegram.sendMessage(userId, strings.getAcercaDe, "", true, null, {hide_keyboard: true});
            break;
        case 6: //cancelar
            telegram.sendMessage(userId, strings.getCancelar, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});

                }
            );
            break;
        case 7: //resultados
            statistics.getStatistics('A').then(
                function(sumA){
                    var statA=sumA;
                    statistics.getStatistics('B').then(
                        function(sumB){
                            var statB=sumB;
                            statistics.getStatistics('C').then(
                                function(sumC){
                                    var statC=sumC;
                                    statisctics.getStatistics('D').then(
                                        function(sumD){
                                            var statD=sumD;
                                            statistics.getStatistics('E').then(
                                                function(sumE){
                                                    var statE=sumE;
                                                    statistics.getStatistics('F').then(
                                                        function(sumF){
                                                            var statF=sumF;
                                                            statistics.getStatistics('G').then(
                                                                function(sumG){
                                                                    var statG=sumG;
                                                                    statistics.getStatistics('H').then(
                                                                        function(sumH){
                                                                            var statH=sumH;
                                                                            telegram.sendMessage(userId, strings.getProvStatistics(statA,statB,statC,statD,statE,statF,statG,statH), "", true, null, {hide_keyboard: true});


                                                                        }

                                                                    )
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            );
            break;
    }
};

module.exports.answeringCommandsS10 = function (command, userName) {
    switch (command.commandId) {
        case 1: //start
            telegram.sendMessage(userId, strings.getWelcome).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});
                }
            );
            break;

        case 2: //ayuda
            telegram.sendMessage(userId, strings.getFeedback, true, null, {hide_keyboard: true});
            break;
        case 3: //sugerencias
            telegram.sendMessage(userId, strings.getFeedback, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 10});
                }
            );

            break;
        case 4: //enviar_info
            telegram.sendMessage(userId, strings.getInfoSelect, "", true, null, keyboards.createKeyboard(2)).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 2})
                }
            );
            break;
        case 5: //acerca_de
            telegram.sendMessage(userId, strings.getAcercaDe, "", true, null, {hide_keyboard: true});
            break;
        case 6: //cancelar
            telegram.sendMessage(userId, strings.getCancelar, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 1});

                }
            );
            break;
        case 7: //resultados
            statistics.getStatistics('A').then(
                function(sumA){
                    var statA=sumA;
                    statistics.getStatistics('B').then(
                        function(sumB){
                            var statB=sumB;
                            statistics.getStatistics('C').then(
                                function(sumC){
                                    var statC=sumC;
                                    statisctics.getStatistics('D').then(
                                        function(sumD){
                                            var statD=sumD;
                                            statistics.getStatistics('E').then(
                                                function(sumE){
                                                    var statE=sumE;
                                                    statistics.getStatistics('F').then(
                                                        function(sumF){
                                                            var statF=sumF;
                                                            statistics.getStatistics('G').then(
                                                                function(sumG){
                                                                    var statG=sumG;
                                                                    statistics.getStatistics('H').then(
                                                                        function(sumH){
                                                                            var statH=sumH;
                                                                            telegram.sendMessage(userId, strings.getProvStatistics(statA,statB,statC,statD,statE,statF,statG,statH), "", true, null, {hide_keyboard: true});


                                                                        }

                                                                    )
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
            break;
    }
};

module.exports.answeringTextOrImage = function (command, userId) {
    switch (command.commandId) {
        case 1: //TEXTO
            telegram.sendMessage(userId, strings.getTextSelected, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 3, data_type_selected: 1})

                }
            );

            break;
        case 2: //IMAGEN
            telegram.sendMessage(userId, strings.getImageSelected, "", true, null, {hide_keyboard: true}).then(
                function (response) {
                    stages.updateStage({user_id: userId}, {stage: 3, data_type_selected: 2});

                }
            );
            break;

    }
};

module.exports.answeringError = function (userId, update, userAlias, user) {
    telegram.sendMessage(userId, strings.getError).then(
        function (response) {
            mixpanel.track("Error", {
                distinct_id: update.update_id,
                from: userId,
                user_id: userAlias,
                text: update.message.text,
                photo: update.message.photo,
                user_stage: user.stage
            });

        }
    );
};

module.exports.answeringLabelingS3 = function (type, update, userId) {
    switch (type) {
        case 1:
            telegram.sendMessage(userId, strings.getLabeling, "", true, null, keyboards.createKeyboard(1)).then(
                function (response) {
                    UserMedia.create({
                        user_id: userId,
                        photo: update.message.photo
                    }, function (err, newUpdate) {
                        if (newUpdate) {
                            sails.log.error("USERMEDIA CREATED!!!!");
                            stages.updateStage({user_id: userId}, {stage: 4});
                        }

                    });
                }
            );
            break;
        case 2:
            telegram.sendMessage(userId, strings.getLabeling, "", true, null, keyboards.createKeyboard(1)).then(
                function (response) {
                    UserMedia.create({user_id: userId, text: update.message.text}, function (err, newUpdate) {
                        if (newUpdate) {
                            stages.updateStage({user_id: userId}, {stage: 4});
                        }

                    });
                }
            );
            break;
    }

};

module.exports.answeringThanksS4 = function (userId, command, update) {
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
                                            if (ok) {
                                                mixpanel.people.increment(userId, "contributions");
                                                mixpanel.track("Contribution", {
                                                    distinct_id: update.update_id,
                                                    from: userId,
                                                    photo: update.message.photo
                                                });

                                            }
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
                                            if (ok) {
                                                mixpanel.people.increment(userId, "contributions");
                                                mixpanel.track("Contribution", {
                                                    distinct_id: update.update_id,
                                                    from: userId,
                                                    text: update.message.text
                                                });

                                            }
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
};

module.exports.answeringThanksS10 = function (userId, update, userAlias) {
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
};