/**
 * Command Processing Services
 *
 * @description :: Command Processing Services
 * @help        :: See https://github.com/
 */

//var Regex = require('regex');

module.exports.processIt = function (text) {
    var id = 0;
    var result = strip(text);
    sails.log.debug("Stripped command: ", result);
    if (result.type == 1) {
        switch (result.command) {
            case "/start":
                id = 1;
                break;
            case "/ayuda":
                id = 2;
                break;
            default:
                id = 0;
        }
        sails.log.debug("Command ID:", id);
        return {commandType: 1, commandId: id};
    }
    else if (result.type == 2) {
        switch (result.command) {
            case "A":
                id = 1;
                break;
            case "B":
                id = 2;
                break;
            case "C":
                id = 3;
                break;
            case "D":
                id = 4;
                break;
            case "E":
                id = 5;
                break;
            default:
                id = 0;
        }
        sails.log.debug("Command ID:", id);
        return {commandType: 2, commandId: id};
    }
    else return false;

};

function strip(text) {
    var regex = /(\/[a-zA-Z]+)/;
    var regex2 = /\b([A-Z]{1}\b)/;
    var array = text.split(" ");
    sails.log.debug("Array splited: ", array);
    sails.log.debug("Array[0]", array[0]);
    var matching = array[0].match(regex);
    var matching2 = array[0].match(regex2);
    if (matching) {
        sails.log.debug("Returning RegEx: ", matching[0]);
        return {command: matching[0], type: 1};
    } else if (matching2) {
        return {command: matching2[0], type: 2};
    }
    else return false;

}
