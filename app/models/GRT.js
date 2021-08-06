'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GRT extends Model {
        static associate(models) {
            // define association here
        }
    };
    GRT.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GRT',
    });
    return GRT;
};