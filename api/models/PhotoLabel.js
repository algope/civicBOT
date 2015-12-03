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
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        photo_id: {
            type: 'string'
        },
        label: {
            type: 'string'
        },
        message: {
            type: 'string'
        }

    }
};

