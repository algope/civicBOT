/**
 * UserStages Model
 *
 * @description :: Modeling userstages table
 * @author      :: Alejandro González
 * @licence     :: The MIT License (MIT)
 *
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
            unique: true
        },
        stage: {
            type: 'string'
        },
        data_type_selected: {
            type: 'string'
        }
    }
};

