'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ISVECKRONU extends Model {
        static associate(models) {
            // define association here
        }
    };
    ISVECKRONU.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ISVECKRONU',
    });
    return ISVECKRONU;
};