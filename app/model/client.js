'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const ClientSchema = new mongoose.Schema({
        name: {type: String},
        code: {type: String},
        addTime: {type: Number, default: 0},
        concact: {type: String},
        tel: {type: String},
        appId: {type: String},
        secret: {type: String},
        extendSecret: {type: String},
        callbackUrl: {type: String}
    });
    return mongoose.model('Client', ClientSchema, null, {cache: false});
};