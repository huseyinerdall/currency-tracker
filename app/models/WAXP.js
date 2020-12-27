'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class WAXP extends Model {
        static associate(models) {
            // define association here
        }
    };
    WAXP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'WAXP',
    });
    return WAXP;
};