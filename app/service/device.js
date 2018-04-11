'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
class DeviceService extends Service {
    constructor(ctx) {
        super(ctx);
        this.result = true;
    }

    async process(obj) {
        console.log('mqtt msg process');
        console.log(obj);
        let deviceId = obj.deviceId;
        let device = await this.ctx.helper.getCacheDevice(deviceId);
        if (!device) {
            console.error(obj)
            console.error('消息有误，缺少设备id')
            return
        }
        let config = device.config;
        if (obj.operate == 'heartbeat') {
            this.processDeviceHeartbeat(obj, config);
        } else if (obj.operate == 'pushDeviceInfo') {
            this.processDeviceInfo(obj, config);
        } else if (obj.operate == 'door') {
            this.processDeviceDoor(obj, config);
        } else if (obj.operate == 'inventory') {
            this.processDeviceInventory(obj, config);
        } else if (obj.operate == 'deviceQrCode') {
            this.processDeviceQrCode(obj, config);
        } else if (obj.operate == 'exception') {
            this.processDeviceExeption(obj, config);
        }
    }

    async processDeviceHeartbeat(params, config) {
        let postParam = {
            "msgId": params["id"],
            "deviceId": params["deviceId"],
            "msgCreateTime": params["time"],
        }
        this.sendHttp(postParam, config, '/api/device/receive_heart_new_msg','heartbeat')
    }

    async processDeviceDoor(params, config) {
        console.log('processDeviceDoor')
        let postParam = {
            "msgId": params["id"],
            "deviceId": params["deviceId"],
            "msgCreateTime": params["time"],
            "msgType": params["code"]
        }

        this.sendHttp(postParam, config, '/api/device/receive_door_new_msg','door')
    }

    async processDeviceInventory(params, config) {
        let postParam = {
            "msgId": params["id"],
            "deviceId": params["deviceId"],
            "msgCreateTime": params["time"],
            "labels": params["label"],
            "category": "scan",
            "scene": params["scene"]
        }
        this.sendHttp(postParam, config, '/api/device/receive_stock_new_msg','inventory')
    }

    async processDeviceInfo(obj, config) {
        let statusMsg = ['exception', 'free', 'busy', 'stock']
        let status = statusMsg[obj.state];
        this.ctx.helper.updateDeviceStatus(obj.deviceId, status);

        if (obj.scene == 2) {
            //平台主动请求
            let postParam = {
                "msgId": obj["id"],
                "deviceId": obj["deviceId"],
                "version": obj["version"],
                "currentTimestamp": obj["time"],
                "deviceState": obj["state"],
                "powerState": obj["power"],
                "upsState": obj["ups"],
            };
            this.sendHttp(postParam, config, '/api/device/receive_new_msg','deviceQrCode')
        }
    }

    async processDeviceExeption(params, config) {
        let code_msg = {
            "1": "关门超时",
            "2": "盘点超时"
        }
        let code = params["code"].toString();
        let msg = code_msg[code]
        let postParam = {
            "msgId": params["id"],
            "deviceId": params["deviceId"],
            "msgCreateTime": params["time"],
            "code": code,
            "msg": msg
        }
        this.sendHttp(postParam, config, '/api/device/receive_exception_new_msg','exception')
    }

    async processDeviceQrCode(params, config) {
        let postParam = {"deviceId": params["deviceId"]}
        let result = await this.sendHttp(postParam, config, '/api/device/query_device_info')
        if (result['qrImg']) {
            let code = 1
            let data = {
                "id": params["id"],
                "code": code,
                "operate": "deviceQrCodeACK",
                "qrImg": result["qrImg"],
                "address": result["address"],
                "name": result["name"],
                "createTime": result["createTime"],
                "status": result["status"]
            }
            this.app.mqtt.publish('device/' + params["deviceId"], JSON.stringify(data));
        }
    }

    async sendHttp(postParam, config, uri, action='') {

        const ctx = this.ctx
        const insertDb = async function () {
            return new ctx.app.model.SendHttp({
                createTime: parseInt(new Date().getTime() / 1000),
                deviceId: postParam['deviceId'] ? postParam['deviceId'] : '',
                operation: action,
                param: JSON.stringify(postParam),
            }).save();
        }
        let secret = config.extendSecret;
        const header = this.getHeaders(postParam, secret);
        const sendCurl = async function (){
            let host = config.callbackUrl;
            return ctx.curl(host + uri, {
                method: 'POST',
                contentType: 'json',
                headers: header,
                data: postParam,
                dataType: 'json',
            });
        }

        const [ insert,result ] = await Promise.all([
            insertDb(),
            sendCurl()
        ]);

        await ctx.model.SendHttp.update({_id: insert._id}, {responseTime:parseInt(new Date().getTime() / 1000),response:JSON.stringify(result.data)});

        return result.data;
    }

    getHeaders(obj, secret) {
        let sort = Object.keys(obj).sort();
        let query = '';
        sort.forEach(function (s) {
            if (Array.isArray(obj[s])) {
                console.log('is array')
                query = query + s.toString() + "=" + obj[s].join("") + "&"
            } else {
                query = query + s.toString() + "=" + obj[s] + "&"
            }
        })
        query = query + secret
        // console.log((query))
        // console.log(md5(query).substr(0, 31) + 'w')
        let sign = md5(md5(query).substr(0, 31) + 'w');
        // console.log(sign)
        return {'Platform': "bjdevice", "Sign": sign}
    }
}

module.exports = DeviceService;
