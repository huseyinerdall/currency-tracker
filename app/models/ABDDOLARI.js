'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ABDDOLARI extends Model {
        static associate(models) {
            // define association here
        }
    };
    ABDDOLARI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ABDDOLARI',
    });
    return ABDDOLARI;
};