'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SUUDIARABISTANRIYALI extends Model {
        static associate(models) {
            // define association here
        }
    };
    SUUDIARABISTANRIYALI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SUUDIARABISTANRIYALI',
    });
    return SUUDIARABISTANRIYALI;
};