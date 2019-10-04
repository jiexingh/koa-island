const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/user'
});
const {
    RegisterValidator
} = require('../../validators/validator');
const {
    User
} = require('../../models/user');


// 注册
router.post('/register', async (ctx) => {
    //1. 接收参数
    //2. 校验参数
    const v = new RegisterValidator().validate(ctx);
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickName: v.get('body.nickName')
    }
    await User.create(user);
    throw new global.errors.Success();
});

module.exports = router