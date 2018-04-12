// 设备监控 - 心跳 - 异常 
module.exports = {
    schedule: {
        cron: '0 0 3 * * *',// 每天凌晨3点执行一次
        // interval: '10s', // 2 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        console.log('每天凌晨3点执行一次')
        let newTime = parseInt(new Date().getTime() / 1000);
        let over14day = newTime - 14 * 24 * 60 * 60
        console.log('删除数据14天前的数据：' + over14day)
        let search = {
            createTime: {'$lte': over14day}
        }
        ctx.model.Mqtt.remove(search);
    }

};