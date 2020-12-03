'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LINK extends Model {
        static associate(models) {
            // define association here
        }
    };
    LINK.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'LINK',
    });
    return LINK;
};