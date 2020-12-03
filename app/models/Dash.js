'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DASH extends Model {
        static associate(models) {
            // define association here
        }
    };
    DASH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DASH',
    });
    return DASH;
};