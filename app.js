'use strict';
const LocalStrategy = require('passport-local').Strategy;
module.exports = app => {
    app.beforeStart(async () => {
        // 也可以通过以下方式来调用 Service
        // const ctx = app.createAnonymousContext();
        // app.cities = await ctx.service.cities.load();
    });
    // 挂载 strategy
    app.passport.use(new LocalStrategy({
        passReqToCallback: true,
    }, (req, username, password, done) => {
        // format user
        const user = {
            provider: 'local',
            username,
            password,
        };
        console.log('%s %s get user: %j', req.method, req.url, user);
        app.passport.doVerify(req, user, done);
    }));

    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
        console.log('app.passport.verify')
        console.log(user)
        ctx.login(user, {})
        return  user;
    });
    app.passport.serializeUser(async (ctx, user) => {
        return  user;
    });
    app.passport.deserializeUser(async (ctx, user) => {
        return  user;
    });

};