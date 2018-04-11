'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const DeviceSchema = new mongoose.Schema({
        deviceId: {type: String},
        name: {type: String},
        client: {type: String},
        clientId: {type: String},
        addTime: {type: Number, default: 0},
        type: {type: String},
        sim: {type: String},
        route: {type: String},
        config: {type: Object}
    });
    return mongoose.model('Device', DeviceSchema, null, {cache: false});
};