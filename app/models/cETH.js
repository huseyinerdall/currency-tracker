'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CETH extends Model {
        static associate(models) {
            // define association here
        }
    };
    CETH.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CETH',
    });
    return CETH;
};