'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RUMENLEYI extends Model {
        static associate(models) {
            // define association here
        }
    };
    RUMENLEYI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RUMENLEYI',
    });
    return RUMENLEYI;
};