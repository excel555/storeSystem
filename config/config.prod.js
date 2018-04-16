'use strict';

exports.keys = 'my secret keys';

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
exports.static = {
    maxAge: 31536000,
};


exports.security = {
    csrf: {
        ignore: '/api',
        enable: false,
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        // ignore: ctx => isInnerIp(ctx.ip),
    },
}

exports.passportLocal = {
    // usernameField: 'username',
    // passwordField: 'password',
};


exports.middleware = ['errorHandler','navPermission'];


exports.navPermission =  {
    ignore: '/api'
}


exports.redis = {
    client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 0,
    },
}

exports.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'store',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'Denglu123-',
    timezone: '+08:00',
    define: {
        schema: 'ex',
        schemaDelimiter: '_',
        benchmark:true,
        logging:true
    }
};

exports.offlineInterval = 65; //离线间隔

