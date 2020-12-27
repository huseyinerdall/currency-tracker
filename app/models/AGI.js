'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AGI extends Model {
        static associate(models) {
            // define association here
        }
    };
    AGI.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AGI',
    });
    return AGI;
};