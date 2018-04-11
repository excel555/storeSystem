// 设备监控 - 心跳 - 异常 
module.exports = {
    schedule: {
        interval: '2m', // 2 分钟间隔
        type: 'worker', // only run in one worker
        immediate: true //配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务
    },
    async task(ctx) {
        console.log('设备监控 - 心跳 - 异常 ')
        const devices = await ctx.helper.getCacheDevices();
        // parallel device status
        const deviceStatus = await Promise.all(
            Object.keys(devices).map(deviceId => {
                return ctx.helper.getDeviceStatus(deviceId);
            })
        );
        const deviceHeart = await Promise.all(
            Object.keys(devices).map(deviceId => {
                return ctx.helper.getDeviceLastHeartbeat(deviceId);
            })
        );


        const onlineDevices = []
        const offlineDevices = []
        const exceptionDevices = []

        Object.keys(devices).map((deviceId, index) => {
            let device = devices[deviceId]
            device.sim = deviceStatus[index]
            if (deviceStatus[index] == 'exception') {
                exceptionDevices.push(device)
            }
            device.route = ctx.helper.timestampToTime(deviceHeart[index])
            if (deviceHeart[index] < new Date().getTime() - ctx.app.config.offlineInterval * 1000) {
                offlineDevices.push(device)
            } else {
                onlineDevices.push(device)
            }
        });

        ctx.app.redis.set('onlineDevices', JSON.stringify(onlineDevices));
        ctx.app.redis.set('offlineDevices', JSON.stringify(offlineDevices));
        ctx.app.redis.set('exceptionDevices', JSON.stringify(exceptionDevices));

        let now = parseInt(new Date().getTime());
        ctx.app.nunjucks.addGlobal('lastUpateMonitor', ctx.helper.timestampToTime(now))
        ctx.app.nunjucks.addGlobal('onlineNum', onlineDevices.length)
        ctx.app.nunjucks.addGlobal('offlineNum', offlineDevices.length)
        ctx.app.nunjucks.addGlobal('exceptionNum', exceptionDevices.length)
    }
};