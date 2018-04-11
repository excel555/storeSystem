'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const MqttSchema = new mongoose.Schema({
        createTime: {type: Number, default: 0},
        deviceId: {type: String},
        operation: {type: String},
        topic: {type: String},
        content: {type: String},
        msgId: {type: String},
    });
    return mongoose.model('Mqtt', MqttSchema, null, {cache: true});
};