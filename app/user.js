let moment = require('moment');
let { promises } = require('fs');
let fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("./models");
const path = require('path');
const Op = db.Sequelize.Op;
require('dotenv').config()
const multer = require('multer');
const control = require('./control');
let pPath = './public/uploads/';
let sPath = '/usr/share/nginx/Apps/uploads/';
var primaryStorage = multer.diskStorage(
    {
        destination: pPath,
        filename: function (req, file, cb) {
            fs.unlink(pPath + `${req.headers.email}.${'jpg'}`, (err) => {
                if (err) {
                    console.error(err)
                    return;
                }
            })
            cb(null, `${req.headers.email}.${'jpg'}`);
        }
    }
);
var secondaryStorage = multer.diskStorage(
    {
        destination: sPath,
        filename: function (req, file, cb) {
            fs.unlink(sPath + `${req.headers.email}.${'jpg'}`, (err) => {
                if (err) {
                    console.error(err)
                    return;
                }
            })
            cb(null, `${req.headers.email}.${'jpg'}`);
        }
    }
);

let uploadP = multer({ storage: primaryStorage });
let uploadS = multer({ storage: secondaryStorage });

const url = require('url');
let nodemailer = require('nodemailer');
const secret = require(__dirname + '/config/secret.json');
let utils = require('./utils');
var transporter = nodemailer.createTransport(secret.gmail);
let temporaryPasswords = [];
function fileUpload(req, res, next) {
    uploadP.single('file')(req, res, next);
    uploadS.single('file')(req, res, next);
}


module.exports = function (app, io) {

    app.post('/register', async (req, res) => {
        if (!control.emailControl(req.body.email)) {
            res.status(422).send({
                error: "invalid email"
            })
        } else {
            const user = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (user) {
                res.status(200).send("ALREADY")
            }
            if (req.body.profileImage.indexOf("googleusercontent") > -1) {
                req.body.active = 1;
            } else if (req.body.profileImage.indexOf("/avatars/") > -1) {
                req.body.active = 0;
            } else {
                req.body.profileImage = `${req.body.email}.jpg`;
                req.body.active = 0;
            }
            req.body.passwd = bcrypt.hashSync(req.body.passwd, 8);
            req.body.balanceNow = 100000;
            req.body.balanceList = {};
            db.User.create(req.body)
                .then((u) => {
                    var mailOptions = {
                        from: secret.gmail.auth.user,
                        to: req.body.email,
                        subject: 'Para.Guru Hesap Aktivasyon',
                        html: utils.mailTemplate(u["dataValues"]['id'])
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            res.status(500).send({
                                error: error
                            })
                        } else {
                            console.log("MAILOK")
                        }
                    });
                    res.json(u['dataValues']);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: err
                    })
                })
        }
    })

    app.post('/changeusername', (req, res) => {
        let desired = req.body.desired;
        let userId = req.body.userId;
        if (desired.length < 5) {
            res.send('SHORT');
            return;
        }
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then((user) => {
                db.User.update({
                    fullName: desired
                }, {
                    where: { id: userId },
                    returning: true,
                    plain: true
                })
                    .then(result => {
                        res.send("CHANGE")
                    })
            })
            .catch((err) => { console.log(err); return 0; })
    })

    app.post('/changeavatar', (req, res) => {
        let desired = req.body.desired;
        let userId = req.body.userId;
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then((user) => {
                db.User.update({
                    profileImage: desired
                }, {
                    where: { id: userId },
                    returning: true,
                    plain: true
                })
                    .then(result => {
                        res.send("CHANGE")
                    })
            })
            .catch((err) => { console.log(err); return 0; })
    })

    app.post('/sendpasswd', (req, res) => {
        let email = req.body.email;
        db.User.findOne({
            where: {
                email: email
            }
        })
            .then((user) => {
                if (!user) {
                    res.send('THEREISNOUSER');
                    return;
                }
                if (user.dataValues.profileImage.indexOf("googleusercontent") > -1) {
                    res.send('GOOGLEUSER')
                }
                if (user) {
                    let ps = utils.generateProductKey();
                    temporaryPasswords.push(ps);
                    var mailOptions = {
                        from: secret.gmail.auth.user,
                        to: email,
                        subject: 'Para.Guru Parola Sıfırlama',
                        html: utils.passwdMailTemplate(ps)
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send("MAILOK");
                        }
                    });
                } else {
                    res.send('THEREISNOUSER')
                }
            })
    })

    app.post('/changepasswd', (req, res) => {
        let desired = req.body.passwd1;
        let passwd2 = req.body.passwd2;
        let email = req.body.email;
        let pin = req.body.pin.toString();
        if (desired != passwd2) {
            res.send('NOTSAME');
            return;
        }
        if (desired.length < 8) {
            res.send('SHORT');
            return;
        }
        if (!temporaryPasswords.includes(pin)) {
            res.send('PINERROR');
            return;
        } else {
            db.User.findOne({
                where: {
                    email: email
                }
            })
                .then((user) => {
                    db.User.update({
                        passwd: bcrypt.hashSync(desired, 8)
                    }, {
                        where: { email: email },
                        returning: true,
                        plain: true
                    })
                        .then(result => {
                            const index = temporaryPasswords.indexOf(pin);
                            if (index > -1) {
                                temporaryPasswords.splice(index, 1);
                            }
                            res.send("CHANGE");
                        })
                })
                .catch((err) => { res.send(err); })
        }

    })

    app.post('/isusernametaken', (req, res) => {
        let desired = req.body.desired;
        db.User.findOne({
            where: {
                fullName: desired
            }
        })
            .then((user) => {
                res.send(!!user);
            })
    })

    app.post('/isemailtaken', (req, res) => {
        let desired = req.body.desired;
        db.User.findOne({
            where: {
                email: desired
            }
        })
            .then((user) => {
                res.send(!!user);
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
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.send("MAILOK");
            }
        });
    })

    app.post('/avatar', fileUpload, (req, res) => {

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

    app.post('/changeprofileimage', fileUpload, (req, res) => {
        if (!req.file) {
            console.log("No file received");
            return res.send({
                success: false
            });
        } else {
            console.log("Dosya yüklendi");
            /*try {
                fs.unlinkSync(pPath+req.headers.filename)
                fs.unlinkSync(sPath+req.headers.filename)
            } catch(err) {
                console.error(err)
            }*/
            return res.send({
                success: true
            })
        }
    });

    let currentUser;
    app.post('/login', (req, res) => {
        if (!req.body.email || !req.body.passwd) {
            return res.status(422).send({
                error: "empty fields"
            })
        }
        db.User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        error: "user not found"
                    })
                }
                console.log(user);
                currentUser = user.dataValues;
                let passwordIsValid = bcrypt.compareSync(req.body.passwd, user.dataValues.passwd);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
                let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
                console.log(token);
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                })
                res.status(200).send({ auth: true, token: token, user: currentUser });
            })
            .catch(err => {
                console.log(err)
            })
    })

    app.get('/user', (req, res) => {

        res.status(200).json({user:currentUser});

    })

    app.post('/activate', (req, res) => {
        if (req.body.activationcode == "NdwpcOASVe5gdcPSfZpwFvWkJzoUzy7n6bi") {
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

    app.post('/sendcomment', async (req, res) => {
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
            .then(() => {
                io.emit(subject + "-comments", {
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

    app.post('/getcomments', async (req, res) => {
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

    app.post('/likecomment', async (req, res) => {
        let id = req.body.commentId;
        let userId = req.body.userId;
        db["Comments"].findOne({
            where: {
                id: id
            }
        })
            .then(async (record) => {
                let temp = JSON.parse(record.like);
                if (temp.indexOf(userId) < 0) {
                    temp.push(userId);
                }
                record.like = JSON.stringify(temp);
                await record.save();
                res.json({ "result": "OK" });
            })

    })

    app.post('/dislikecomment', async (req, res) => {
        let id = req.body.commentId;
        let userId = req.body.userId;
        console.log(id)
        db["Comments"].findOne({
            where: {
                id: id
            }
        })
            .then(async (record) => {
                let temp = JSON.parse(record.like);
                if (temp.indexOf(userId) < 0) {
                    temp.push(userId);
                }
                record.dislike = JSON.stringify(temp);
                await record.save();
            })
    })

    app.post('/getuserwallet', async (req, res) => {
        let userId = req.body.id;
        if (!userId) {
            return new Error('Hesabınızı aktif hale getirmelisiniz.')
        }
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then((data) => {
                res.json(data.dataValues.wallet);
            })
    })

    app.post('/setuserwallet', async (req, res) => {
        let userId = req.body.userId;
        let wallet = req.body.wallet;

        res.json("OK");
    })

    app.post('/buyandsell', async (req, res) => {
        let alinacak = req.body.alinacak;
        let satilacak = req.body.satilacak;
        let miktar = req.body.miktar;

        res.json("OK");
    })

    app.post('/getuserbalancelist', async (req, res) => {
        let userId = req.body.id;
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then((data) => {
                res.json(data.dataValues.balanceList);
            })
    })

    app.post('/contact', (req, res) => {
        let fullName = req.body.fullName;
        let email = req.body.email;
        let subject = req.body.subject;
        let message = req.body.message;
        var mailOptions = {
            from: "petiberi06@gmail.com",
            to: ['huseyinerdal1058@gmail.com', 'arif51@gmail.com'],
            subject: 'Para.Guru İletişim Formu',
            html: `
                <h3>Kullanıcı Adı : ${fullName}</h3>
                <h3>Email : ${email}</h3>
                <h3>Konu : ${subject}</h3>
                <h3>Mesaj : ${message}</h3>
            `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.send(error.message);
            } else {
                res.send("MAILOK");
            }
        })
    })

    app.post('/getuserinfo', (req, res) => {
        let userId = req.body.id;
        if (!userId) {
            return new Error('Hesabınızı aktif hale getirmelisiniz.')
        }
        db.User.findOne({
            where: {
                id: userId
            }
        })
            .then((data) => {
                res.json(data.dataValues.active);
            })
    })

    app.get('/allavatars', async (req, res) => {
        try {
            const files = await promises.readdir(path.join(__dirname, 'public/avatars/'));
            res.status(200).json(files);
        } catch (err) {
            res.status(500).json(err);
        }
    });
}
