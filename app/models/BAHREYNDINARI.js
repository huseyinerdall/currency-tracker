'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BAHREYNDINARI extends Model {
        static associate(models) {
            // define association here
        }
    };
    BAHREYNDINARI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BAHREYNDINARI',
    });
    return BAHREYNDINARI;
};