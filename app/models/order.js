'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // define association here
        }
    };
    Order.init({
        UserId: DataTypes.INTEGER,
        Amount: DataTypes.INTEGER,
        buyOrSell: DataTypes.STRING,
        OrderType: DataTypes.STRING,
        Parameter: DataTypes.STRING,
        CoinOrCurrency: DataTypes.STRING,
        MajorCurrency: DataTypes.STRING,
        Closed: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};