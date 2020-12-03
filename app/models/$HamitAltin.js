'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldHamitAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldHamitAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldHamitAltin',
    });
    return GoldHamitAltin;
};