/**
 * Messages.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        message_id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        from: {
            model: 'users'
        },
        date: {
            type: 'integer'
        },
        chat: {
            model: 'chats'
        },
        text: {
            type: 'string'
        },
        photo: {
            type: 'array'
        },
        caption: {
            type: 'string'
        },
        update: {
            model: 'updates'
        }

    }
};

