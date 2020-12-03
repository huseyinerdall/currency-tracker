'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KRT extends Model {
        static associate(models) {
            // define association here
        }
    };
    KRT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KRT',
    });
    return KRT;
};