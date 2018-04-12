'use strict';

const Controller = require('../core/admin_controller');
class Admin extends Controller {

    async index() {
        const ctx = this.ctx;
        // ctx.app.nunjucks.addGlobal('lastUpateMonitor', '-')
        ctx.app.nunjucks.addGlobal('onlineNum', 0)
        ctx.app.nunjucks.addGlobal('offlineNum', 0)
        ctx.app.nunjucks.addGlobal('exceptionNum', 0)
        ctx.session.user = {"name":123};

        console.log(ctx.session.user);
        const result = await this.app.mysql.insert('test', { title: 'Hello World' }); // 在 post 表中，插入 title 为 Hello World 的记录

        console.log(result);

        await ctx.render('home.html', {
            user: {
                name: ctx.session,
            },
            title: 'egg view example',
        });
    }
}

module.exports = Admin;
