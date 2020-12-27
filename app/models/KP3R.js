'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KP3R extends Model {
        static associate(models) {
            // define association here
        }
    };
    KP3R.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'KP3R',
    });
    return KP3R;
};