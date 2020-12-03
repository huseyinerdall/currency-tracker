'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EURO extends Model {
        static associate(models) {
            // define association here
        }
    };
    EURO.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'EURO',
    });
    return EURO;
};