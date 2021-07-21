let THE_BEGINNING_OF_EVERYTHING = true;
let express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
let fs = require('fs');
let moment = require('moment');
const path = require('path');

let parseString = require('xml2js').parseString;
let utils = require('./utils');
let allPrices = {};
const db = require("./models");
const Op = db.Sequelize.Op;

//static long data
const coins = require('./static/coins.json');
const api = require('./api');
const apiT = require('./apiTers');
const shortnameConvert = require('./static/shortname-convert')
const descriptions = require('./static/descriptions.json');
const BINTLTABLE_LIST = ["ABDDOLARI", "EURO", "INGILIZSTERLINI", "KANADADOLARI", "SUUDIARABISTANRIYALI","JAPONYENI","GoldGramAltin","GoldOnsAltin","GoldGumus","BTC","DOGE","ETH","XRP","USDT"];
const currencyXmlBodyStr = fs.readFileSync('./static/altinkaynakCurrency.xml', 'utf8');
const truncgil = 'https://finans.truncgil.com/today.json';

const app = express();
const admin = require('./admin.js');

app.use(morgan('tiny'));
app.use(cors({ credentials: true }));
app.use('/robots.txt', express.static(path.join(__dirname, 'public/robots.txt')));
app.use('/admin',admin);
app.use(bodyParser.json());
app.use(express.static('public')) // static dosyaları serve etmek için

var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: [`http://localhost:8080`,`http://localhost:8081`,"http://192.168.1.54:8080"],
        //origin: ["https://para.guru","https://www.para.guru","http://para.guru"],
        methods: ["GET", "POST"]
    }
});

require('./user')(app,io);
let Trader = require('./trader');
let UserWallet = require('./user-wallet');

app.get('/tcmb', (req, res) => {
    let factRes = [];
    let temp = {};
    axios.get('https://www.tcmb.gov.tr/kurlar/today.xml')
        .then(response => {
            xml = response.data.toString();
            parseString(xml, function(err, result) {
                console.log(result["Tarih_Date"])
                result = result["Tarih_Date"]["Currency"];

                for (let i = 0; i < result.length; i++) {
                    temp = {};
                    temp["name"] = result[i]["Isim"][0];
                    temp["sell"] = result[i]["BanknoteSelling"][0] || result[i]["ForexSelling"][0];
                    temp["buy"] = result[i]["BanknoteBuying"][0] || result[i]["ForexBuying"][0];
                    factRes.push(temp);
                }
                io.emit('tcmb', factRes);
                res.json(factRes)
            });
        }).catch(err => console.log(err));
})

app.post('/tcmbone', (req, res) => {
    let temp = {};
    let one = req.body.one;
    axios.get('https://www.tcmb.gov.tr/kurlar/today.xml')
        .then(response => {
            xml = response.data.toString();
            parseString(xml, function(err, result) {
                result = result["Tarih_Date"]["Currency"];
                temp = {};
                for (let i = 0; i < result.length; i++) {
                    if(one == result[i]["Isim"][0]){
                        temp["name"] = result[i]["Isim"][0];
                        temp["sell"] = result[i]["BanknoteSelling"][0] || result[i]["ForexSelling"][0];
                        temp["buy"] = result[i]["BanknoteBuying"][0] || result[i]["ForexBuying"][0];
                    }

                }
                res.json(temp);
            });
        }).catch(err => console.log("TCMB veri alınamadı"));
})

app.get('/golds', (req, res) => {
    let golds = [];
    axios.get('https://finans.truncgil.com/today.json')
        .then(response => {
            for (const element in response.data) {
                if (api[element].indexOf("Altın") > 0 || api[element] == '22 Ayar Bilezik' || api[element] == 'Gümüş') {
                    response.data[element]["type"] = element;
                    golds.push(response.data[element])
                }
            }
            res.json(golds)
        })
        .catch(err => console.log(err));
})

app.get('/gold/:goldName', (req, res) => {
    let element = apiT[req.params.goldName];
    axios.get('https://finans.truncgil.com/today.json')
        .then(async response => {
            let sepetalis = ((parseFloat(response.data["USD"]["Alış"].replace(',','.')) + parseFloat(response.data["EUR"]["Alış"].replace(',','.'))) / 2).toFixed(4).replace('.',',');
            let sepetsatis = ((parseFloat(response.data["USD"]["Satış"].replace(',','.')) + parseFloat(response.data["EUR"]["Satış"].replace(',','.'))) / 2).toFixed(4).replace('.',',');
            response.data["SEPET KUR"] = {"Alış":sepetalis,"Satış":sepetsatis};
            response.data[element]["time"] = response.data["Update_Date"];
            if (element.indexOf("altin") > 0 || element == '22-ayar-bilezik' || element == 'gumus') {
                response.data[element]["type"] = api[element];
                indis = "Gold" + utils.turkishToEnglish(api[element])
                let date = new Date().toLocaleDateString("ISO");
                let prevTime = "03:00";
                let nextTime = "06:00";
                a = await db[indis].findOne({
                    where: {
                        createdAt: {
                            [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                        }
                    }
                }).catch((err)=>console.log(err))
                try {
                    response.data[element]["close"] = a["dataValues"]["Satis"];
                }catch {
                    response.data[element]["close"] = response.data[element]["Satış"]
                }

            } else if (element.indexOf("Update") < 0 && element.indexOf("ÇEKME") < 0) {
                response.data[element]["type"] = api[element];
                indis = utils.turkishToEnglish(api[element])
                let date = new Date().toLocaleDateString("ISO");
                let prevTime = "03:00";
                let nextTime = "06:00";
                a = await db[indis].findOne({
                    where: {
                        createdAt: {
                            [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                        }
                    }
                }).catch((err)=>console.log(err))
                try {
                    response.data[element]["close"] = a["dataValues"]["Satis"];
                }catch {
                    response.data[element]["close"] = response.data[element]["Satış"]
                }

            }
            console.log(response.data[element])
            res.json(response.data[element]);
        })
        .catch(err => console.log(err));
})

app.get('/currencies', (req, res) => {
    axios.post('http://data.altinkaynak.com/DataService.asmx', currencyXmlBodyStr, config)
        .then(response => {
            xml = response.data.toString();
            parseString(xml, function(err, result) {

                parseString(result['soap:Envelope']['soap:Body'][0]['GetCurrencyResponse'][0]['GetCurrencyResult'][0], function(err, result2) {
                    res.json(result2["Kurlar"]["Kur"]);
                })

            });
        }).catch(err => console.log(err));
})

app.get('/coin/:coinName', (req, res) => {
    let coinID = utils.search(req.params["coinName"], coins)["id"];
    let coinSymbol = utils.search(req.params["coinName"], coins)["symbol"];
    let data;
    let temp;
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinID}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d`)
        .then(async(response) => {
            if (response.data[0]["current_price"] != temp || !temp) {
                DEFAULT = moment().startOf('day').toString();

                let BEGIN = moment().subtract(1, 'd').toString() || DEFAULT;
                const NOW = new Date();
                data = await db[coinSymbol.toUpperCase()].findAll({
                    where: {
                        createdAt: {
                            [Op.between]: [BEGIN, NOW],
                        }
                    }
                });
                io.emit(req.params["coinName"], data);
            }
            temp = response.data[0]["current_price"];
            res.json(response.data);
        })
        .catch(err => console.error("Kripto para datası alınamıyor !!!"));
})

app.get('/coins', (req, res) => {
    let factRes = [];
    let temp = {};
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=550&page=1&sparkline=false&price_change_percentage=24h,7d`)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                temp = {};
                temp["name"] = response.data[i]["name"];
                temp["shortName"] = response.data[i]["symbol"];
                temp["price"] = response.data[i]["current_price"];
                temp["high"] = response.data[i]["high_24h"];
                temp["low"] = response.data[i]["low_24h"];
                temp["close"] = parseFloat(response.data[i]["current_price"]) - parseFloat(response.data[i]["price_change_24h"]); //close price
                factRes.push(temp);
            }
            res.json(factRes);
        })
})

app.get('/closes', async (req, res) => {
    let BEGIN = moment().subtract(1, 'd').toString() || DEFAULT;
    const NOW = new Date();
    data = await db["Closes"].findAll({
        where: {
            createdAt: {
                [Op.between]: [BEGIN, NOW],
            }
        }
    });
    res.json(data);
})

app.get('/gettopusers', async (req, res) => {
    UserWallet.getTopUsers()
        .then((data)=>{
            res.json(data[0]);
        })
})

app.post('/getcoinaccordingtotimerange', async(req, res) => {
    let time = req.body.time || 1;
    //let coinID = utils.search(req.params["coinName"], coins)["id"];
    let coinName = req.body.coinName;
    let coinSymbol = utils.search(coinName, coins)["symbol"];

    let data;

    let BEGIN = moment().subtract(time, 'd').toDate() || DEFAULT;
    const NOW = new Date();
    //select distinct on ("createdAt"::date) * from AAVEs; -> sql
    if(time == 1){
        data = await db[coinSymbol.toUpperCase()].findAll({
            where: {
                createdAt: {
                    [Op.between]: [BEGIN, NOW],
                },
            },
            order: [
                ['id', 'asc'],
            ],
        });
    }else{
        data = await db.sequelize.query(`select distinct on ("createdAt"::date) * from "${coinSymbol.toUpperCase()}s" where "createdAt" between '${BEGIN.toISOString()}' and '${NOW.toISOString()}'`,null,{
            raw: true
        });
        data = data.slice(0,1)[0];
    }
    io.emit(req.params["coinName"], data);
    res.json(data);
})

app.post('/getgoldaccordingtotimerange', async(req, res) => {
    let time = req.body.time || 1;
    //let coinID = utils.search(req.params["coinName"], coins)["id"];
    let goldName = req.body.goldName;
    let data;

    let BEGIN = moment().subtract(time, 'd').toDate() || DEFAULT;
    const NOW = moment().toDate();

    try{
        if (time == 1){
            data = await db["Gold" + utils.turkishToEnglish(goldName)].findAll({
                where: {
                    createdAt: {
                        [Op.between]: [BEGIN, NOW],
                    }
                },
                order: [
                    ['id', 'asc'],
                ],
            });
        }else{
            data = await db.sequelize.query(`select distinct on ("createdAt"::date) * from "${"Gold" + utils.turkishToEnglish(goldName)}s" where "createdAt" between '${BEGIN.toISOString()}' and '${NOW.toISOString()}'`,null,{
                raw: true
            });
            data = data.slice(0,1)[0];
        }
    }catch (e){
        if (time == 1){
            data = await db[utils.turkishToEnglish(goldName)].findAll({
                where: {
                    createdAt: {
                        [Op.between]: [BEGIN, NOW],
                    }
                },
                order: [
                    ['id', 'asc'],
                ],
            });
        }else{
            data = await db.sequelize.query(`select distinct on ("createdAt"::date) * from "${utils.turkishToEnglish(goldName)}s" where "createdAt" between '${BEGIN.toISOString()}' and '${NOW.toISOString()}'`,null,{
                raw: true
            });
            data = data.slice(0,1)[0];
        }
    }

    io.emit(req.params["goldName"], data);
    res.json(data);
})

app.post('/golddescriptions', async(req, res) => {
    let gold = req.body.goldName;
    let data = goldDescriptions[gold] || '';
    res.send(data);
})

app.post('/bintltable', async(req, res) => {
    let time = req.body.time || 1;
    console.log(time)
    let temp;
    let BINTL = {};
    let BEGIN = moment().subtract(time, 'd').toDate() || DEFAULT;
    const NOW = moment().toDate();
    let data = [];

    axios.get('https://finans.truncgil.com/today.json')
        .then(response =>{
            BINTL["ABDDOLARI"] = +(response.data["USD"]["Satış"].replace(',', '.'));
            BINTL["EURO"] = +(response.data["EUR"]["Satış"].replace(',', '.'));
            BINTL["INGILIZSTERLINI"] = +(response.data["GBP"]["Satış"].replace(',', '.'));
            BINTL["KANADADOLARI"] = +(response.data["CAD"]["Satış"].replace(',', '.'));
            BINTL["JAPONYENI"] = +(response.data["JPY"]["Satış"].replace(',', '.'));
            BINTL["SUUDIARABISTANRIYALI"] = +(response.data["SAR"]["Satış"].replace(',', '.'));
            BINTL["GoldGramAltin"] = parseFloat(response.data["gram-altin"]["Satış"].replace(',', '.'));
            BINTL["GoldOnsAltin"] = parseFloat(response.data["ons"]["Satış"].replace(',', '.'));
            BINTL["GoldGumus"] = parseFloat(response.data["gumus"]["Satış"].replace(',', '.'));
            axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,dogecoin,tether&order=id_asc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d")
                .then(async response => {
                    BINTL["BTC"] = +(response.data[0]["current_price"]);
                    BINTL["ETH"] = +(response.data[2]["current_price"]);
                    BINTL["XRP"] = +(response.data[3]["current_price"]);
                    BINTL["DOGE"] = +(response.data[1]["current_price"]);
                    BINTL["USDT"] = +(response.data[4]["current_price"]);

                    for (let i = 0; i < BINTLTABLE_LIST.length; i++) {
                        temp = {};
                        if(!(BINTLTABLE_LIST[i].length == 3 || BINTLTABLE_LIST[i] == "DOGE" || BINTLTABLE_LIST[i] == "USDT")){
                            a = await db[BINTLTABLE_LIST[i]].findOne({
                                where: {
                                    createdAt: {
                                        [Op.gte]: moment().subtract(time, 'days').toDate()
                                    }
                                }
                            })
                            temp["type"] = BINTLTABLE_LIST[i];
                            temp["value"] = (BINTL[BINTLTABLE_LIST[i]] - parseFloat(a["dataValues"]["Satis"].replace(',', '.'))) * (1000/BINTL[BINTLTABLE_LIST[i]]);
                        }else{
                            a = await db[BINTLTABLE_LIST[i]].findOne({
                                where: {
                                    createdAt: {
                                        [Op.gte]: moment().subtract(time, 'days').toDate()
                                    }
                                }
                            })

                            temp["type"] = BINTLTABLE_LIST[i];
                            temp["value"] = (+BINTL[BINTLTABLE_LIST[i]] - a["dataValues"]["Fiyat"]) * (1000/(BINTL[BINTLTABLE_LIST[i]] * BINTL["ABDDOLARI"]));

                        }
                        data.push(temp);
                    }
                    res.json(data);
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})

app.get('/pariteler', async(req, res) => {
    let temp;
    let BEGIN = moment().subtract(1, 'd').toDate() || DEFAULT;
    const NOW = moment().toDate();
    let data = [];

    axios.get('https://finans.truncgil.com/today.json')
        .then(async response => {

            let updatetime = response.data["Update_Date"];
            for (const element in response.data) {
                if(api[element]=="" ||!api[element]){continue;}
                temp = {};
                if (api[element].indexOf("Altın") > 0 || api[element] == '22 Ayar Bilezik' || api[element] == 'Gümüş') {continue;}
                else if (api[element].indexOf("Update") < 0 && api[element].indexOf("ÇEKME") < 0) {
                    temp["type"] = api[element];
                    temp["time"] = updatetime;
                    temp["today"] = response.data[element]["Satış"];
                    indis = utils.turkishToEnglish(api[element]);
                    a = await db[indis].findOne({
                        where: {
                            createdAt: {
                                [Op.gte]: moment().subtract(2, 'days').toDate()
                            }
                        }
                    }).catch((err)=>console.log(err))
                    console.log(a)
                    temp["yesterday"] = a["dataValues"]["Satis"];
                    data.push(temp);
                    console.log(temp)
                }

            }
            res.json(data);
        })
        .catch(err => console.log(err));
})

app.post('/converter', (req, res) => {
    console.log(req.body.source)
    let source = req.body.source;
    let target = req.body.target;
    let amount = req.body.amount;
    console.log(source,target)
    console.log(target)
    axios.get(truncgil)
        .then((response) => {
            let s;

            let a = +amount;
            let result;
            if (target == "TÜRK LİRASI" && source != "TÜRK LİRASI") {
                s = +(response.data[apiT[source]]["Satış"].replace(",","."));
                result = (a * s);
            }
            if (source == "TÜRK LİRASI" && target != "TÜRK LİRASI") {
                s = +(response.data[apiT[target]]["Satış"].replace(",","."));
                result = (a * s);
            }
            if (target == "TÜRK LİRASI" && source == "TÜRK LİRASI") {
                result = a;
            }
            if(target != "TÜRK LİRASI" && source != "TÜRK LİRASI"){
                let t = +(response.data[apiT[target]]["Satış"].replace(",","."));
                s = +(response.data[apiT[source]]["Satış"].replace(",","."));
                result = a * (s / t).toFixed(4);
            }

            res.json({ "result": result.toFixed(4) });
        })
        .catch((err) => console.log(err))
})

app.post('/buynow', (req, res) => {
    let userId = req.body.userId;
    let orderType = req.body.orderType;
    let parameter = req.body.parameter;
    let wealth = req.body.wealth;
    let amount = req.body.amount;
    let major = req.body.major || "TÜRK LİRASI";
    console.log(userId,orderType,parameter,wealth,amount,major);
    Trader.setBuyOrder(userId,orderType,parameter,wealth,amount,major)
        .then((orderId)=>{
            console.log(orderId)
        })

    res.sendStatus(200);
})

app.post('/sellnow', (req, res) => {
    let userId = req.body.userId;
    let orderType = req.body.orderType;
    let parameter = req.body.parameter;
    let wealth = req.body.wealth;
    let amount = req.body.amount;
    let major = req.body.major || "TÜRK LİRASI";
    Trader.setSellOrder(userId,orderType,parameter,wealth,amount,major)
        .then((orderId)=>{
            console.log(orderId)
        })
    /*Trader.setSellOrder(userId,orderType,parameter,wealth,amount,major,1)
        .then((orderId)=>{
            Trader.sell(
                userId,
                wealth,
                parameter,
                amount,
                "TÜRK LİRASI",
                orderId
            )
        })

    io.emit('sell', {
        userId: userId,
        CoinOrCurrency: wealth,
        Amount: amount
    });*/
    res.sendStatus(200);
});

app.post('/buysellnow', (req, res) => {
    let orderId = req.body.orderId;
    let buyOrSell = req.body.buyOrSell;
    let userId = req.body.userId;
    let wealth = req.body.coinOrCurrency;
    let amount = req.body.amount;
    console.log(orderId,buyOrSell,"*******-**************")
    Trader.buySellNow(orderId)
        .then((result) => {
            if(result == "OK"){
                io.emit(buyOrSell, {
                    userId: userId,
                    CoinOrCurrency: wealth,
                    Amount: amount
                });
                res.sendStatus(200);
            }
        })
        .catch((err) => {
            console.log(err)})


});


app.post('/setbuyorder', (req, res) => {
    let userId = req.body.userId;
    let orderType = req.body.orderType;
    let parameter = req.body.parameter;
    console.log(apiT[req.body.wealth] , req.body.wealth)
    let wealth = apiT[req.body.wealth] || req.body.wealth;
    let amount = req.body.amount;
    console.log(amount,":Amount");
    let major = req.body.major || "TÜRK LİRASI";
    let result = Trader.setBuyOrder(userId,orderType,parameter,wealth,amount,major);
    res.send(result);
})

app.post('/setsellorder', (req, res) => {
    let userId = req.body.userId;
    let orderType = req.body.orderType;
    let parameter = req.body.parameter;
    let wealth = req.body.wealth;
    let amount = req.body.amount;
    let major = req.body.major || "TÜRK LİRASI";
    let result = Trader.setSellOrder(userId,orderType,parameter,wealth,amount,major);
    res.send(result);
})

app.post('/deleteorder', (req, res) => {
    let orderId = req.body.orderId;
    Trader.deleteOrder(orderId);
})

app.post('/getallorder', async(req, res) => {
    let userId = req.body.userId;
    console.log(userId)
    let response = await Trader.getOrdersByUser(userId);
    res.json(response);
})

app.post('/getopenorder', async(req, res) => {
    let userId = req.body.userId;
    let response = await Trader.getOpenOrdersByUser(userId);
    res.json(response);
})

app.post('/getclosedorder', async(req, res) => {
    let userId = req.body.userId;
    let response = await Trader.getClosedOrdersByUser(userId);
    res.json(response);
})

const MAINLOOPINTERVAL = 5000;
let allImages = {};
db.sequelize.sync().then(() => {

    const port = process.env.PORT || 4000;
    server.listen(port, () => {
        console.log(`listening on ${port}`);
    });


    let M = {}; // coin değişimini tespit için
    let C = {}; // döviz değişimini tespit için
    let factRes = [];
    let factRes30 = [];
    let golds = [];
    let currencies = [];
    let dolar = 1;
    allPrices["TRY"] = 1;
    let ters = {};
    let varliklar = {};
    setInterval(() => {
        factRes30 = [];
        factRes = [];
        golds = [];
        currencies = [];
        let temp = {};
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=markey_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h,7d`)
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    temp = {};
                    temp["name"] = response.data[i]["name"];
                    temp["shortName"] = response.data[i]["symbol"];
                    temp["price"] = response.data[i]["current_price"];
                    temp["change"] = response.data[i]["price_change_24h"];
                    temp["market_cap"] = response.data[i]["market_cap"];
                    temp["volume"] = response.data[i]["total_volume"];
                    temp["pricechange24h"] = response.data[i]["price_change_percentage_24h"];
                    temp["pricechange7d"] = response.data[i]["price_change_percentage_7d_in_currency"] || 0;
                    temp["time"] = response.data[i]["last_updated"];
                    temp["image"] = response.data[i]["image"];
                    temp["sparkline"] = response.data[i]["sparkline_in_7d"]["price"];
                    temp["Tür"] = "Kripto";
                    ters[response.data[i]["symbol"]] = response.data[i]["name"];
                    allPrices[response.data[i]["name"]] = (response.data[i]["current_price"] * dolar);
                    allImages[response.data[i]["name"]] = response.data[i]["image"];
                    varliklar[response.data[i]["name"]] = {
                        amount: 0,
                        shortName: response.data[i]["symbol"],
                        cost: 0
                    }
                    factRes.push(temp);
                    if(i<30){
                        factRes30.push(temp);
                    }

                    // aşagıdaki koşul sadece api çıktısı aynı sırada sonuçlanırsa düzgün calışır
                    if (response.data[i]["last_updated"] != M[response.data[i]["symbol"]] && db[response.data[i]["symbol"].toUpperCase()]) {
                        if(response.data[i]["symbol"].toUpperCase() == "1INCH"){response.data[i]["symbol"] = "ONEINCH"}
                        if(response.data[i]["symbol"].toUpperCase() == "YVAULT-LP-YCURVE"){response.data[i]["symbol"] = "YVAULTLPYCURVE"}
                        db[response.data[i]["symbol"].toUpperCase()].create({ Fiyat: response.data[i]["current_price"] })
                            //db[response.data[i]["symbol"]].destroy({ truncate : true, cascade: false })
                        M[response.data[i]["symbol"]] = response.data[i]["last_updated"];
                    }

                }

            })
            .catch(err => 1+1);

        axios.get('https://finans.truncgil.com/today.json')
            .then(async response => {
                dolar = parseFloat(response.data["USD"]["Alış"].replace(',','.'))
                let sepetalis = ((parseFloat(response.data["USD"]["Alış"].replace(',','.')) + parseFloat(response.data["EUR"]["Alış"].replace(',','.'))) / 2).toFixed(4);
                let sepetsatis = ((parseFloat(response.data["USD"]["Satış"].replace(',','.')) + parseFloat(response.data["EUR"]["Satış"].replace(',','.'))) / 2).toFixed(4);
                let updatetime = response.data["Update_Date"];
                response.data["SEPET KUR"] = {"Alış":sepetalis.replace('.',','),"Satış":sepetsatis.replace('.',','),"Tür": 'Döviz',"type":"SEPET KUR","time":updatetime};
                for (const element in response.data) {
                    if (api[element] == "" || !api[element]) {
                        continue;
                    }
                    if (element == 'Update_Date') {
                        continue;
                    }
                    if (api[element].indexOf("Altın") > 0 || api[element] == '22 Ayar Bilezik' || api[element] == 'Gümüş') {
                        response.data[element]["type"] = api[element];
                        response.data[element]["time"] = updatetime;
                        indis = "Gold" + utils.turkishToEnglish(api[element])
                        //db[indis].destroy({ truncate : true, cascade: true })
                        if (db[indis] && response.data[element]["Alış"] != C[indis] ||
                            (new Date().getHours() == "1" && new Date().getMinutes() == "20" && new Date().getSeconds() < 15)) {
                            db[indis]
                                .create({Alis: response.data[element]["Alış"], Satis: response.data[element]["Satış"]})
                            C[indis] = response.data[element]["Alış"];
                        }
                        let date = new Date().toISOString().substring(0, 10);
                        let prevTime = "01:19";
                        let nextTime = "01:21";
                        a = await db[indis].findOne({
                            where: {
                                createdAt: {
                                    [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                                }
                            }
                        }).catch((err) => console.log("Geç"))
                        try {
                            response.data[element]["close"] = a["dataValues"]["Satis"];
                        } catch {
                            response.data[element]["close"] = response.data[element]["Satış"]
                        }

                        golds.push(response.data[element]);
                        allPrices[api[element]] = parseFloat(response.data[element]["Satış"].replace(",","."));

                        varliklar[api[element]] = {
                            amount: 0,
                            shortName: element,
                            cost: 0
                        }

                    } else if (api[element].indexOf("Update_Date") < 0 && api[element].indexOf("ÇEKME") < 0) {
                        response.data[element]["type"] = api[element];
                        response.data[element]["time"] = updatetime;
                        response.data[element]["Alış"] = response.data[element]["Alış"].replace(',','.');
                        response.data[element]["Satış"] = response.data[element]["Satış"].replace(',','.');
                        indis = utils.turkishToEnglish(api[element])
                        //db[indis].destroy({ truncate : true, cascade: false })
                        if (db[indis] && response.data[element]["Alış"] != C[indis] ||
                            (new Date().getHours() == "1" && new Date().getMinutes() == "21" && new Date().getSeconds() < 15)) {
                            db[indis]
                                .create({Alis: response.data[element]["Alış"], Satis: response.data[element]["Satış"]})
                            C[indis] = response.data[element]["Alış"];
                        }
                        let date = new Date().toISOString().substring(0, 10);
                        let prevTime = "01:20";
                        let nextTime = "01:22";
                        a = await db[indis].findOne({
                            where: {
                                createdAt: {
                                    [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                                }
                            }
                        }).catch((err) => console.log("Geç"))
                        try {
                            response.data[element]["close"] = a["dataValues"]["Satis"];
                        } catch {
                            response.data[element]["close"] = response.data[element]["Satış"]
                        }
                        currencies.push(response.data[element]);
                        allPrices[api[element]] = parseFloat(response.data[element]["Satış"].replace(",","."));

                        varliklar[api[element]] = {
                            amount: 0,
                            shortName: element,
                            cost: 0
                        }
                    }
                }
            })
            .catch(err => console.log(err));
        // al sat yapılacak yer
        // bburada açık emirlerin hepsi alınacak ve gerekli condition sağlanıyorsa işlem gerçekleştirilecek

        /*fs.writeFile('varliklar.json', JSON.stringify(varliklar), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });*/

        UserWallet.saveUsersBalanceDaily(allPrices);
    }, MAINLOOPINTERVAL)

    setInterval(() => {
        if(factRes.length == 250){io.emit('coins', factRes);}
        if(factRes30.length == 30){io.emit('coins30', factRes30);}
        if(golds.length == 16){io.emit('golds', golds);}
        if(currencies.length == 19){io.emit('currencies', currencies);}
        io.emit('allprices', allPrices);
    },1000);

    let prevOrderNumber = 0;
    setInterval(() => {

       Trader.getAllOpenOrders()
           .then((openOrders)=>{
               if(prevOrderNumber !== openOrders.length){
                   console.log(`Bekleyen ${openOrders.length} emir var...`);
                   prevOrderNumber = openOrders.length;
               }
               for (let i = 0; i < openOrders.length; i++) {

                   if(openOrders[i]["dataValues"]["OrderType"] === 'price'){

                       if(openOrders[i]["dataValues"]["buyOrSell"] == 'buy' &&
                           (parseFloat(openOrders[i]["dataValues"]["Parameter"].replace(",",".")) >=
                               parseFloat(allPrices[openOrders[i]["dataValues"]["CoinOrCurrency"]]))){

                           Trader.buy(
                               openOrders[i]["dataValues"]["UserId"],
                               openOrders[i]["dataValues"]["CoinOrCurrency"],
                               openOrders[i]["dataValues"]["Parameter"],
                               openOrders[i]["dataValues"]["Amount"],
                               "TÜRK LİRASI",
                               openOrders[i]["dataValues"]["id"]
                           )
                               .then((result) => {
                                   if(result == "OK"){
                                       io.emit('buy', {
                                           userId: openOrders[i]["dataValues"]["UserId"],
                                           CoinOrCurrency: openOrders[i]["dataValues"]["CoinOrCurrency"],
                                           Amount: openOrders[i]["dataValues"]["Amount"],
                                           orderId: openOrders[i]["dataValues"]["id"]
                                       });
                                   }
                                   openOrders.splice(i,1);
                               })
                               .catch((err)=>{
                                   console.log(err)})

                       }
                       else if(openOrders[i]["dataValues"]["buyOrSell"] == 'sell' &&
                           (parseFloat(openOrders[i]["dataValues"]["Parameter"].replace(",",".")) <=
                               parseFloat(allPrices[openOrders[i]["dataValues"]["CoinOrCurrency"]]))){
                           Trader.sell(
                               openOrders[i]["dataValues"]["UserId"],
                               openOrders[i]["dataValues"]["CoinOrCurrency"],
                               openOrders[i]["dataValues"]["Parameter"],
                               openOrders[i]["dataValues"]["Amount"],
                               "TÜRK LİRASI",
                               openOrders[i]["dataValues"]["id"]
                           )
                               .then((result) => {
                                   if(result == "OK"){
                                       io.emit('sell', {
                                           userId: openOrders[i]["dataValues"]["UserId"],
                                           CoinOrCurrency: openOrders[i]["dataValues"]["CoinOrCurrency"],
                                           Amount: openOrders[i]["dataValues"]["Amount"],
                                           orderId: openOrders[i]["dataValues"]["id"]
                                       });
                                   }
                                   openOrders.splice(i,1);
                               })
                               .catch((err)=>{
                                   console.log(err)})
                       }
                   }else if(openOrders[i].dataValues.OrderType == 'time'){
                       console.log(new Date(openOrders[i]["dataValues"]["Parameter"]),"000000000000000")
                       if(openOrders[i]["dataValues"]["buyOrSell"] == 'buy' &&
                           new Date(openOrders[i]["dataValues"]["Parameter"]) <= new Date()){

                           /*let priceNow = parseFloat((allPrices[allPrices[openOrders[i]["dataValues"]["CoinOrCurrency"]]
                           ||apiT[openOrders[i]["dataValues"]["CoinOrCurrency"]]]));*/
                           let priceNow = parseFloat(allPrices[openOrders[i]["dataValues"]["CoinOrCurrency"]]) ||
                                          parseFloat(allPrices[apiT[openOrders[i]["dataValues"]["CoinOrCurrency"]].replace(",",".")]);
                           console.log(openOrders[i]["dataValues"]["CoinOrCurrency"],"coin or currency")
                           Trader.buy(
                               openOrders[i]["dataValues"]["UserId"],
                               openOrders[i]["dataValues"]["CoinOrCurrency"],
                               priceNow,
                               openOrders[i]["dataValues"]["Amount"],
                               "TÜRK LİRASI",
                               openOrders[i]["dataValues"]["id"]
                           )
                               .then((result) => {
                                   io.emit('buy', {
                                       userId: openOrders[i]["dataValues"]["UserId"],
                                       CoinOrCurrency: openOrders[i]["dataValues"]["CoinOrCurrency"],
                                       Amount: openOrders[i]["dataValues"]["Amount"],
                                       orderId: openOrders[i]["dataValues"]["id"]
                                   });
                                   if(result == "OK"){
                                       io.emit('buy', {
                                           userId: openOrders[i]["dataValues"]["UserId"],
                                           CoinOrCurrency: openOrders[i]["dataValues"]["CoinOrCurrency"],
                                           Amount: openOrders[i]["dataValues"]["Amount"],
                                           orderId: openOrders[i]["dataValues"]["id"]
                                       });
                                   }
                                   openOrders.splice(i,1);
                               })
                               .catch((err)=>{
                                   console.log(err)})
                           openOrders.splice(i,1);
                       }

                       else if(openOrders[i]["dataValues"]["buyOrSell"] == 'sell' &&
                           new Date(openOrders[i]["dataValues"]["Parameter"]) <= new Date()){

                           let priceNow = parseFloat(allPrices[openOrders[i]["dataValues"]["CoinOrCurrency"]]) ||
                               parseFloat(allPrices[apiT[openOrders[i]["dataValues"]["CoinOrCurrency"]].replace(",",".")]);

                           Trader.sell(
                               openOrders[i]["dataValues"]["UserId"],
                               openOrders[i]["dataValues"]["CoinOrCurrency"],
                               priceNow,
                               openOrders[i]["dataValues"]["Amount"],
                               "TÜRK LİRASI",
                               openOrders[i]["dataValues"]["id"]
                           )
                               .then((result) => {
                                   if(result == "OK"){
                                       io.emit('sell', {
                                           userId: openOrders[i]["dataValues"]["UserId"],
                                           CoinOrCurrency: openOrders[i]["dataValues"]["CoinOrCurrency"],
                                           Amount: openOrders[i]["dataValues"]["Amount"],
                                           orderId: openOrders[i]["dataValues"]["id"]
                                       });
                                   }
                                   openOrders.splice(i,1);
                               })
                               .catch((err)=>{
                                   console.log(err)})
                           openOrders.splice(i,1);
                       }
                   }
               }
           })

        UserWallet.getAllUsers()
            .then((users)=>{
                for (let i = 0; i < users.length; i++) {
                    users[i]["dataValues"]
                }
            })
    },3000);

})

setTimeout(() => { THE_BEGINNING_OF_EVERYTHING = false; },20000);