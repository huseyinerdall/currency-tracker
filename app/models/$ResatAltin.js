'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldResatAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldResatAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldResatAltin',
    });
    return GoldResatAltin;
};