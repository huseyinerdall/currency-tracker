'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class COMP extends Model {
        static associate(models) {
            // define association here
        }
    };
    COMP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'COMP',
    });
    return COMP;
};