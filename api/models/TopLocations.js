/**
 * TopLocations.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        top_id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        location:{
            unique: true,
            model: 'location',
            defaultsTo: null
        },

        count:{
            type: 'integer',
            defaultsTo: 0
        }
    }
};

