'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NOIA extends Model {
        static associate(models) {
            // define association here
        }
    };
    NOIA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NOIA',
    });
    return NOIA;
};