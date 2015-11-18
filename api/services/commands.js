/**
 * Command Processing Services
 *
 * @description :: Command Processing Services
 * @help        :: See https://github.com/
 */

var Regex = require("regex");

module.exports.processIt = function (text) {
  var id=0;
  var command = strip(text);
  sails.log.debug("Stripped command: ", command);
  if (command){
    switch(command)
    {
      case "/start":
        id = 1;
        break;
      case "/echo":
        id = 2;
        break;
      default:
        id = 0;
    }
    return id;
  }
  else return false;

};

function strip (text) {
  var regex = new Regex(/(\/[a-zA-Z]+)/);
  var array = text.split(" ");

  if(regex.test(array[0])){
    return array[0];
  }
  else return false;

}
