/**
 * Keyboard Telegram API Services
 *
 * @description :: Telegram API Services for Sails
 * @help        :: See https://github.com/
 */


module.exports.createKeyboard = function (type) {
    //TODO: HARDCODED
    var keyboard = "";
    var buttons = null;


    switch (type){
        case 1:
            buttons = [["A", "B", "C", "D"]];
            keyboard = {keyboard: buttons, resize_keyboard: true, one_time_keyboard: true, selective: false};
            break;
        case 2:
            buttons = [['\xF0\x9F\x93\x84'+"\nTEXTO", '\xF0\x9F\x93\xB7'+"\nIMÁGEN"]];
            keyboard = {keyboard: buttons, resize_keyboard: true, one_time_keyboard: true, selective: false};
            break;

    }
    return keyboard;
};
