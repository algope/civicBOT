/**
 * Keyboard Telegram API Services
 *
 * @description :: Telegram API Services for Sails
 * @help        :: See https://github.com/
 */


module.exports.createKeyboard = function () {

    //TODO: HARDCODED
    var buttons = [["A", "B"],["C", "D"], ["E", "F"], ["G","H"]];
    var keyboard = {keyboard: buttons, resize_keyboard: false, one_time_keyboard: true, selective: false };
    return keyboard;

};
