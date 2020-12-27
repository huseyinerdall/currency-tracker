'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UST extends Model {
        static associate(models) {
            // define association here
        }
    };
    UST.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'UST',
    });
    return UST;
};