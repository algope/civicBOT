/**
 * PhotoLabel Model
 *
 * @description :: Modeling photolabel table
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
        photo: {
            type: 'array'
        },
        label: {
            type: 'string'
        },
        message: {
            type: 'string'
        }

    }
};

