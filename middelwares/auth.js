const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Auth {
    constructor(level) {
        // 定义实例属性
        this.level = level || 1;
        // 定义类变量进行权限分级
        Auth.USER = 8;
        Auth.ADMIN = 16;
        Auth.SUPER_ADMIG = 32;
    }

    get m() {
        return async (ctx, next) => {
            //  token 检测
            // token 前端如何传递  前后端约定 body header
            // http 规定的验证机制 httpBasicAuth
            // req 获取node 原生的request 对象
            const userToken = basicAuth(ctx.req);
            let errMsg = 'token illegal'
            if (!userToken || !userToken.name) {
                throw new global.errors.Forbbiden(errMsg);
            }
            try {
                var deCode = jwt.verify(userToken.name, global.config.security.secretKey);
            } catch (error) {
                // token 不合法 
                // token 过期
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token Expired';
                }
                throw new global.errors.Forbbiden(errMsg);
            }

            if (deCode.scope < this.level) {
                errMsg = 'insufficient permissions';
                throw new global.errors.Forbbiden(errMsg);
            }
            // uid scope
            ctx.auth = {
                uid: deCode.uid,
                scope: deCode.scope
            }
            await next();
        }
    }

    /**
     * 验证token 过期与否
     */
    static verifyToken(token) {
        try {
            jwt.verify(token,
                global.config.security.secretKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = {
    Auth
}