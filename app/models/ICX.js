'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ICX extends Model {
        static associate(models) {
            // define association here
        }
    };
    ICX.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ICX',
    });
    return ICX;
};