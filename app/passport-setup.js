const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require("./models");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
        done(err, user);
});

passport.use(new GoogleStrategy({
        clientID: '948525970652-sq52jdauqbtlif0mfn49lv3avnpe0p3c.apps.googleusercontent.com',
        clientSecret: '0AhdzEP80KJBS9oVDAsBFK3Q',
        callbackURL: "http://localhost:4000/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        db.User.findOne({
            where: {
                email: profile.emails[0]['value']
            }
        })
            .then(user => {
                if (user) {
                    res.status(200).send({ auth: true, user: user });
                } else {
                    db.User.create({
                        fullName: profile['displayName'],
                        email: profile.emails[0]['value'],
                        passwd: 1,
                        profileImage: profile.photos[0]['value'],
                    });
                    console.log("Kullanıcı kaydedildi!!!");
                    //res.send("OK");
                }
            })
            .catch(err => console.log(err.message))
    }
));