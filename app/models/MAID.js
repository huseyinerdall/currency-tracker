'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MAID extends Model {
        static associate(models) {
            // define association here
        }
    };
    MAID.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'MAID',
    });
    return MAID;
};