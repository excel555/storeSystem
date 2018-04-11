'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const HttpSchema = new mongoose.Schema({
        createTime: {type: Number, default: 0},
        deviceId: {type: String},
        operation: {type: String},
        param: {type: String},
        response: {type: String},
        responseTime: {type: Number, default: 0},
    });
    return mongoose.model('http', HttpSchema, null, {cache: true});
};