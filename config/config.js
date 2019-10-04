
module.exports = {
    // 生产 prod  开发 dev
    environment: 'dev',
    dataBase: {
        dbName: 'island',
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: ''
    },
    security: {
        secretKey: "$10$pZ2foPEjiEO9bOu8BxVK1eG5yuIWWbK.5gJ2/J8zwQi7SpdFqDWRW",
        expiresIn: 60 * 60 * 2,//过期时间
    },
    wx: {
        appID: '',
        appSecret: '',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    }

}