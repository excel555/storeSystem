'use strict';

module.exports = app => {

    app.router.get('/admin/login' ,'admin.login');
    app.router.get('/', 'admin.home');
    app.router.get('/admin/home', 'admin.home');

    // const localStrategy = app.passport.authenticate('local');
    app.router.post('/admin/login', app.passport.authenticate('local'),function(req, res, next, err){});

    app.router.get('/admin/logout', 'admin.logout');


    //admin employee module
    app.router.get('/admin/employee/index', 'admin.employee.index');
    app.router.get('/admin/employee/list', 'admin.employee.list');
    app.router.post('/admin/employee/save', 'admin.employee.save');
    app.router.post('/admin/employee/delete', 'admin.employee.delete');

    //admin client module
    app.router.get('/admin/client/index', 'admin.client.index');
    app.router.get('/admin/client/list', 'admin.client.list');
    app.router.post('/admin/client/save', 'admin.client.save');
    app.router.post('/admin/client/delete', 'admin.client.delete');
    app.router.get('/admin/client/cache', 'admin.client.refreshCache');

    //admin device module
    app.router.get('/admin/device/index', 'admin.device.index');
    app.router.get('/admin/device/list', 'admin.device.list');
    app.router.get('/admin/device/status', 'admin.device.status');
    app.router.get('/admin/device/listStatus', 'admin.device.listStatus');
    app.router.post('/admin/device/save', 'admin.device.save');
    app.router.post('/admin/device/delete', 'admin.device.delete');
    app.router.get('/admin/device/cache', 'admin.device.refreshCache');

    //admin mqtt module
    app.router.get('/admin/mqtt/index', 'admin.mqtt.index');
    app.router.get('/admin/mqtt/list', 'admin.mqtt.list');

    //admin http msg module
    app.router.get('/admin/api/index', 'admin.api.index');
    app.router.get('/admin/api/list', 'admin.api.list');
    app.router.get('/admin/api/send', 'admin.api.send');
    app.router.get('/admin/api/sendList', 'admin.api.sendList');

    //api module
    app.router.post('/api/command/openDoor', 'api.openDoor');
    app.router.post('/api/command/inventory', 'api.inventory');
    app.router.post('/api/command/getDeviceInfo', 'api.getDeviceInfo');
};
