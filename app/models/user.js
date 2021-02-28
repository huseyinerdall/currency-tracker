'use strict';
import wallet from '../static/varliklar.js';
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
        wallet: { type: DataTypes.STRING, defaultValue: wallet },
        spot: { type: DataTypes.STRING, defaultValue: "0" },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};