'use strict';

const Controller = require('egg').Controller;

class Api extends Controller {
    async index() {
        const ctx = this.ctx;
        let data = {
            navMenu: 'msg',
            navView: 'api',
            method: 'list',
            types:['openDoor','inventory','getDeviceInfo']
        }
        await ctx.render('api.html', data);
    }

    async list() {
        const ctx = this.ctx;
        let type = ctx.request.query.searchType
        let limit = ctx.request.query.limit
        let offset = ctx.request.query.offset
        let searchParam = ctx.request.query.searchParam
        let searchDeviceId = ctx.request.query.searchDeviceId
        let search = {}
        if (searchDeviceId) {
            search.deviceId = new RegExp(searchDeviceId);
        }
        if (type) {
            search.operation = type
        }
        if (searchParam) {
            search.param = new RegExp(searchParam);
        }
        var options = {
            "limit": parseInt(limit),
            "skip": parseInt(offset),
            "sort": {'_id': -1}
        }
        const mqtts = await this.ctx.model.Http.find(search, {}, options);
        const count = await this.ctx.model.Http.find(search, {operation: type});
        let data = {
            'total': count.length,
            'rows': mqtts
        }
        ctx.body = data;
    }

    async send() {
        const ctx = this.ctx;
        let data = {
            navMenu: 'msg',
            navView: 'send',
            method:'sendList',
            types:['heartbeat','pushDeviceInfo','door','deviceQrCode','exception']
        }
        await ctx.render('api.html', data);
    }

    async sendList() {
        const ctx = this.ctx;
        let type = ctx.request.query.searchType
        let limit = ctx.request.query.limit
        let offset = ctx.request.query.offset
        let searchParam = ctx.request.query.searchParam
        let searchDeviceId = ctx.request.query.searchDeviceId
        let search = {}
        if (searchDeviceId) {
            search.deviceId = new RegExp(searchDeviceId);
        }
        if (type) {
            search.operation = type
        }
        if (searchParam) {
            search.param = new RegExp(searchParam);
        }
        var options = {
            "limit": parseInt(limit),
            "skip": parseInt(offset),
            "sort": {'_id': -1}
        }
        const mqtts = await this.ctx.model.SendHttp.find(search, {}, options);
        const count = await this.ctx.model.SendHttp.find(search, {operation: type});
        let data = {
            'total': count.length,
            'rows': mqtts
        }
        ctx.body = data;
    }
}

module.exports = Api;
