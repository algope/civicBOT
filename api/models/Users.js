/**
 * Users.js
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
        first_name: {
            type: 'string'
        },
        last_name: {
            type: 'string'
        },
        username: {
            type: 'string'
        }
    }
};

