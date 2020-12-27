'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HNS extends Model {
        static associate(models) {
            // define association here
        }
    };
    HNS.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'HNS',
    });
    return HNS;
};