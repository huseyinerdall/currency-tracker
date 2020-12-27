'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DNT extends Model {
        static associate(models) {
            // define association here
        }
    };
    DNT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DNT',
    });
    return DNT;
};