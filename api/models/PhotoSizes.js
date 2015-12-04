module.exports = {

    attributes: {
        file_id:{
            type: 'string',
            primaryKey: true,
            unique: true
        },
        width:{
            type: 'integer'
        },
        height:{
            type: 'integer'
        },
        file_size:{
            type: 'integer'
        }
    }
};