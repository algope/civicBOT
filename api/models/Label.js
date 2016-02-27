/**
 * Label.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        label_id: {
            type: 'integer',
            unique: true
        },
        label:{
            type: 'string',
            defaultsTo: ''
        },
        name:{
            type: 'string',
            defaultsTo: ''
        }

    }
};

