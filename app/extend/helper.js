module.exports = {
    async activeDevice(deviceId) {
        var expireTime = 7 * 24 * 60 * 60;// 7day
        var key = 'lasthearbeat_' + deviceId;
        return this.app.redis.set(key, new Date().getTime(), 'EX', expireTime);
    },
    async getDeviceLastHeartbeat(deviceId){
        var key = 'lasthearbeat_' + deviceId;
        return this.app.redis.get(key);
    },
    async getDeviceStatus(deviceId){
        var key = 'DeviceStatus_' + deviceId;
        return this.app.redis.get(key);
    },
    async updateDeviceStatus(deviceId, status) {
        var expireTime = 7 * 24 * 60 * 60;// 7day
        var key = 'DeviceStatus_' + deviceId;
        console.log(deviceId + '-update status:' + status);
        return this.app.redis.set(key, status, 'EX', expireTime);
    },
    async cacheClients() {
        var clientsObj = {};
        let clients = await this.app.model.Client.find({});
        clients.forEach(function (client) {
            clientsObj[client.code] = client;
        });
        var expireTime = 7 * 24 * 60 * 60;// 7day
        var key = 'clientsObj';
        this.app.redis.set(key, JSON.stringify(clientsObj), 'EX', expireTime);
        return clientsObj;
    },
    async getCacheClients() {
        var clientsObj = {};
        var key = 'clientsObj';
        var cache = await this.app.redis.get(key);
        if (!cache) {
            let clients = await this.app.model.Client.find({});
            clients.forEach(function (client) {
                clientsObj[client.code] = client;
            });
            var expireTime = 7 * 24 * 60 * 60;// 7day
            this.app.redis.set(key, JSON.stringify(clientsObj), 'EX', expireTime);
        } else {
            clientsObj = JSON.parse(cache)
        }
        return clientsObj;
    },
    async cacheDevices() {
        let clientsObj = await this.getCacheClients();
        var devicesObj = {};
        let devices = await this.app.model.Device.find({});
        devices.forEach(function (device) {
            device.config = clientsObj[device.clientId];
            devicesObj[device.deviceId] = device;
        });
        var expireTime = 7 * 24 * 60 * 60;// 7day
        var key = 'devicesObj';
        this.app.redis.set(key, JSON.stringify(devicesObj), 'EX', expireTime);
        return devicesObj;
    },
    async getCacheDevices() {
        var devicesObj = {};
        var key = 'devicesObj';
        var cache = await this.app.redis.get(key);
        if (!cache) {
            let clientsObj = await this.getCacheClients();
            let devices = await this.app.model.Device.find({});
            devices.forEach(function (device) {
                device.config = clientsObj[device.clientId];
                devicesObj[device.deviceId] = device;
            });

            var expireTime = 7 * 24 * 60 * 60;// 7day
            this.app.redis.set(key, JSON.stringify(devicesObj), 'EX', expireTime);
        } else {
            devicesObj = JSON.parse(cache)
        }
        return devicesObj;
    },
    async getCacheDevice(deviceId) {
        var devicesObj = await this.getCacheDevices()
        return devicesObj[deviceId];
    },
    timestampToTime(timestamp) {
        if (!timestamp)
            return ''
        var date = new Date(parseInt(timestamp));
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = (date.getDate() < 10 ? '0' : '') + date.getDate() + ' ';
        h = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':';
        m = (date.getMinutes() < 10 ? '0' : '' ) + date.getMinutes() + ':';
        s = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
        return Y + M + D + h + m + s;
    }
};
