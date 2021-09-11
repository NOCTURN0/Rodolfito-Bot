const passport = require('passport');
const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    done(user, null)
});

passport.deserializeUser((obj, done) => {
    done(obj, null)
});

passport.use(new Strategy({
    clientID: process.env.clid,
    clientSecret: process.env.clsecret,
    callbackURL: 'localhost:3000/login',
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile)
    });
}));

module.exports = passport;