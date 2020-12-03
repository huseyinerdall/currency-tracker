'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BTG extends Model {
        static associate(models) {
            // define association here
        }
    };
    BTG.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BTG',
    });
    return BTG;
};