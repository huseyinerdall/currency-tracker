const db = require("./models");
const Op = db.Sequelize.Op;

class Trade{

    buy(
        userId,
        wealth,
        wealthPrice,
        amount,
        major = "TÜRK LİRASI",
        orderId
    ){
        let temp = {};
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then(async(user) =>{
                let tradePurpose = amount * wealthPrice;
                temp = await user.dataValues.wallet;
                temp["TÜRK LİRASI"]["amount"] = parseFloat(temp["TÜRK LİRASI"].amount) - parseFloat(tradePurpose);
                temp[wealth].amount = amount;
                user.wallet = temp;
                db.User.update({
                    wallet: temp
                }, {
                    where: { id: userId },
                    returning: true,
                    plain: true
                })
                    .then(function (result) {
                        db.Order.update({
                            Closed: 1
                        }, {
                            where: { id: orderId },
                            returning: true,
                            plain: true
                        })
                            .then(()=>{
                                console.log("Order Occured!!!")})
                            .catch(()=>{return 0;})
                        return 1;
                    })
                    .catch(()=>{return 0;})
            })
            .catch((err)=>{console.log(err);return 0;})
    }

    sell(
        userId,
        wealth,
        wealthPrice,
        amount,
        major = "TÜRK LİRASI",
        orderId
    ){
        let temp = null;
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then(async(user) =>{
                let tradePurpose = amount * wealthPrice;
                temp = user.dataValues.wallet;
                temp["TÜRK LİRASI"].amount = parseFloat(user.dataValues.wallet["TÜRK LİRASI"].amount) + parseFloat(tradePurpose);
                temp[wealth].amount = temp[wealth].amount - amount;
                user.wallet = temp;
                db.User.update({
                    wallet: temp
                }, {
                    where: { id: userId },
                    returning: true,
                    plain: true
                })
                    .then(function (result) {
                        db.Order.update({
                            Closed: 1
                        }, {
                            where: { id: orderId },
                            returning: true,
                            plain: true
                        })
                            .then(()=>{
                                console.log("Order Occured!!!")})
                            .catch(()=>{return 0;})
                    });
            })
            .catch((err)=>{console.log(err)})
    }

    setBuyOrder(
        userId,
        orderType,
        parameter,
        wealth,
        amount,
        major = "TÜRK LİRASI",
        closed=0
    ){
        return new Promise((resolve, reject)=>{
            db.Order.create({
                UserId: userId,
                buyOrSell: 'buy',
                OrderType: orderType, // "time" or "price"
                Parameter: parameter, // time or price
                CoinOrCurrency: wealth,
                MajorCurrency: major,
                Amount: amount,
                Closed: closed
            })
                .then((data)=>{
                    resolve(data.dataValues.id);
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    }

    setSellOrder(
        userId,
        orderType,
        parameter,
        wealth,
        amount,
        major = "TÜRK LİRASI",
        closed=0
    ){
        return new Promise((resolve, reject)=>{
            db.Order.create({
                UserId: userId,
                buyOrSell: 'sell',
                OrderType: orderType, // "time" or "price"
                Parameter: parameter, // time or price
                CoinOrCurrency: wealth,
                MajorCurrency: major,
                Amount: amount,
                Closed: closed
            })
                .then((data)=>{
                    resolve(data.dataValues.id);
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    }

    getAllOpenOrders(){
        return new Promise((resolve, reject)=>{
            db.Order.findAll({
                where: {
                    Closed: 0
                }
            })
                .then((data)=>{
                    resolve(data);
                })
                .catch((err)=>{
                    console.log(err);
                    reject(err);
                })
        });
    }

    getOpenOrdersByUser(
        userId,
        wealth = null
    ){
        return new Promise((resolve, reject)=>{
            if(wealth){//eğer specific bir varlık isteniyorsa
                db.Order.findAll({
                    where: {
                        UserId: userId,
                        Closed: 0,
                        CoinOrCurrency: wealth
                    }
                })
                    .then((data)=>{
                        resolve(data);
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            }
            else{
                db.Order.findAll({
                    where: {
                        UserId: userId,
                        Closed: 0
                    }
                })
                    .then((data)=>{
                        resolve(data);
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            }
        })
    }

    getClosedOrdersByUser(
        userId,
        wealth = null
    ){
        return new Promise((resolve, reject)=>{
            if(wealth){//eğer specific bir varlık isteniyorsa
                db.Order.findAll({
                    where: {
                        UserId: userId,
                        Closed: 1,
                        CoinOrCurrency: wealth
                    }
                })
                    .then((data)=>{
                        resolve(data);
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            }
            else{
                db.Order.findAll({
                    where: {
                        UserId: userId,
                        Closed: 1
                    }
                })
                    .then((data)=>{
                        resolve(data);
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            }
        })
    }

    async deleteOrder(
        orderId
    ){
        let order = await db.Order.findOne({
            where: {
                id: orderId
            }
        })
        order.destroy()
            .then(()=>{return 1;})
            .catch((err)=>{
                console.log(err);
                return 0;
            })
    }
}
//new Trade().buy(1,"Polkadot",40.96,10)
module.exports = new Trade();