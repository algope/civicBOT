/**
 * Photo_Label.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: 'integer',
            unique: true
        },
        text: {
            type: 'string'
        }

    }
};

