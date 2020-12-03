'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NEO extends Model {
        static associate(models) {
            // define association here
        }
    };
    NEO.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NEO',
    });
    return NEO;
};