'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldCumhuriyetAltini extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldCumhuriyetAltini.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldCumhuriyetAltini',
    });
    return GoldCumhuriyetAltini;
};