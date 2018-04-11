'use strict';

exports.keys = 'strictnunj64udaks';

exports.view = {
    defaultViewEngine: 'nunjucks',
};
exports.nunjucks = {
    // dir: 'path/to/template/dir',  // default to `{app_root}/app/view`
    cache: true, // local env is false
};
exports.logger = {
    level: 'ERROR',
    // dir: ''
}
exports.security = {
    csrf: {
        enable: false,
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        // ignore: ctx => isInnerIp(ctx.ip),
    },
}
exports.middleware = ['errorHandler'];
exports.redis = {
    client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 0,
    },
}
/*
 //redis 集群
 exports.redis = {
 client: {
 cluster: true,
 nodes: [{
 host: '127.0.0.1',
 port: '6379',
 family: 'user',
 password: 'password',
 db: 'db',
 }, {
 host: '127.0.0.1',
 port: '6380',
 family: 'user',
 password: 'password',
 db: 'db',
 }]
 },
 };
 */

exports.mongoose = {
    client: {
        url: 'mongodb://127.0.0.1/iot',
        options: {},
    },
};

exports.offlineInterval = 65; //离线间隔

exports.mqtt = {
    client: {
        host: '127.0.0.1',
        port: '1883',
        user: '',
        password: '',
        clientId: 'iot',
        connectTimeout: 30 * 1000,
        keepalive: 5,
        clean: false
    }
};