/**
 * Chats Model
 *
 * @description :: Modeling chats table
 * @author      :: Alejandro González
 * @licence     :: The MIT License (MIT)
 *
 */

module.exports = {

    attributes: {
        chat_id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        type: {
            type: 'string',
            defaultsTo: ''
        },
        title: {
            type: 'string',
            defaultsTo: ''
        },
        username: {
            type: 'string',
            defaultsTo: ''
        },
        first_name: {
            type: 'string',
            defaultsTo: ''
        },
        last_name: {
            type: 'string',
            defaultsTo: ''
        },
        messages: {
            collection: 'messages',
            via: 'chat',
            defaultsTo: null
        }

    }
};

