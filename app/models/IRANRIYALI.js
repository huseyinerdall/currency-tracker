'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class IRANRIYALI extends Model {
        static associate(models) {
            // define association here
        }
    };
    IRANRIYALI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'IRANRIYALI',
    });
    return IRANRIYALI;
};