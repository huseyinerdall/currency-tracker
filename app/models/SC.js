'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SC extends Model {
        static associate(models) {
            // define association here
        }
    };
    SC.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'SC',
    });
    return SC;
};