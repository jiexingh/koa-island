
function isThisType(val) {
    for (let key in this) {
        if (this[key] === val) {
            return true
        }
    }
    return false
}

// 创建对象 模拟枚举登录方式 但不是真枚举
// 小程序 用户email 手机号 管理员登录邮箱
const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 103,
    isThisType
}

const ApiScope = {
    USER: 8,
    ADMIN: 16,
    SUPER_ADMIG: 32
}

module.exports = {
    LoginType,
    ApiScope
}