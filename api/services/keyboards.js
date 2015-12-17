/**
 * Telegram Keyboard Services
 *
 * @description :: Server-side logic for managing Telegram's BOT Updates
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */


module.exports.createKeyboard = function (type) {
    //TODO: HARDCODED
    var keyboard = "";
    var buttons = null;


    switch (type) {
        case 1:
            buttons = [["A", "B", "C", "D"], ["E", "F", "G", "H"]];
            keyboard = {keyboard: buttons, resize_keyboard: true, one_time_keyboard: true, selective: true};
            break;
        case 2:
            buttons = [["TEXTO", "IMAGEN"]];
            keyboard = {keyboard: buttons, resize_keyboard: true, one_time_keyboard: true, selective: true};
            break;

    }
    return keyboard;
};
