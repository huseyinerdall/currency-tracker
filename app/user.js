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

module.exports = function(app,io){

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
                db["Comments"].findAll({
                    where: {
                        createdAt: {
                            [Op.between]: [BEGIN, NOW],
                        },
                        subject: subject
                    }
                })
                    .then(data => {
                        console.log(subject+"-comments")
                        io.emit(subject+"-comments",data);
                        console.log(subject+"-comments")
                    })
                    .catch(err => {
                        console.log(err)
                    })
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
}
