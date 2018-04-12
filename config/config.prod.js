'use strict';

exports.keys = 'myMunjucksorHandlereys';

exports.view = {
    defaultViewEngine: 'nunjucks',
};
exports.nunjucks = {
    // dir: 'path/to/template/dir',  // default to `{app_root}/app/view`
    cache: true, // local env is false
};
exports.logger = {
    level: 'DEBUG',
    // dir: ''
}
exports.security = {
    csrf: {
        enable: false,
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        // ignore: ctx => isInnerIp(ctx.ip),
    },
}
exports.middleware = ['errorHandler','navPermission'];
exports.redis = {
    client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 0,
    },
}

exports.mysql = {
    // database configuration
    client: {
        // host
        host: '127.0.0.1',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: 'Denglu123-',
        // database
        database: 'store',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
};

exports.offlineInterval = 65; //离线间隔

