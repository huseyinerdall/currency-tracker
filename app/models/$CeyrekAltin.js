'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldCeyrekAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldCeyrekAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldCeyrekAltin',
    });
    return GoldCeyrekAltin;
};