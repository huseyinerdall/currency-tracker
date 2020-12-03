'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ALINK extends Model {
        static associate(models) {
            // define association here
        }
    };
    ALINK.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ALINK',
    });
    return ALINK;
};