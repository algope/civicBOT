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
        feedback_id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: 'integer',
            unique: true
        },
        text: {
            type: 'string'
        }

    }
};

