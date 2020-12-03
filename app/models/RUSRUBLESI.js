'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RUSRUBLESI extends Model {
        static associate(models) {
            // define association here
        }
    };
    RUSRUBLESI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'RUSRUBLESI',
    });
    return RUSRUBLESI;
};