'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NEST extends Model {
        static associate(models) {
            // define association here
        }
    };
    NEST.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NEST',
    });
    return NEST;
};