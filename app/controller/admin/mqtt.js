'use strict';

const Controller = require('egg').Controller;

class Mqtt extends Controller {
    async index() {
        const ctx = this.ctx;
        let data = {
            navMenu: 'msg',
            navView: ctx.request.query.t,
            t: ctx.request.query.t
        }
        await ctx.render('mqtt.html', data);
    }

    async list() {
        const ctx = this.ctx;
        let type = ctx.request.query.t
        let limit = ctx.request.query.limit
        let offset = ctx.request.query.offset
        let search_msgId = ctx.request.query.search_msgId
        let search_deviceId = ctx.request.query.search_deviceId
        let search = {}
        if (search_deviceId) {
            search.deviceId = new RegExp(search_deviceId);
        }
        if (type) {
            search.operation = type
        }
        if (search_msgId) {
            search.msgId = new RegExp(search_msgId);
        }
        var options = {
            "limit": parseInt(limit),
            "skip": parseInt(offset),
            "sort": {'_id': -1}
        }
        const mqtts = await this.ctx.model.Mqtt.find(search, {}, options);
        const count = await this.ctx.model.Mqtt.find(search, {operation: type});
        let data = {
            'total': count.length,
            'rows': mqtts
        }
        ctx.body = data;
    }
}

module.exports = Mqtt;
