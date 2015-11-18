/**
 * Telegram API Services
 *
 * @description :: Telegram API Services for Sails
 * @help        :: See https://github.com/
 */

var querystring = require('querystring');
var https = require('https');
var FormData = require('form-data');
var request = require('request');

/*
module.exports.getMe = function () {
  var options={
    host: sails.config.telegram.url,
    path: "/bot"+TelegramToken + '/getMe'
  };
  return new Promise(function(resolve, reject){
    https.get(options, function(res){
      var json = "";
      res.on('data', function(chunk){
        json += chunk;
      });
      res.on('end', function() {
        resolve(JSON.parse(json));
      });
    });
  })
};
*/

module.exports.sendMessage = function(chat_id, text, disable_web_page_preview, reply_to_message_id, reply_markup) {
  var options = {
    host: sails.config.telegram.url,
    path: "/bot"+TelegramToken + '/sendMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var post_data = JSON.stringify({
    chat_id: chat_id,
    text: text,
    disable_web_page_preview: disable_web_page_preview,
    reply_to_message_id: reply_to_message_id,
    reply_markup: reply_markup
  });
  return new Promise(function (resolve, reject) {
    var postReq = https.request(options, function (res) {
      res.setEncoding('utf8');
      var json = "";
      res.on('data', function (chunk) {
        json += chunk;
      });
      res.on('end', function () {
        resolve(JSON.parse(json))
      });
    });
    postReq.write(post_data);
    postReq.end();
  });
};


module.exports.setWebHook = function(url){
  return new Promise(function(resolve, reject){
    var formData = {
      url: url
    };
    request.post({url: 'https://'+sails.config.telegram.url+'/bot'+TelegramToken+'/setWebHook', formData: formData}, function(err, httpResponse, body) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(body))
    });

  })
};

