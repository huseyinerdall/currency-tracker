'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldOnsAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldOnsAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldOnsAltin',
    });
    return GoldOnsAltin;
};