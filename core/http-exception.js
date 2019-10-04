
class HttpException extends Error {
    constructor(msg = 'server error', errorCode = 10000, code = 400) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.code = code;
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 10000;
        this.code = 400;
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'operate success';
        this.errorCode = errorCode || 0;
        this.code = 201;
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'source not found';
        this.errorCode = errorCode || 10000;
        this.code = 404;
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'Authorization fail';
        this.errorCode = errorCode || 10004;
        this.code = 401;
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'forbbiden';
        this.errorCode = errorCode || 10006;
        this.code = 403;
    }
}

class LikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'You have liked';
        this.errorCode = errorCode || 60001;
        this.code = 400;
    }
}

class DisLikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'You have liked';
        this.errorCode = errorCode || 60002;
        this.code = 400;
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DisLikeError
}