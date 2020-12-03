'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Dolar extends Model {
        static associate(models) {
            // define association here
        }
    };
    Dolar.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Dolar',
    });
    return Dolar;
};