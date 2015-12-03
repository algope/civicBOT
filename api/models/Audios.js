module.exports = {

    attributes:{
        file_id:{
            type: 'string',
            primaryKey: true,
            unique: true
        },
        duration:{
            type: 'Integer'
        },
        performer:{
            type: 'String' //optional
        },
        tittle:{
            type: 'String' //optional
        },
        mime_type:{
            type: 'String'  //optional
        },
        file_size:{
            type: 'Integer' // optional
        }
    }
};