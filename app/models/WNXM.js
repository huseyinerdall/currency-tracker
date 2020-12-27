'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WNXM extends Model {
        static associate(models) {
            // define association here
        }
    };
    WNXM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WNXM',
    });
    return WNXM;
};