'use strict';
// const LocalStrategy = require('egg-passport-local').Strategy;
module.exports = app => {
    const ctx = app.createAnonymousContext();
    app.beforeStart(async () => {
        // 也可以通过以下方式来调用 Service
        // const ctx = app.createAnonymousContext();
        // app.cities = await ctx.service.cities.load();
        // await app.model.sync({force: true});
    });

    app.passport.authenticate('local');
    // 处理用户信息
    app.passport.verify(async (ctx, user) => {
        console.log('app.passport.verify')
        console.log(user)
        const employee = await ctx.model.Employee.findByCode(user.username);
        let msg = '登录成功';
        if(employee){
            if(employee.getDataValue('password') == user.password){
                employee.logSignin();
                ctx.login(employee, {})
                return employee;
            }
        }
        return null;
        // return {code:401,msg:msg,user:employee}
    });
};