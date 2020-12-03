'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KATARRIYALI extends Model {
        static associate(models) {
            // define association here
        }
    };
    KATARRIYALI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KATARRIYALI',
    });
    return KATARRIYALI;
};