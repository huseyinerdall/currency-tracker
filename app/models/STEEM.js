'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class STEEM extends Model {
        static associate(models) {
            // define association here
        }
    };
    STEEM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'STEEM',
    });
    return STEEM;
};