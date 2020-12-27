'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CZRX extends Model {
        static associate(models) {
            // define association here
        }
    };
    CZRX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CZRX',
    });
    return CZRX;
};