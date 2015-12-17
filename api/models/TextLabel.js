/**
 * TextLabel Model
 *
 * @description :: Modeling textlabel table
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
        text: {
            type: 'string'
        },
        label: {
            type: 'string'
        },
        message: {
            type: 'string'
        }

    }
};