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
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        first_name: {
            type: 'string'
        },
        last_name: {
            type: 'string'
        },
        username: {
            type: 'string'
        },
        messages: {
            collection: 'messages',
            via: 'from'
        }
    }
};

