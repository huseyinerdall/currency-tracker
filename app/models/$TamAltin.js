'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldTamAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldTamAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldTamAltin',
    });
    return GoldTamAltin;
};