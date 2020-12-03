'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class INGILIZSTERLINI extends Model {
        static associate(models) {
            // define association here
        }
    };
    INGILIZSTERLINI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'INGILIZSTERLINI',
    });
    return INGILIZSTERLINI;
};