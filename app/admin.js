const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = require('express')();
app.use(cors({ credentials: true }));
app.use(bodyParser.json());

const descriptions = require('./static/descriptions.json');

app.get('/', function(req, res){
    res.send('admin side')
});

app.get('/cryptocoindescriptions', (req, res) => {
    let data = require('./static/descriptions.json');
    res.send(data);
})

app.post('/cryptocoindescriptions', async(req, res) => {
    let coin = req.body.coinName;
    let descriptions = require('./static/descriptions.json');
    let data = descriptions[coin];
    res.send(data);
})

app.post('/addnewdescription', (req, res) => {
    try {
        let des = req.body.description;
        let yeni = req.body.yeni;
        console.log(des)
        let allData = JSON.parse(fs.readFileSync("./static/descriptions.json"));
        allData[yeni] = des;
        console.log(allData[yeni] == des)
        fs.writeFileSync("./static/descriptions.json",JSON.stringify(allData),(err) => {
            res.send("NO");
        });
        res.send("OK");
    }catch (e) {
        console.log(e)
        res.send("NO");
    }
})

module.exports = app;