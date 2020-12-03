'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldIkibucukAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldIkibucukAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldIkibucukAltin',
    });
    return GoldIkibucukAltin;
};