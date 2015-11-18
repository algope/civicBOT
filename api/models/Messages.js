/**
* Messages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    message_id:{
      type: 'integer',
      primaryKey: true,
      unique: true
    },
    from:{
      model: 'users'
    },
    date: {
      type: 'integer'
    },
    chat:{
      model: 'chats'
    },
    forward_from:{
      model: 'users'
    },
    forward_date:{
      type: 'integer'
    },
    reply_to_message:{
      model: 'messages'
    },
    text:{
      type: 'string'
    },
    caption:{
      type: 'string'
    },
    new_chat_participant:{
      model: 'users'
    },
    left_chat_participant:{
      model: 'users'
    },
    new_chat_title:{
      type: 'string'
    },
    delete_chat_photo:{
      type: 'boolean'

    },
    group_chat_created:{
      type: 'boolean'
    }

  }
};

