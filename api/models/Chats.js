/**
 * Chats.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        type: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        username: {
            type: 'string'
        },
        first_name: {
            type: 'string'
        },
        last_name: {
            type: 'string'
        },
        messages: {
            collection: 'messages',
            via: 'chat'
        }

    }
};

