'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class JAPONYENI extends Model {
        static associate(models) {
            // define association here
        }
    };
    JAPONYENI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'JAPONYENI',
    });
    return JAPONYENI;
};