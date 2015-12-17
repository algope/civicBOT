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
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        update_id: {
            type: 'integer'
        },
        message: {
            model: 'messages'
        }
    }
};

