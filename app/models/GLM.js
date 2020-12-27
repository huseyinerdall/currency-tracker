'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GLM extends Model {
        static associate(models) {
            // define association here
        }
    };
    GLM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'GLM',
    });
    return GLM;
};