/**
 * Updates Model
 *
 * @description :: Modeling updates table
 * @author      :: Alejandro González
 * @licence     :: The MIT License (MIT)
 *
 */
module.exports = {

    attributes: {
        update_id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        message: {
            model: 'messages',
            defaultsTo: ''
        }
    }
};

