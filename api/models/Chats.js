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

