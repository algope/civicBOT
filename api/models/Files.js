module.exports = {

    attributes:{
        file_id:{
            type: 'string',
            primaryKey: true,
            unique: true
        },
        file_size:{
            type: 'Integer' //optional
        },
        file_path:{
            type: 'String' // optional
        }
    }
};