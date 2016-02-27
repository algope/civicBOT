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
            type: 'string'
        },
        plainName:{
            type: 'string'
        },
        cp: {
            type: 'integer'
        },
        lat: {
            type: 'double'
        },
        lon: {
            type: 'double'
        }

    }
};

