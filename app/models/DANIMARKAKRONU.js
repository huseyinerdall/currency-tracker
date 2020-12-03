'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DANIMARKAKRONU extends Model {
        static associate(models) {
            // define association here
        }
    };
    DANIMARKAKRONU.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'DANIMARKAKRONU',
    });
    return DANIMARKAKRONU;
};