// 设备监控 - 心跳 - 异常 
module.exports = {
    schedule: {
        interval: '2m', // 2 分钟间隔
        type: 'worker', // only run in one worker
        immediate: true //配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务
    },
    async task(ctx) {

    }
};