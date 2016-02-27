/**
 * Users Model
 *
 * @description :: Modeling users table
 * @author      :: Alejandro González
 * @licence     :: The MIT License (MIT)
 *
 */

module.exports = {

    attributes: {
        user_id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        first_name: {
            type: 'string',
            defaultsTo: ''
        },
        last_name: {
            type: 'string',
            defaultsTo: ''
        },
        username: {
            type: 'string',
            defaultsTo: ''
        },
        messages: {
            collection: 'messages',
            via: 'from',
            defaultsTo: null
        }
    }
};

