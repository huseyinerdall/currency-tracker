'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PAKISTANRUPISI extends Model {
        static associate(models) {
            // define association here
        }
    };
    PAKISTANRUPISI.init({
        Alis: DataTypes.STRING,
        Satis: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PAKISTANRUPISI',
    });
    return PAKISTANRUPISI;
};