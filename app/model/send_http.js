'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const SendHttpSchema = new mongoose.Schema({
        createTime: {type: Number, default: 0},
        deviceId: {type: String},
        operation: {type: String},
        param: {type: String},
        response: {type: String},
        responseTime: {type: Number, default: 0},
    });
    return mongoose.model('sendhttp', SendHttpSchema, null, {cache: true});
};