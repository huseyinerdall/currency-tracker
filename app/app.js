let THE_BEGINNING_OF_EVERYTHING = true;
const HOST = "localhost";
let express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
let fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let moment = require('moment');
const path = require('path');

const passport = require('passport');


var parseString = require('xml2js').parseString;
var utils = require('./utils');
var upload = require('./utils/upload');

const UPLOAD_FOLDER = path.join(__dirname,"public/uploads/");
console.log("UPLOAD FOLDER\t"+UPLOAD_FOLDER)

const db = require("./models");

const Op = db.Sequelize.Op;


const SECRET_KEY = 'SI6ImM1Z';

//static long data
const coins = require('./static/coins.json');
const descriptions = require('./static/descriptions.json');
const goldXmlBodyStr = fs.readFileSync('./static/altinkaynakGold.xml', 'utf8');
const currencyXmlBodyStr = fs.readFileSync('./static/altinkaynakCurrency.xml', 'utf8');
const truncgil = 'https://finans.truncgil.com/today.json';

const app = express();
const admin = require('./admin.js');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
        clientID: "948525970652-fuuplq2bgdd7q24kvetlet4il9b66p1g.apps.googleusercontent.com",
        clientSecret: "_D28pNM80mE9qOiiUO8Ff7qX",
        callbackURL: "http://localhost:4000/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        db.User.findOrCreate({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
        }, function (err) {
            console.log(err);
            return cb(err);
        }).catch(err=>{
            console.log(err)
        })
    }
));
app.get('/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


app.use(morgan('tiny'));
app.use(cors({ credentials: true }));
app.use('/admin',admin);
app.use(bodyParser.json());
app.use(express.static('public')) // static dosyaları serve etmek için

var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: [`http://${HOST}:8080`,`http://${HOST}:8081`,"*"],
        //origin: ["https://para.guru","https://www.para.guru"],
        methods: ["GET", "POST"]
    }
});

var config = {
    headers: {
        'Host': 'data.altinkaynak.com',
        'Content-Type': 'application/soap+xml; charset=utf-8',
        //'Content-Length': 100,
    }
};

let closes = {}; // Kapanış verilerinin store edildiği global

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
    let element = req.params.goldName;
    axios.get('https://finans.truncgil.com/today.json')
        .then(async response => {
            let sepetalis = ((parseFloat(response.data["ABD DOLARI"]["Alış"]) + parseFloat(response.data["EURO"]["Alış"])) / 2).toFixed(4);
            let sepetsatis = ((parseFloat(response.data["ABD DOLARI"]["Satış"]) + parseFloat(response.data["EURO"]["Satış"])) / 2).toFixed(4);
            response.data["SEPET KUR"] = {"Alış":sepetalis,"Satış":sepetsatis};
            response.data[element]["time"] = response.data["Güncelleme Tarihi"];
            if (element.indexOf("Altın") > 0 || element == '22 Ayar Bilezik' || element == 'Gümüş') {
                response.data[element]["type"] = element;
                indis = "Gold" + utils.turkishToEnglish(element)
                let date = new Date().toLocaleDateString("ISO");
                let prevTime = "03:00";
                let nextTime = "06:00";
                a = await db[indis].findOne({
                    where: {
                        createdAt: {
                            [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                        }
                    }
                }).catch((err)=>console.log("Geç"))
                try {
                    response.data[element]["close"] = a["dataValues"]["Satis"];
                }catch {
                    response.data[element]["close"] = response.data[element]["Satış"]
                }

            } else if (element.indexOf("Güncelleme") < 0 && element.indexOf("ÇEKME") < 0) {
                response.data[element]["type"] = element;
                indis = utils.turkishToEnglish(element)
                let date = new Date().toLocaleDateString("ISO");
                let prevTime = "03:00";
                let nextTime = "06:00";
                a = await db[indis].findOne({
                    where: {
                        createdAt: {
                            [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                        }
                    }
                }).catch((err)=>console.log("Geç"))
                try {
                    response.data[element]["close"] = a["dataValues"]["Satis"];
                }catch {
                    response.data[element]["close"] = response.data[element]["Satış"]
                }

            }
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

const BINTLTABLE_LIST = ["ABDDOLARI", "EURO", "INGILIZSTERLINI", "KANADADOLARI", "SUUDIARABISTANRIYALI","JAPONYENI","GoldGramAltin","GoldOnsAltin","GoldGumus","BTC","DOGE","ETH","XRP","USDT"];
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
            BINTL["ABDDOLARI"] = +(response.data["ABD DOLARI"]["Satış"]);
            BINTL["EURO"] = +(response.data["EURO"]["Satış"]);
            BINTL["INGILIZSTERLINI"] = +(response.data["İNGİLİZ STERLİNİ"]["Satış"]);
            BINTL["KANADADOLARI"] = +(response.data["KANADA DOLARI"]["Satış"]);
            BINTL["JAPONYENI"] = +(response.data["JAPON YENİ"]["Satış"]);
            BINTL["SUUDIARABISTANRIYALI"] = +(response.data["SUUDİ ARABİSTAN RİYALİ"]["Satış"]);
            BINTL["GoldGramAltin"] = parseFloat(response.data["Gram Altın"]["Satış"].replace(',', '.'));
            BINTL["GoldOnsAltin"] = parseFloat(response.data["Ons Altın"]["Satış"].replace(',', '.'));
            BINTL["GoldGumus"] = parseFloat(response.data["Gümüş"]["Satış"].replace(',', '.'));
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

            let updatetime = response.data["Güncelleme Tarihi"];
            for (const element in response.data) {
                temp = {};
                if (element.indexOf("Altın") > 0 || element == '22 Ayar Bilezik' || element == 'Gümüş') {continue;}
                else if (element.indexOf("Güncelleme") < 0 && element.indexOf("ÇEKME") < 0) {
                    temp["type"] = element;
                    temp["time"] = updatetime;
                    temp["today"] = response.data[element]["Satış"];
                    indis = utils.turkishToEnglish(element);
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
            console.log(data)
            res.json(data);
        })
        .catch(err => console.log(err));
})


app.post('/sendcomment', async(req, res) => {
    let fullName = req.body.fullName;
    let comment = req.body.message;
    let subject = req.body.subject;
    let profileImage = req.body.profileImage;
    db["Comments"].create({
            fullName: fullName,
            comment: comment,
            subject: subject,
            profileImage: profileImage
        })
        .then( async()=>{
            let data;
            let BEGIN = moment().subtract(7, 'd').toString() || DEFAULT;
            const NOW = new Date();
            data = await db["Comments"].findAll({
                where: {
                    createdAt: {
                        [Op.between]: [BEGIN, NOW],
                    },
                    subject: subject
                }
            });
            console.log(subject+"-comments")
            io.emit(subject+"-comments",data);
        })


    /*res.json({
        fullName: fullName,
        comment: comment,
        subject: subject,
        profileImage: profileImage,
        createdAt: new Date(),
    });*/
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
    //io.emit(subject+"-comments", data);
    res.json(data);
})

app.post('/likecomment', async(req, res) => {
    let id = req.body.commentId;
    let userId = req.body.userId;
    console.log(id)
    db["Comments"].findOne({
        where: {
            id: id
        }
    })
        .then(async(record) => {
            let temp = JSON.parse(record.like);
            if(temp.indexOf(userId)<0){
                temp.push(userId);
            }
            record.like = JSON.stringify(temp);
            await record.save();
            res.json({"result" : "OK"});
        })
})

app.post('/dislikecomment', async(req, res) => {
    let id = req.body.commentId;
    let userId = req.body.userId;
    console.log(id)
    db["Comments"].findOne({
        where: {
            id: id
        }
    })
        .then(async(record) => {
            let temp = JSON.parse(record.like);
            if(temp.indexOf(userId)<0){
                temp.push(userId);
            }
            record.like = JSON.stringify(temp);
            await record.save();
        })
})

app.post('/converter', (req, res) => {
    let source = req.body.source;
    let target = req.body.target;
    let amount = req.body.amount;
    axios.get(truncgil)
        .then((response) => {
            let s;

            let a = +amount;
            let result;
            if (target == "TÜRK LİRASI" && source != "TÜRK LİRASI") {
                s = +response.data[source]["Satış"];
                result = (a * s);
            }
            if (source == "TÜRK LİRASI" && target != "TÜRK LİRASI") {
                s = +response.data[target]["Satış"];
                console.log("geldi")
                result = (a * s);
            }
            if (target == "TÜRK LİRASI" && source == "TÜRK LİRASI") {
                result = a;
            }
            if(target != "TÜRK LİRASI" && source != "TÜRK LİRASI"){
                let t = +response.data[target]["Satış"];
                s = +response.data[source]["Satış"];
                result = a * (s / t).toFixed(4);
            }

            res.json({ "result": result.toFixed(4) });
        })
        .catch((err) => console.log(err))
})

app.post('/register', (req, res) => {
    console.log(req.body)
    db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (user) {
                res.send("Bu email adresi çoktan kullanılmış.");
            } else {
                let filename = '';
                fs.readdirSync(UPLOAD_FOLDER).forEach(file => {
                    if(file.includes("tempfilename")){
                        let ext = path.extname(file);
                        fs.rename(`${UPLOAD_FOLDER}tempfilename${ext}`, `${UPLOAD_FOLDER}${req.body.profileImage}${ext}`, function(err) {
                            if ( err ) console.log('ERROR: ' + err);
                        });
                        filename = `${req.body.profileImage}${ext}`;
                    }
                });
                req.body.passwd = bcrypt.hashSync(req.body.passwd, 8);
                req.body.profileImage = filename;
                db.User.create(req.body)
                console.log("Kullanıcı kaydedildi!!!");
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
            if(!user){res.send("ERROR");return;}
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


const NONCHANGE_TIME = 60 * 1/6;
const MAINLOOPINTERVAL = 100000;


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
    setInterval(() => {
        factRes30 = [];
        factRes = [];
        golds = [];
        currencies = [];

        let temp = {};

        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h,7d`)
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
                    temp["sparkline"] = response.data[i]["sparkline_in_7d"]["price"].slice(0,20);
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
            .catch(err => console.error(err));

        axios.get('https://finans.truncgil.com/today.json')
            .then(async response => {
                let sepetalis = ((parseFloat(response.data["ABD DOLARI"]["Alış"]) + parseFloat(response.data["EURO"]["Alış"])) / 2).toFixed(4);
                let sepetsatis = ((parseFloat(response.data["ABD DOLARI"]["Satış"]) + parseFloat(response.data["EURO"]["Satış"])) / 2).toFixed(4);
                response.data["SEPET KUR"] = {"Alış":sepetalis,"Satış":sepetsatis,"Tür": 'Döviz'};
                let updatetime = response.data["Güncelleme Tarihi"];

                for (const element in response.data) {
                    if (element.indexOf("Altın") > 0 || element == '22 Ayar Bilezik' || element == 'Gümüş') {
                        response.data[element]["type"] = element;
                        response.data[element]["time"] = updatetime;
                        indis = "Gold" + utils.turkishToEnglish(element)
                        //db[indis].destroy({ truncate : true, cascade: true })
                        if (db[indis] && response.data[element]["Alış"] != C[indis] ||
                            (new Date().getHours() == "1" && new Date().getMinutes() == "20" && new Date().getSeconds() < 15)) {
                            db[indis]
                                .create({ Alis: response.data[element]["Alış"], Satis: response.data[element]["Satış"] })
                            C[indis] = response.data[element]["Alış"];
                        }
                        let date = new Date().toISOString().substring(0,10);
                        let prevTime = "01:19";
                        let nextTime = "01:21";
                        a = await db[indis].findOne({
                            where: {
                                createdAt: {
                                    [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                                }
                            }
                        }).catch((err)=>console.log("Geç"))
                        try {
                            response.data[element]["close"] = a["dataValues"]["Satis"];
                        }catch {
                            response.data[element]["close"] = response.data[element]["Satış"]
                        }

                        golds.push(response.data[element]);
                    } else if (element.indexOf("Güncelleme") < 0 && element.indexOf("ÇEKME") < 0) {
                        response.data[element]["type"] = element;
                        response.data[element]["time"] = updatetime;
                        indis = utils.turkishToEnglish(element)
                            //db[indis].destroy({ truncate : true, cascade: false })
                        if (db[indis] && response.data[element]["Alış"] != C[indis] ||
                        (new Date().getHours() == "1" && new Date().getMinutes() == "21" && new Date().getSeconds() < 15)) {
                            db[indis]
                                .create({ Alis: response.data[element]["Alış"], Satis: response.data[element]["Satış"] })
                            C[indis] = response.data[element]["Alış"];
                        }
                        let date = new Date().toISOString().substring(0,10);
                        let prevTime = "01:20";
                        let nextTime = "01:22";
                        a = await db[indis].findOne({
                            where: {
                                createdAt: {
                                    [Op.between]: [moment(date + ' ' + prevTime).toDate(), moment(date + ' ' + nextTime).toDate()]
                                }
                            }
                        }).catch((err)=>console.log("Geç"))
                        try {
                            response.data[element]["close"] = a["dataValues"]["Satis"];
                        }catch {
                            response.data[element]["close"] = response.data[element]["Satış"]
                        }
                        currencies.push(response.data[element]);

                    }
                }

            })
            .catch(err => console.error(err));

    }, MAINLOOPINTERVAL)

    setInterval(() => {
        if(factRes.length == 250){io.emit('coins', factRes);}
        if(factRes30.length == 30){io.emit('coins30', factRes30);}
        if(golds.length != 0){io.emit('golds', golds);}
        if(currencies.length != 0){io.emit('currencies', currencies);}
    },500);


})

setTimeout(() => { THE_BEGINNING_OF_EVERYTHING = false; },20000);