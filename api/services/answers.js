
var Mixpanel = require('mixpanel');
//var mixpanel = Mixpanel.init('');

module.exports.answeringCommandsS1 = function(command, userName){
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
    }

};

module.exports.answeringCommandsS2 = function (command, userName){
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
    }

};

module.exports.answeringCommandsS3 = function (command, userName){
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
    }
}

module.exports.answeringTextOrImage = function(command){
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

module.exports.answeringCommandsS4 = function (command, userName){
    switch (command.commandId) {
        case 1: //start
            telegram.sendMessage(userId, strings.getWelcome).then(
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
    }
};

module.exports.answeringCommandsS10 = function (command, userName){
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
    }
};



module.exports.answeringError = function(){
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