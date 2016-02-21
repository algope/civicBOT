/**
 * Classify.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        photo: {
            type: 'string'
        },
        text:{
            type: 'string'
        },
        type:{
            type: 'string'
        },
        label: {
            model: 'label'
        },
        message: {
            type: 'string'
        },
        party: {
            model: 'party'
        },
        location: {
            model: 'location'
        },
        media: {
            model: 'media'
        },
        edited:{
            type: 'boolean'
        },
        published:{
            type: 'boolean'
        }

    }
};

