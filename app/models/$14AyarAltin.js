'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Gold14AyarAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    Gold14AyarAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Gold14AyarAltin',
    });
    return Gold14AyarAltin;
};