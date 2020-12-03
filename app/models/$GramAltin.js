'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GoldGramAltin extends Model {
        static associate(models) {
            // define association here
        }
    };
    GoldGramAltin.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GoldGramAltin',
    });
    return GoldGramAltin;
};