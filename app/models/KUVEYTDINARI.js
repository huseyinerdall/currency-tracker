'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KUVEYTDINARI extends Model {
        static associate(models) {
            // define association here
        }
    };
    KUVEYTDINARI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KUVEYTDINARI',
    });
    return KUVEYTDINARI;
};