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
            model: 'users',
            defaultsTo: null
        },
        date: {
            type: 'integer',
            defaultsTo: 0
        },
        chat: {
            model: 'chats',
            defaultsTo: null
        },
        text: {
            type: 'string',
            defaultsTo: ''
        },
        photo: {
            type: 'array',
            defaultsTo: null
        },
        caption: {
            type: 'string',
            defaultsTo: ''
        },
        update: {
            model: 'updates',
            defaultsTo: null
        }

    }
};

