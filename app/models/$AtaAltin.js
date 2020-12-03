'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldAtaAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldAtaAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldAtaAltin',
    });
    return GoldAtaAltin;
};