/**
 * UserMedia Model
 *
 * @description :: Modeling usermedia table
 * @author      :: Alejandro González
 * @licence     :: The MIT License (MIT)
 *
 */

module.exports = {

    attributes: {
        umedia_id: {
            type: 'integer',
            unique: true,
            autoIncrement: true
        },
        user_id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        photo: {
            type: 'array',
            defaultsTo: null
        },
        text: {
            type: 'string',
            defaultsTo: ''
        }

    }
};

