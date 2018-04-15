'use strict';

const Controller = require('../core/admin_controller');
class Admin extends Controller {

    async home(){
        const { ctx } = this;
        console.log(ctx.user)
        await ctx.render('home.html');
    }
    async logout() {
        const ctx = this.ctx;
        ctx.logout();
        ctx.redirect('/admin/login');
    }

    async login() {
        const ctx = this.ctx;
        await ctx.render('login.html');
    }
}

module.exports = Admin;
