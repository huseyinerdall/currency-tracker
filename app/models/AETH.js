'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AETH extends Model {
        static associate(models) {
            // define association here
        }
    };
    AETH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AETH',
    });
    return AETH;
};