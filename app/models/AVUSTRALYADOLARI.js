'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AVUSTRALYADOLARI extends Model {
        static associate(models) {
            // define association here
        }
    };
    AVUSTRALYADOLARI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AVUSTRALYADOLARI',
    });
    return AVUSTRALYADOLARI;
};