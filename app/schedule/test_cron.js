module.exports = {
    schedule: {
        interval: '1m', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
        disable: true
    },
    async task(ctx) {
        // const res = await ctx.curl('http://stagingcityboxapi.fruitday.com/api/device/receive_stock_msg', {
        //     data:{"labels":[],"msgId":"tess003","deviceId":"WGG65889957","msgCreateTime":1520528404881,"scene":"closeDoor"},
        //     method: 'POST',
        //     contentType: 'json',
        //     dataType: 'json',
        // });
        // console.log(res.data);
    },
};