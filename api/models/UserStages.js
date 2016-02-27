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
        user_id: {
            type: 'integer',
            unique: true
        },
        stage: {
            type: 'string',
            defaultsTo: ''
        },
        data_type_selected: {
            type: 'string',
            defaultsTo: ''
        }
    }
};

