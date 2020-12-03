'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KANADADOLARI extends Model {
        static associate(models) {
            // define association here
        }
    };
    KANADADOLARI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KANADADOLARI',
    });
    return KANADADOLARI;
};