'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SEPETKUR extends Model {
        static associate(models) {
            // define association here
        }
    };
    SEPETKUR.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SEPETKUR',
    });
    return SEPETKUR;
};