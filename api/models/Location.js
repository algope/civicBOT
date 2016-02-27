/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        location_id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        name: {
            type: 'string',
            defaultsTo: ''
        },
        plainName:{
            type: 'string',
            defaultsTo: ''
        },
        cp: {
            type: 'integer',
            defaultsTo: 0
        },
        lat: {
            type: 'double',
            defaultsTo: 0.0
        },
        lon: {
            type: 'double',
            defaultsTo: 0.0
        }

    }
};

