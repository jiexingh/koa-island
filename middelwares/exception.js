const { HttpException } = require('../core/http-exception');

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 开发环境与生产环境 不是HttpException
        const isHttpException = error instanceof HttpException;
        const isDev = global.config.environment === 'dev';
        if (isDev && !isHttpException) {
            throw error
        }
        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method}  ${ctx.path}`,
            }
            ctx.status = error.code;
        } else {
            // 未知异常
            ctx.body = {
                msg: 'we make a mistake',
                error_code: 999,
                request: `${ctx.method}  ${ctx.path}`,
            }
            ctx.status = 500;
        }
    }
}
module.exports = catchError