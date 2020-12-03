'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NORVECKRONU extends Model {
        static associate(models) {
            // define association here
        }
    };
    NORVECKRONU.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NORVECKRONU',
    });
    return NORVECKRONU;
};