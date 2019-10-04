const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManage {
    // 导入app核心对象 入口方法
    static initCore(app) {
        InitManage.app = app;
        InitManage.initLoadRouters();
        InitManage.loadHttpException();
        InitManage.loadConfig();
    }

    static initLoadRouters() {
        // 自动注册
        // 寻找项目路径 项目根目录 拼接api 地址
        const apiDirectory = `${process.cwd()}/app/api/v1`;
        const modules = requireDirectory(module, apiDirectory, { visit: whenLoadModule });

        // 如果是koa router 就自动注册
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManage.app.use(obj.routes());
            }
        }
    }

    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js';
        const config = require(configPath);
        global.config = config;
    }

    // 导入全局自定义异常
    static loadHttpException() {
        const errors = require('./http-exception');
        global.errors = errors;
    }
}

module.exports = InitManage