'use strict';

const Controller = require('egg').Controller;

class Employee extends Controller {
    async index() {
        const ctx = this.ctx;
        let data = {}
        await ctx.render('employee.html', data);
    }

    async list() {
        const ctx = this.ctx;

        let limit = ctx.request.query.limit
        let offset = ctx.request.query.offset
        let search_name = ctx.request.query.search_name
        let where = {};
        if (search_name) {
            where.name = {$like: '%'+search_name+'%'};
        }
        const employees = await this.ctx.model.Employee.findAll({
            where: where,
            order: [['id', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            raw: true,
        });
        let data = {
            'total': employees.length,
            'rows': employees
        }

        ctx.body = data;
    }

    async save() {
        const ctx = this.ctx;
        let data = ctx.request.body;
        console.log(data)
        const client = await this.ctx.model.Client.findOne({code: data.code});
        let ret = {code: 400, message: '未知错误'}
        if (client) {
            let r = await this.ctx.model.Client.update({_id: client._id}, data);
            if (r.ok == 1) {
                ret.code = 200;
                ret.message = '更新成功';
            }
        } else {
            data.addTime = parseInt(new Date().getTime() / 1000);
            const client = new this.ctx.model.Client(data);
            let r = await client.save();
            if (r._id) {
                ret.code = 200;
                ret.message = '添加成功';
            }
        }
        await this.ctx.helper.cacheClients();
        await this.ctx.helper.cacheDevices();
        ctx.body = ret
    }

    async delete() {
        const ctx = this.ctx;
        let ret = {code: 400, message: '未知错误'}
        let code = ctx.request.body.code;
        if (code) {
            let rs = await ctx.model.Client.deleteOne({code: code});
            if (rs) {
                ret.code = 200;
                ret.message = '删除成功';
                await this.ctx.helper.cacheClients();
                await this.ctx.helper.cacheDevices();
            } else {
                ret.message = '删除失败';
            }
        } else {
            ret.message = '缺少code';
        }
        ctx.body = ret
    }

    async refreshCache() {
        const ctx = this.ctx;
        let ret = {code: 400, message: '未知错误'}
        let obj = await ctx.helper.cacheClients();
        if (obj) {
            await this.ctx.helper.cacheDevices();
            ret.code = 200;
            ret.message = '刷新成功';
        } else {
            ret.message = '刷新失败';
        }
        ctx.body = ret
    }
}

module.exports = Employee;
