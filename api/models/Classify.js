/**
 * Classify.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        classify_id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        photo: {
            type: 'string',
            defaultsTo: ''
        },
        text:{
            type: 'string',
            defaultsTo: ''
        },
        type:{
            type: 'string',
            defaultsTo: ''
        },
        label: {
            model: 'label',
            defaultsTo: null
        },
        message: {
            type: 'string',
            defaultsTo: ''
        },
        party: {
            model: 'party',
            defaultsTo: null
        },
        location: {
            model: 'location',
            defaultsTo: null
        },
        media: {
            model: 'media',
            defaultsTo: null
        },
        edited:{
            type: 'boolean',
            defaultsTo: false
        },
        published:{
            type: 'boolean',
            defaultsTo: false
        }

    }
};

