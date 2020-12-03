'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HUSD extends Model {
        static associate(models) {
            // define association here
        }
    };
    HUSD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HUSD',
    });
    return HUSD;
};