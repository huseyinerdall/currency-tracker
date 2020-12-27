'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PRQ extends Model {
        static associate(models) {
            // define association here
        }
    };
    PRQ.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PRQ',
    });
    return PRQ;
};