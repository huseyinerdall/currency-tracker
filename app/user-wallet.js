const db = require("./models");
const Op = db.Sequelize.Op;
const shortToName = require("./static/short-to-name")


class UserWallet{
    getAllUsers(){
        return new Promise((resolve, reject)=>{
            db.User.findAll({
                where: {
                    // filter buraya
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

    removeUser(userId){
        return new Promise((resolve, reject)=>{
            db.User.destroy({
                where: {
                    id: userId
                }
            })
                .then((data)=>{
                    db.Order.destroy({
                        where: {
                            UserId: userId
                        }
                    })
                        .then((data)=>{
                            resolve(data);
                        })
                        .catch((err)=>{
                            console.log(err);
                            reject(err);
                        })
                })
                .catch((err)=>{
                    console.log(err);
                    reject(err);
                })

        });
    }

    calculateBalance(wallet,allPrices){
        let balance = 0;
        for (const key in wallet) {
            if(wallet[key]["amount"]>0){
                balance += (wallet[key]["amount"]*allPrices[shortToName[wallet[key]["shortName"]]]) || 0;
            }
        }
        return balance;
    }

    saveUsersBalanceDaily(allPrices){
        this.getAllUsers()
            .then((users)=>{
                for (let i = 0; i < users.length; i++) {
                    let balance = this.calculateBalance(users[i]["dataValues"]["wallet"],allPrices);
                    let prevbalanceList = users[i]["dataValues"]["balanceList"];
                    prevbalanceList[new Date(new Date().toDateString())] = parseFloat(balance.toFixed(2));
                    db.User.update({
                        balanceList: prevbalanceList,
                        balanceNow: balance
                    }, {
                        where: { id: users[i]["dataValues"]["id"] },
                        returning: true,
                        plain: true
                    })
                }
            })
    }

    getUserBalanceByTime(time=7){ // time : gün sayısı  default 1 hafta

    }

    getTopUsers(numberOfUsers=10,currenntUser=1){
        return db.sequelize.query(`select row_number() over (order by "balanceNow" desc) as "sirano", "fullName","profileImage","wallet","balanceNow" from "Users" order by "balanceNow" desc limit ${numberOfUsers}`,null,{
            raw: true
        });
    }

}

module.exports = new UserWallet();