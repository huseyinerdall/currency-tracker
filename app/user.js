let moment = require('moment');
let fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("./models");
const path = require('path');
const Op = db.Sequelize.Op;
const SECRET_KEY = 'SI6ImM1Z';
var upload = require('./utils/upload');
const UPLOAD_FOLDER = path.join(__dirname,"public/uploads/");
const url = require('url');
var nodemailer = require('nodemailer');
const secret = require(__dirname + '/config/secret.json');
let utils = require('./utils');
var transporter = nodemailer.createTransport(secret.gmail);

module.exports = function(app,io){

    app.post('/register', (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (user) {
                    res.send("ALREADY");
                } else {
                    console.log(user)
                    if(req.body.profileImage.indexOf("googleusercontent")>0){
                        req.body.active = 1;
                    }else{
                        let filename = '';
                        fs.readdirSync(UPLOAD_FOLDER).forEach(file => {
                            if(file.includes("tempfilename")){
                                let ext = path.extname(file);
                                fs.rename(`${UPLOAD_FOLDER}tempfilename${ext}`, `${UPLOAD_FOLDER}${req.body.profileImage}${ext}`, function(err) {
                                    if ( err ) console.log('ERROR: ' + err);
                                });
                                filename = `${req.body.profileImage}${ext}`;
                            }
                            req.body.profileImage = filename;
                        });
                        req.body.active = 0;
                        db.User.create(req.body)
                            .then((u) => {
                                var mailOptions = {
                                    from: secret.gmail.auth.user,
                                    to: req.body.email,
                                    subject: 'Para.Guru Hesap Aktivasyon',
                                    html: utils.mailTemplate(u["dataValues"]['id'])
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                    }
                                });
                            })
                    }
                    req.body.passwd = bcrypt.hashSync(req.body.passwd, 8);
                    req.body.balanceNow = 100000;
                    let now = new Date().toLocaleDateString()
                    req.body.balanceList = {};
                    res.send("OK");
                }
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    })

    app.post('/sendactivation', (req, res) => {
        if (!req.body.email) {
            res.send("Email adresi gelmedi!")
        }
        var mailOptions = {
            from: secret.gmail.auth.user,
            to: req.body.email,
            subject: 'Para.Guru Hesap Aktivasyon',
            html: utils.mailTemplate(req.body.userId)
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send("MAILOK");
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
                res.status(200).send({ auth: true, token: token, user: user });
            })
            .catch(err => {
                console.log(err)
            })
    })

    app.post('/activate', (req, res) => {
        if(req.body.activationcode == "NdwpcOASVe5gdcPSfZpwFvWkJzoUzy7n6bi"){
            db.User.update({
                active: 1
            }, {
                where: { id: req.body.userid },
                returning: true,
                plain: true
            })
                .then((user) => {
                    res.json(user[1]["dataValues"]);
                })
        } else {
            res.send("Aktivasyon kodu hatalı");
        }

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
            .then( ()=>{
                io.emit(subject+"-comments",{
                    fullName: fullName,
                    comment: comment,
                    subject: subject,
                    profileImage: profileImage,
                    createdAt: new Date(),
                });
            })

        res.json({
            fullName: fullName,
            comment: comment,
            subject: subject,
            profileImage: profileImage,
            createdAt: new Date(),
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
        //io.emit(subject+"-comments", data);
        res.json(data);
    })

    app.post('/likecomment', async(req, res) => {
        let id = req.body.commentId;
        let userId = req.body.userId;
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
                record.dislike = JSON.stringify(temp);
                await record.save();
            })
    })

    app.post('/getuserwallet', async(req, res) => {
        let userId = req.body.id;
        console.log(userId)
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then((data)=>{
                res.json(data.dataValues.wallet);
            })
    })

    app.post('/setuserwallet', async(req, res) => {
        let userId = req.body.userId;
        let wallet = req.body.wallet;

        res.json("OK");
    })

    app.post('/buyandsell', async(req, res) => {
        let alinacak = req.body.alinacak;
        let satilacak = req.body.satilacak;
        let miktar = req.body.miktar;

        res.json("OK");
    })

    app.post('/getuserbalancelist', async(req, res) => {
        let userId = req.body.id;
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then((data)=>{
                res.json(data.dataValues.balanceList);
            })
    })
}
