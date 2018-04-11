'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
class ApiService extends Service {
    constructor(ctx) {
        super(ctx);
        this.result = {}
    }

    async process(action) {
        let deviceId = this.ctx.request.body.params.deviceId;
        let device = await this.ctx.helper.getCacheDevice(deviceId);
        if (!device) {
            return this.result = {"code": 20001, "tips": "售货机不存在", "errorMsg": "售货机不存在"}
        }
        let config = device.config;
        console.log('process ... ')
        if (this.checkSign(config) !== true) {
            return this.result;
        } else if (await this.checkDeviceOnline() !== true) {
            return this.result;
        } else if (await this.checkDeviceStatus(action) !== true) {
            return this.result;
        }

        this.result = {"state": {"tips": "OK", "code": 0}, "requestId": this.ctx.request.body.requestId};

        return this.result;
    }

    checkSign(config) {
        let req = this.ctx.request.body;
        if (config.appId != req.appkey) {
            return this.result = {"code": 10004, "tips": "appkey错误", "errorMsg": "appkey错误"}
        }
        if (req.sign && req.requestId && req.appkey) {
            let secret = config.secret;
            console.log((req.appkey + req.requestId + secret))
            let md5Str = md5(req.appkey + req.requestId + secret)
            console.log(md5Str)
            if (md5Str != req.sign) {
                return this.result = {"code": 10006, "tips": "参数值非法", "errorMsg": "签名错误"}
            }
        } else {
            return this.result = {"code": 10005, "tips": "缺少必填参数", "errorMsg": "缺少必填参数"}
        }
        return true;
    }

    async checkDeviceOnline() {
        return true;
        let deviceId = this.ctx.request.body.params.deviceId;
        let lstHeart = await this.ctx.helper.getDeviceLastHeartbeat(deviceId);
        console.log(lstHeart);
        console.log(new Date().getTime() - 60000);
        if (lstHeart < new Date().getTime() - 60000) {
            console.log('售货机失联');
            console.log('in')
            return this.result = {"code": 20002, "tips": "售货机失联", "errorMsg": "售货机失联"}
        }
        return true;
    }

    async checkDeviceStatus(action) {
        let deviceId = this.ctx.request.body.params.deviceId;
        let status = await this.ctx.helper.getDeviceStatus(deviceId);
        let statusMsgTips = "未知";
        if (!status) {
            return this.result = {
                "code": 20003,
                "tips": "售货机当前状态[" + statusMsgTips + "]不允许请求开门",
                "errorMsg": "售货机状态为:" + statusMsgTips
            }
        }
        let statusMsg = {'free': '空闲', 'busy': '门已打开', 'stock': '盘点中'};
        if (statusMsg[status])
            statusMsgTips = statusMsg[status];
        switch (action) {
            case 'openDoor':
                if (['free'].indexOf(status) == -1) {
                    return this.result = {
                        "code": 20003,
                        "tips": "售货机当前状态[" + statusMsgTips + "]不允许请求开门",
                        "errorMsg": "售货机状态为:" + statusMsgTips
                    }
                }
                break;
            case 'inventory':
                if (['free'].indexOf(status) == -1) {
                    return this.result = {
                        "code": 20003,
                        "tips": "售货机当前状态[" + statusMsgTips + "]不允许请求盘点",
                        "errorMsg": "售货机状态为:" + statusMsgTips
                    }
                }
                break;
            case 'getDeviceInfo':
                // all status can use
                break;
            default:
                return this.result = {"code": 10003, "tips": "非法请求", "errorMsg": "非法请求"}
                //error
                break;
        }
        return true
    }
}

module.exports = ApiService;
