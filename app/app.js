var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
var fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var moment = require('moment');


var parseString = require('xml2js').parseString;
var utils = require('./utils');
var upload = require('./utils/upload');

console.log(upload)

const db = require("./models");

const Op = db.Sequelize.Op;


const SECRET_KEY = 'SI6ImM1Z';

//static long data
const coins = require('./static/coins.json');

const goldXmlBodyStr = fs.readFileSync('./static/altinkaynakGold.xml', 'utf8');

const currencyXmlBodyStr = fs.readFileSync('./static/altinkaynakCurrency.xml', 'utf8');
const truncgil = 'https://finans.truncgil.com/today.json';
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
app.use(morgan('tiny'));
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(express.static('public')) // static dosyaları serve etmek için


var config = {
    headers: {
        'Host': 'data.altinkaynak.com',
        'Content-Type': 'application/soap+xml; charset=utf-8',
        //'Content-Length': 100,
    }
};

app.get('/tcmb', (req, res) => {
    let factRes = [];
    let temp = {};
    axios.get('https://www.tcmb.gov.tr/kurlar/today.xml')
        .then(response => {
            xml = response.data.toString();
            parseString(xml, function(err, result) {

                result = result["Tarih_Date"]["Currency"];
                for (let i = 0; i < result.length; i++) {
                    temp = {};
                    temp["name"] = result[i]["Isim"][0];
                    temp["sell"] = result[i]["BanknoteSelling"][0] || result[i]["ForexSelling"][0];
                    temp["buy"] = result[i]["BanknoteBuying"][0] || result[i]["ForexBuying"][0];
                    factRes.push(temp);
                }
                io.emit('tcmb', factRes);
            });
        }).catch(err => console.log(err));
})

/*app.get('/golds', (req, res) => {
    let factRes = [];
    let temp = {};
    axios.post('http://data.altinkaynak.com/DataService.asmx', goldXmlBodyStr, config)
        .then(response => {
            xml = response.data.toString();
            parseString(xml, function (err, result) {

                parseString(result['soap:Envelope']['soap:Body'][0]['GetGoldResponse'][0]['GetGoldResult'][0], function (err, result) {
                    result = result["Kurlar"]["Kur"];
                    for (let i = 0; i < result.length; i++) {
                        temp = {};
                        temp["type"] = result[i]["Aciklama"][0]
                        temp["sell"] = result[i]["Alis"]
                        temp["buy"] = result[i]["Satis"]
                        temp["updated"] = result[i]["GuncellenmeZamani"]
                        factRes.push(temp);
                    }
                    res.json(factRes);
                })

            });
        }).catch(err => console.log(err));
})*/

app.get('/golds', (req, res) => {
    let golds = [];
    axios.get('https://finans.truncgil.com/today.json')
        .then(response => {
            for (const element in response.data) {
                if (element.indexOf("Altın") > 0 || element == '22 Ayar Bilezik' || element == 'Gümüş') {
                    response.data[element]["type"] = element;
                    golds.push(response.data[element])
                }
            }
            res.json(golds)
        })
        .catch(err => console.log(err));
})

app.get('/gold/:goldName', (req, res) => {
    axios.get('https://finans.truncgil.com/today.json')
        .then(response => {
            res.json(response.data[req.params.goldName])
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
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinID}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
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
                console.log(new Date(BEGIN))
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
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
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

app.post('/getcoinaccordingtotimerange', async(req, res) => {
    let time = req.body.time || 1;
    //let coinID = utils.search(req.params["coinName"], coins)["id"];
    let coinName = req.body.coinName;
    let coinSymbol = utils.search(coinName, coins)["symbol"];
    let data;

    let BEGIN = moment().subtract(time, 'd').toString() || DEFAULT;
    const NOW = new Date();
    data = await db[coinSymbol.toUpperCase()].findAll({
        where: {
            createdAt: {
                [Op.between]: [BEGIN, NOW],
            }
        }
    });
    io.emit(req.params["coinName"], data);
    res.json(data);
})

app.post('/sendcomment', async(req, res) => {
    let fullName = req.body.fullName;
    let comment = req.body.message;
    let subject = req.body.subject;
    db["Comments"].create({
            fullName: fullName,
            comment: comment,
            subject: subject,
        })
        //io.emit(req.params["coinName"],data);
    res.json({
        fullName: fullName,
        comment: comment,
        subject: subject,
        createdAt: new Date().toLocaleTimeString(),
    });
})

app.post('/getcomments', async(req, res) => {
    let subject = req.body.subject;
    let data;
    let BEGIN = moment().subtract(1, 'd').toString() || DEFAULT;
    const NOW = new Date();
    data = await db["Comments"].findAll({
        where: {
            createdAt: {
                [Op.between]: [BEGIN, NOW],
            },
            subject: subject
        }
    });
    io.emit(req.params["comments"], data);
    res.json(data);
})

app.post('/converter', (req, res) => {
    let source = req.body.source;
    let target = req.body.target;
    let amount = req.body.amount;
    axios.get(truncgil)
        .then((response) => {
            let s = +response.data[source]["Alış"];

            let a = +amount;
            let result;
            if (target == "TÜRK LİRASI") {
                result = (a * s);
            } else if (source == "TÜRK LİRASI") {
                let t = +response.data[target]["Alış"];
                result = (a / t).toFixed(4);
            } else {
                let t = +response.data[target]["Alış"];
                result = a * (s / t).toFixed(4);
            }

            console.log("result", result)
            res.json({ "result": result });
        })
})

app.post('/register', (req, res) => {

    db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (user) {
                res.send("Bu email adresi çoktan kullanılmış.");
            } else {
                req.body.passwd = bcrypt.hashSync(req.body.passwd, 8);
                db.User.create(req.body)
                console.log("Kullanıcı kadedildi!!!");
                res.send("OK");
            }
        })
        .catch(err => res.send(err.message))
})

app.post('/avatar', upload.single('file'), (req, res) => {

    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        console.log("Dosya yüklendi");
        return res.send({
            success: true
        })
    }
});

app.post('/login', (req, res) => {
    console.log(req.body)
    if (!req.body.email || !req.body.passwd) {
        res.send("Alanlar boş bırakılamaz!")
    }
    db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            let passwordIsValid = bcrypt.compareSync(req.body.passwd, user.dataValues.passwd)
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            let token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
            console.log(token)
            res.status(200).send({ auth: true, token: token, user: user });
        })
        .catch(err => {
            res.send("ERROR")
        })
})







db.sequelize.sync().then(() => {

    const port = process.env.PORT || 4000;
    server.listen(port, () => {
        console.log(`listening on ${port}`);
    });


    let tempDolar = 0;
    let tempBitcoin = 0;
    let M = {}; // coin değişimini tespit için
    let C = {}; // döviz değişimini tespit için
    setInterval(() => {
        let factRes = [];
        let golds = [];
        let currencies = [];
        let temp = {};

        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    temp = {};
                    temp["name"] = response.data[i]["name"];
                    temp["shortName"] = response.data[i]["symbol"];
                    temp["price"] = response.data[i]["current_price"];
                    temp["change"] = response.data[i]["price_change_24h"];
                    temp["volume"] = response.data[i]["total_volume"];
                    temp["pricechange24h"] = response.data[i]["price_change_24h"];
                    temp["time"] = response.data[i]["last_updated"];
                    temp["close"] = parseFloat(response.data[i]["current_price"]) + parseFloat(response.data[i]["price_change_percentage_24h"]); //close price
                    factRes.push(temp);

                    // aşagıdaki koşul sadece api çıktısı aynı sırada sonuçlanırsa düzgün calışır
                    if (response.data[i]["current_price"] != M[response.data[i]["symbol"]] && db[response.data[i]["symbol"].toUpperCase()]) {

                        db[response.data[i]["symbol"].toUpperCase()].create({ Fiyat: response.data[i]["current_price"] })
                            //db[response.data[i]["symbol"]].destroy({ truncate : true, cascade: false })
                        M[response.data[i]["symbol"]] = response.data[i]["current_price"];
                    }

                }
                io.emit('coins', factRes);
            })
            .catch(err => console.error("Kripto para datası alınamıyor !!!"));

        axios.get('https://finans.truncgil.com/today.json')
            .then(response => {
                let updatetime = response.data["Güncelleme Tarihi"];
                for (const element in response.data) {
                    if (element.indexOf("Altın") > 0 || element == '22 Ayar Bilezik' || element == 'Gümüş') {
                        response.data[element]["type"] = element;
                        response.data[element]["time"] = updatetime;

                        indis = "Gold" + utils.turkishToEnglish(element)
                            //db[indis].destroy({ truncate : true, cascade: true })
                        if (db[indis] && response.data[element]["Alış"] != C[indis]) {
                            db[indis]
                                .create({ Alis: response.data[element]["Alış"], Satis: response.data[element]["Satış"] })
                            C[indis] = response.data[element]["Alış"];
                        }
                        golds.push(response.data[element]);
                    } else if (element.indexOf("Güncelleme") < 0 && element.indexOf("ÇEKME") < 0) {
                        response.data[element]["type"] = element;
                        response.data[element]["time"] = updatetime;
                        indis = utils.turkishToEnglish(element)
                            //db[indis].destroy({ truncate : true, cascade: false })
                        if (db[indis] && response.data[element]["Alış"] != C[indis]) {
                            db[indis]
                                .create({ Alis: response.data[element]["Alış"], Satis: response.data[element]["Satış"] })
                            C[indis] = response.data[element]["Alış"];
                        }
                        currencies.push(response.data[element])
                    }
                }
                io.emit('golds', golds);
                io.emit('currencies', currencies);
            })
            .catch(err => console.error("Altın ve Döviz datası alınamıyor !!!"));


    }, 1000)

})