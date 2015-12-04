/**
 * Photo_Label.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        user_id:{
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        photo: {
            type: 'array'
        },
        text: {
            type: 'string'
        }

    }
};

