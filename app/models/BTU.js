'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BTU extends Model {
        static associate(models) {
            // define association here
        }
    };
    BTU.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BTU',
    });
    return BTU;
};