'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CINYUANI extends Model {
        static associate(models) {
            // define association here
        }
    };
    CINYUANI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'CINYUANI',
    });
    return CINYUANI;
};