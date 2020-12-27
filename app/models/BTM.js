'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BTM extends Model {
        static associate(models) {
            // define association here
        }
    };
    BTM.init({
        Fiyat: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BTM',
    });
    return BTM;
};