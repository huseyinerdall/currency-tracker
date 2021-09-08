'use strict';
const initialwallet = require('../static/varliklar.js');
const initialbalancelist = require('../static/defaultbalancelist.js');
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        passwd: DataTypes.STRING,
        profileImage: DataTypes.STRING,
        wallet: { type: DataTypes.JSON, defaultValue: initialwallet },
        active: { type: DataTypes.STRING, defaultValue: 0 },
        balanceNow: DataTypes.FLOAT,
        balanceList: { type: DataTypes.JSON, defaultValue: initialbalancelist },
        /*volumeList: { type: DataTypes.JSON, defaultValue: [] },*/
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};