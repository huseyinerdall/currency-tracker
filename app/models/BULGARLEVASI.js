'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BULGARLEVASI extends Model {
        static associate(models) {
            // define association here
        }
    };
    BULGARLEVASI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BULGARLEVASI',
    });
    return BULGARLEVASI;
};