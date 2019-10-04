const util = require('util');
const axios = require('axios');
const {
    User
} = require('../models/user');
const {
    generateToken
} = require('../../core/util');
const {
    Auth
} = require('../../middelwares/auth');

class WxManage {
    static async codeToToken(code) {
        // 利用util 格式化url
        const url = util.format(
            global.config.wx.loginUrl,
            global.config.wx.appID,
            global.config.wx.appSecret,
            code,
        );
        const result = await axios.get(url);
        if (result.status != 200) {
            throw new global.errors.AuthFailed('openid get failed');
        }
        const errCode = result.data.errcode;
        const errMsg = result.data.errmsg;
        // 此处注意 errcode 成功没有这个字段 与接口文档返回0 描述不一致
        if (errCode) {
            throw new global.errors.AuthFailed('openid get failed code:' + errMsg);
        }

        let user = await User.getUserByOpenid(result.data.openid);
        if (!user) {
            user = await User.registerByOpenid(result.data.openid);
        }

        return generateToken(user.id, Auth.USER);
    }
}

module.exports = {
    WxManage
}