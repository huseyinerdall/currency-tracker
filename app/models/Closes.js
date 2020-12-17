'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Closes extends Model {
        static associate(models) {
            // define association here
        }
    };
    Closes.init({
        type: DataTypes.STRING,
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Closes',
    });
    return Closes;
};