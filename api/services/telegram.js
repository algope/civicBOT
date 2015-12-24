/**
 * Telegram API Services
 *
 * @description :: Server-side logic for managing Telegram's BOT Updates
 * @author      :: Alejandro González - algope@github
 * @licence     :: The MIT License (MIT)
 *
 */

var querystring = require('querystring');
var https = require('https');
var request = require('request');


module.exports.sendMessage = function (chat_id, text, parse_mode, disable_web_page_preview, reply_to_message_id, reply_markup) {
    var options = {
        host: sails.config.telegram.url,
        path: "/bot" + sails.config.telegram.token + '/sendMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var post_data = JSON.stringify({
        chat_id: chat_id,
        text: text,
        parse_mode: parse_mode,
        disable_web_page_preview: disable_web_page_preview,
        reply_to_message_id: reply_to_message_id,
        reply_markup: reply_markup
    });

    sails.log.error("THISSSS::: ", post_data);
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


module.exports.setWebHook = function (url) {
    return new Promise(function (resolve, reject) {
        var formData = {
            url: url
        };
        request.post({
            url: 'https://' + sails.config.telegram.url + '/bot' + sails.config.telegram.token + '/setWebHook',
            formData: formData
        }, function (err, httpResponse, body) {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(body))
        });

    })
};

module.exports.getFile = function (file_id) {
    return new Promise(function (resolve, reject) {
        var formData = {
            file_id: file_id
        };
        request.post({
            url: 'https://' + sails.config.telegram.url + '/bot' + sails.config.telegram.token + '/getFile',
            formData: formData
        }, function (err, httpResponse, body) {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(body))
        });
    })
};

module.exports.downloadFile = function (file_path) {
    var options = {
        host: "api.telegram.org",
        path: "/file/bot" + sails.config.telegram.token + '/file_path'
    };
    return new Promise(function (resolve, reject) {
        https.get(options, function (res) {
            var json = "";
            res.on('data', function (chunk) {
                json += chunk;
            });
            res.on('end', function () {
                resolve(JSON.parse(json));
            });
        });
    })
};
