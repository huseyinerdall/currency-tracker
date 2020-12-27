'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ALPHA extends Model {
        static associate(models) {
            // define association here
        }
    };
    ALPHA.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ALPHA',
    });
    return ALPHA;
};