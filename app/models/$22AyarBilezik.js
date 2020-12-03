'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Gold22AyarBilezik extends Model {
        static associate(models) {
            // define association here
        }
    };
    Gold22AyarBilezik.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Gold22AyarBilezik',
    });
    return Gold22AyarBilezik;
};