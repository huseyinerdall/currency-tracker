'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ISVICREFRANGI extends Model {
        static associate(models) {
            // define association here
        }
    };
    ISVICREFRANGI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ISVICREFRANGI',
    });
    return ISVICREFRANGI;
};