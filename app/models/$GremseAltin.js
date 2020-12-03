'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldGremseAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldGremseAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldGremseAltin',
    });
    return GoldGremseAltin;
};