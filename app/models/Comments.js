'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        static associate(models) {
            // define association here
        }
    };
    Comments.init({
        fullName: DataTypes.STRING,
        profileImage: DataTypes.STRING,
        comment: DataTypes.STRING,
        email: DataTypes.STRING,
        subject: DataTypes.STRING,
        abusive: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Comments',
    });
    return Comments;
};