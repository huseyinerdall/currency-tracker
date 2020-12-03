'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldYarimAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldYarimAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldYarimAltin',
    });
    return GoldYarimAltin;
};