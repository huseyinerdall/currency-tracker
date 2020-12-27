'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HC extends Model {
        static associate(models) {
            // define association here
        }
    };
    HC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HC',
    });
    return HC;
};