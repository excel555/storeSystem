'use strict';

const Controller = require('egg').Controller;

class Admin extends Controller {
    async index() {
        const ctx = this.ctx;
        ctx.app.nunjucks.addGlobal('lastUpateMonitor', '-')
        ctx.app.nunjucks.addGlobal('onlineNum', 0)
        ctx.app.nunjucks.addGlobal('offlineNum', 0)
        ctx.app.nunjucks.addGlobal('exceptionNum', 0)
        console.log(this.app.mqtt);
        await ctx.render('home.html', {
            user: {
                name: 'iot',
            },
            title: 'egg view example',
        });



    }
}

module.exports = Admin;
