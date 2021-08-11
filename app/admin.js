const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
let userWallet = require('./user-wallet');
var app = require('express')();
app.use(cors({ credentials: true }));
app.use(bodyParser.json());

const descriptions = require('./static/descriptions.json');

app.get('/', function(req, res){
    res.send('admin side')
});

app.get('/cryptocoindescriptions', (req, res) => {
    let data = fs.readFileSync("./static/descriptions.json");
    data = JSON.parse(data);
    res.send(data);
})
app.get('/cryptoseodata', (req, res) => {
    let data = fs.readFileSync("./static/seo.json");
    data = JSON.parse(data);
    res.send(data);
})

app.post('/cryptocoindescriptions', (req, res) => {
    let coin = req.body.coinName;
    let descriptions = JSON.parse(fs.readFileSync("./static/descriptions.json"));
    let data = descriptions[coin];
    res.send(data);
})
app.post('/getseodata', (req, res) => {
    let coin = req.body.coin.toUpperCase();
    let seos = JSON.parse(fs.readFileSync("./static/seo.json"));
    let data = seos[coin];
    res.json(data);
})

app.post('/getgoldseodata', (req, res) => {
    let coin = req.body.gold
    let seos = JSON.parse(fs.readFileSync("./static/goldSeo.json"));
    let data = seos[coin];
    res.json(data);
})

app.post('/addnewdescription', (req, res) => {
    try {
        let des = req.body.description;
        let yeni = req.body.yeni;
        let seotitle = req.body.seotitle;
        let seodescription = req.body.seodescription;
        let seokeywords = req.body.keywords;
        let allData = JSON.parse(fs.readFileSync("./static/descriptions.json"));
        let allSeoData = JSON.parse(fs.readFileSync("./static/seo.json"));
        allData[yeni] = des;
        allSeoData[yeni] = {
            title: seotitle,
            description: seodescription,
            keywords: seokeywords
        }
        fs.writeFileSync("./static/descriptions.json",JSON.stringify(allData),(err) => {
            res.send("NO");
        });
        fs.writeFileSync("./static/seo.json",JSON.stringify(allSeoData),(err) => {
            res.send("NO");
        });
        res.send("OK");
    }catch (e) {
        res.send("NO");
    }
})

app.get('/getallusers', (req, res) => {
    userWallet.getAllUsers()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/removeuser', (req, res) => {
    let userId = req.body.userId;
    userWallet.removeUser(userId)
        .then((result) => {
            res.send("DELETEDUSER");
        })
        .catch((err) => {
            res.send(err)
            console.log(err);
        })
})
module.exports = app;