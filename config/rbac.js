'use strict';
exports.menus = [
    {name: 'employee', alias: '店员管理', icon: 'icon-sitemap'},
    {name: 'order', alias: '交易管理', icon: 'icon-money'},
    {name: 'goods', alias: '商品管理', icon: 'icon-food'},
    {name: 'user', alias: '用户管理', icon: 'icon-user'},
    {name: 'store', alias: '门店', icon: 'icon-building'},
    {name: 'activity', alias: '活动营销', icon: 'icon-star'},
    {name: 'report', alias: '报表', icon: 'icon-bar-chart'},
    {name: 'wms', alias: 'WMS仓储', icon: 'icon-truck'},
];

exports.permissions = [
    // employee
    {controller: 'employee', action: 'index', menu: 'employee', alias: '员工列表', hidden: false},
    {controller: 'employee', action: 'add', menu: 'employee', alias: '添加员工', hidden: true},
    {controller: 'employee', action: 'edit', menu: 'employee', alias: '编辑员工', hidden: true},
    {controller: 'employee', action: 'permission', menu: 'employee', alias: '权限分组', hidden: true},
    {controller: 'employee', action: 'permission', menu: 'employee', alias: '添加分组', hidden: true},

    //门店
    {controller: 'store', action: 'index', menu: 'store', alias: '修改门店信息', hidden: false},

    //商品
    {controller: 'goods', action: 'index', menu: 'goods', alias: '商品列表', hidden: false},
    {controller: 'goods', action: 'category', menu: 'goods', alias: '商品分类', hidden: false},
    {controller: 'goods', action: 'stocks', menu: 'goods', alias: '商品库存', hidden: false},
    {controller: 'goods', action: 'notFinish', menu: 'goods', alias: '半成品', hidden: false},
    {controller: 'goods', action: 'notFinish', menu: 'goods', alias: '半成品', hidden: false},

    //活动管理
    {controller: 'activity', action: 'index', menu: 'activity', alias: '活动列表', hidden: false},
    {controller: 'activity', action: 'banner', menu: 'activity', alias: '广告位列表', hidden: false},
    {controller: 'activity', action: 'group', menu: 'activity', alias: '拼团', hidden: false},

    //用户管理
    {controller: 'user', action: 'index', menu: 'user', alias: '用户列表', hidden: false},
    {controller: 'user', action: 'score', menu: 'user', alias: '用户积分', hidden: false},
    {controller: 'user', action: 'plus', menu: 'user', alias: '用户PLUS', hidden: false},
    {controller: 'user', action: 'charge', menu: 'user', alias: '充值列表', hidden: false},
    {controller: 'user', action: 'address', menu: 'user', alias: '地址列表', hidden: false},


    //订单
    {controller: 'order', action: 'index', menu: 'order', alias: '订单列表', hidden: false},
    {controller: 'order', action: 'group', menu: 'order', alias: '拼团订单', hidden: false},
    {controller: 'order', action: 'pos', menu: 'order', alias: 'POS订单', hidden: false},
    {controller: 'order', action: 'afterSale', menu: 'order', alias: '售后', hidden: false},
    {controller: 'order', action: 'pay', menu: 'order', alias: '支付列表', hidden: false},
    {controller: 'order', action: 'waitSend', menu: 'order', alias: '等待派送订单', hidden: false},
    {controller: 'order', action: 'exception', menu: 'order', alias: '异常订单', hidden: false},

    //报表
    {controller: 'report', action: 'index', menu: 'report', alias: '整体看板', hidden: false},

    //wms
    {controller: 'warehouse', action: 'index', menu: 'wms', alias: '仓库设置', hidden: false},
    {controller: 'warehouse', action: 'add', menu: 'wms', alias: '添加仓库', hidden: true},
    {controller: 'warehouse', action: 'warn', menu: 'wms', alias: '库存预警', hidden: false},
    {controller: 'warehouse', action: 'stocks', menu: 'wms', alias: '库存管理', hidden: false},
    {controller: 'warehouse', action: 'supplier', menu: 'wms', alias: '供应商', hidden: false},
    {controller: 'warehouse', action: 'allocate', menu: 'wms', alias: '叫货', hidden: false},
    {controller: 'warehouse', action: 'stockIn', menu: 'wms', alias: '入库', hidden: false},
    {controller: 'warehouse', action: 'stockOut', menu: 'wms', alias: '出库', hidden: false},
    {controller: 'warehouse', action: 'check', menu: 'wms', alias: '盘点', hidden: false},
    {controller: 'warehouse', action: 'loseReport', menu: 'wms', alias: '报损', hidden: false},
    {controller: 'warehouse', action: 'cases', menu: 'wms', alias: '物料', hidden: false},

];

