'use strict';

const Controller = require('egg').Controller;

class Api extends Controller {

    constructor(ctx) {
        super(ctx);
    }

    async openDoor() {
        const {ctx, app} = this;
        var deviceId = ctx.request.body.params.deviceId

        const insertDb = async function () {
            return new ctx.app.model.Http({
                createTime: parseInt(new Date().getTime() / 1000),
                deviceId: deviceId,
                operation: 'openDoor',
                param: JSON.stringify(ctx.request.body),
            }).save();
        }
        const [ insert,rs ] = await Promise.all([
            insertDb(),
            ctx.service.api.process('openDoor')
        ]);

        console.log(insert)
        console.log(insert._id)

        if (rs && rs.state && rs.state.code == 0) {
            let data = {
                "id": ctx.request.body.requestId,
                "operate": 'openDoor',
                "code": 1
            }
            app.mqtt.publish('device/' + deviceId, JSON.stringify(data));

        }

        await ctx.model.Http.update({_id: insert._id}, {responseTime:parseInt(new Date().getTime() / 1000),response:JSON.stringify(rs)});
        ctx.body = rs
    }

    async inventory() {
        const {ctx, app} = this;
        let rs = await ctx.service.api.process('inventory');
        if (rs && rs.state && rs.state.code == 0) {
            let data = {
                "id": ctx.request.body.requestId,
                "operate": 'inventory',
            }
            app.mqtt.publish('device/' + ctx.request.body.params.deviceId, JSON.stringify(data));
        }
        ctx.body = rs
    }

    async getDeviceInfo() {
        const {ctx, app} = this;
        let rs = await ctx.service.api.process('getDeviceInfo');
        if (rs && rs.state && rs.state.code == 0) {
            let data = {
                "id": ctx.request.body.requestId,
                "operate": 'deviceInfo',
            }
            app.mqtt.publish('device/' + ctx.request.body.params.deviceId, JSON.stringify(data));
        }
        ctx.body = rs
    }
}

module.exports = Api;
