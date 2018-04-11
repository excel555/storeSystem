'use strict';


module.exports = app => {
    app.mqtt.subscribe('server/#', {qos: 1});
    app.mqtt.on('message', function (topic, message) {
        let deviceId = topic.substr(7);
        const ctx = app.createAnonymousContext();
        ctx.helper.activeDevice(deviceId);
        let str = message.toString().replace(/\b0(\d)/g, "$1");
        try {
            var msgObj = JSON.parse(str);
            let mqttMsg = new app.model.Mqtt({
                topic: topic,
                createTime: parseInt(msgObj.time),
                deviceId: deviceId,
                operation: msgObj.operate,
                content: str,
                msgId: msgObj.id
            });
            mqttMsg.save();
            msgObj.deviceId = deviceId;
            ctx.service.device.process(msgObj);
        } catch (e) {
            console.log('mqtt message error')
        }
    });
};