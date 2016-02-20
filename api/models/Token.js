/**
 * Token.js
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

    user_id: {
      type: 'integer',
      required: true
    },

    token: {type: 'string'},
    isValid: {type: 'boolean'},
    os: {type: 'string'},
    agent: {type: 'string'},
    device: {type: 'string'},
    latitude: {type: 'string'},
    longitude: {type: 'string'},
    ip: {type: 'string'}

  }
};

