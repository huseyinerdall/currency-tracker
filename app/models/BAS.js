'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BAS extends Model {
        static associate(models) {
            // define association here
        }
    };
    BAS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BAS',
    });
    return BAS;
};