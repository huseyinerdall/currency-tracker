'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BTT extends Model {
        static associate(models) {
            // define association here
        }
    };
    BTT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BTT',
    });
    return BTT;
};