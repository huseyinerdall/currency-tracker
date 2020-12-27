'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class REP extends Model {
        static associate(models) {
            // define association here
        }
    };
    REP.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'REP',
    });
    return REP;
};