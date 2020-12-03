'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldBesliAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldBesliAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldBesliAltin',
    });
    return GoldBesliAltin;
};