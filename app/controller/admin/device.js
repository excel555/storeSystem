'use strict';

const Controller = require('egg').Controller;

class Device extends Controller {
    async index() {
        const ctx = this.ctx;
        let data = {
            navMenu: 'device',
            navView: 'list'
        }
        let clients = await ctx.helper.getCacheClients()
        let dataClients = []
        Object.keys(clients).map((client, index) => {
            dataClients.push(clients[client])
        });
        data['clients'] = dataClients;
        await ctx.render('device.html', data);
    }

    async list() {
        const ctx = this.ctx;

        let limit = ctx.request.query.limit
        let offset = ctx.request.query.offset
        let searchClientId = ctx.request.query.searchClientId
        let searchDeviceId = ctx.request.query.searchDeviceId
        let search = {}
        if (searchDeviceId) {
            search.deviceId = new RegExp(searchDeviceId);
        }

        if (searchClientId) {
            search.clientId = searchClientId;
        }
        var options = {
            "limit": parseInt(limit),
            "skip": parseInt(offset),
            "sort": {'_id': -1}
        }
        var finalResult = [];
        const devices = await this.ctx.model.Device.find(search, {}, options);
        var clientName = await ctx.helper.getCacheClients();
        devices.forEach(function (device) {
            device.client = clientName[device.clientId]['name'];
            finalResult.push(device)
        });

        let data = {
            'total': finalResult.length,
            'rows': devices
        }
        // await this.ctx.helper.cacheDevices();
        ctx.body = data;
    }


    async save() {
        const ctx = this.ctx;
        let data = ctx.request.body;
        console.log(data)
        const device = await this.ctx.model.Device.findOne({deviceId: data.deviceId});
        let ret = {code: 400, message: '未知错误'}
        if (device) {
            let r = await this.ctx.model.Device.update({_id: device._id}, data);
            if (r.ok == 1) {
                ret.code = 200;
                ret.message = '更新成功';
            }
        } else {
            data.addTime = parseInt(new Date().getTime() / 1000);
            const device = new this.ctx.model.Device(data);
            let r = await device.save();
            if (r._id) {
                ret.code = 200;
                ret.message = '添加成功';
            }
        }
        await this.ctx.helper.cacheDevices();
        ctx.body = ret
    }

    async delete() {
        const ctx = this.ctx;
        let ret = {code: 400, message: '未知错误'}
        let deviceId = ctx.request.body.deviceId;
        if (deviceId) {
            let rs = await ctx.model.Device.deleteOne({deviceId: deviceId});
            if (rs) {
                ret.code = 200;
                ret.message = '删除成功';
                await this.ctx.helper.cacheDevices();
            } else {
                ret.message = '删除失败';
            }
        } else {
            ret.message = '缺少deviceId';
        }
        ctx.body = ret
    }

    async refreshCache() {
        const ctx = this.ctx;
        let ret = {code: 400, message: '未知错误'}
        let obj = await ctx.helper.cacheDevices();
        if (obj) {
            ret.code = 200;
            ret.message = '刷新成功';
        } else {
            ret.message = '刷新失败';
        }
        ctx.body = ret
    }

    async status() {
        const ctx = this.ctx;
        let data = {
            navMenu: 'device',
            navView: 'status',
            t: ctx.request.query.t
        }
        await ctx.render('deviceStatus.html', data);
    }

    async listStatus() {
        const ctx = this.ctx;
        let type = ctx.request.query.t
        if (type) {
            let devices = []
            switch (type) {
                case 'online':
                    devices = await ctx.app.redis.get('onlineDevices');
                    break;
                case 'offline':
                    devices = await ctx.app.redis.get('offlineDevices');
                    break;
                case 'exception':
                    devices = await ctx.app.redis.get('exceptionDevices');
                    break;
            }
            devices = JSON.parse(devices);
            let data = {
                'total': devices.length,
                'rows': devices
            }
            ctx.body = data;
            return
        }
        let limit = ctx.request.query.limit
        let offset = ctx.request.query.offset
        let searchDeviceId = ctx.request.query.searchDeviceId
        let search = {}
        if (searchDeviceId) {
            search.deviceId = new RegExp(searchDeviceId);
        }

        var options = {
            "limit": parseInt(limit),
            "skip": parseInt(offset),
            "sort": {'_id': -1}
        }
        const devices = await this.ctx.model.Device.find(search, {}, options);
        const count = await this.ctx.model.Device.find(search, {});

        // parallel device status
        const deviceStatus = await Promise.all(
            devices.map(device => {
                return ctx.helper.getDeviceStatus(device.deviceId);
            })
        );
        const deviceHeart = await Promise.all(
            devices.map(device => {
                return ctx.helper.getDeviceLastHeartbeat(device.deviceId);
            })
        );


        devices.map((device, index) => {
            device.sim = deviceStatus[index]
            device.route = ctx.helper.timestampToTime(deviceHeart[index])
        });

        let data = {
            'total': count.length,
            'rows': devices
        }
        ctx.body = data;
    }
}

module.exports = Device;
