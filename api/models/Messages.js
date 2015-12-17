/**
 * Messages Model
 *
 * @description :: Modeling messages table
 * @author      :: Alejandro González
 * @licence     :: The MIT License (MIT)
 *
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

