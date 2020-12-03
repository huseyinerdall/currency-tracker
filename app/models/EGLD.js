'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EGLD extends Model {
        static associate(models) {
            // define association here
        }
    };
    EGLD.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'EGLD',
    });
    return EGLD;
};