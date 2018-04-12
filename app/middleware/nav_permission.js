'use strict';
const rbac = require('../../config/rbac.js')
module.exports = (option, app) => {
    return async function navPermission(ctx, next) {
        console.log('navPermission in ... ')
        let urlSplit = ctx.request.url.split('/');
        let menus = rbac.menus;
        let navPer = [];
        let selectNav = '';
        let selectMenu ='';
        let permissions = rbac.permissions;
        for (let menu in menus) {
            let obj = {
                name: menus[menu].name,
                alias: menus[menu].alias,
                icon: menus[menu].icon,
            };
            obj.children = Array()
            for (let permission in permissions) {
                if (permissions[permission].menu === menus[menu].name && (permissions[permission].hidden != true)) {
                    obj.children.push(permissions[permission])
                }
                if(permissions[permission].controller == urlSplit[2] && permissions[permission].action == urlSplit[3]){
                    selectNav = permissions[permission].controller + permissions[permission].action;
                    selectMenu = permissions[permission].menu;
                }
            }
            navPer.push(obj);
        }

        ctx.app.nunjucks.addGlobal('navMenus', navPer);
        ctx.app.nunjucks.addGlobal('selectNav', selectNav);
        ctx.app.nunjucks.addGlobal('selectMenu', selectMenu);
        ctx.app.nunjucks.addGlobal('lastUpateMonitor', '121-')
        await next();
    };
};