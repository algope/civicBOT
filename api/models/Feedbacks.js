/**
 * Feedback Model
 *
 * @description :: Modeling feedbacks table
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
        text: {
            type: 'string',
            defaultsTo: ''
        }

    }
};

