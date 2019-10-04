const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/token'
});
const {
    TokenValidator,
    NotEmptyValidator
} = require('../../validators/validator');
const {
    LoginType
} = require('../../libs/enum');
const {
    User
} = require('../../models/user');
const {
    generateToken
} = require('../../../core/util');
const {
    Auth
} = require('../../../middelwares/auth');
const {
    WxManage
} = require('../../services/wx');


router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx);
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_MINI_PROGRAM:
            token = await WxManage.codeToToken(v.get('body.account'));
            ctx.body = {
                'type': 'mini',
                'token': token
            }

            break;
        case LoginType.USER_EMAIL:
            token = await emailLogin(
                v.get('body.account'),
                v.get('body.secret')
            );
            ctx.body = {
                'type': 'email',
                'token': token
            }
            break;
        default:
            throw new global.errors.ParameterException('function not found');
    }
});

router.post('/verify', async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx);
    const result = Auth.verifyToken(v.get('body.token'));
    ctx.body = {
        is_valide: result
    }
})

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret);
    return token = generateToken(user.id, Auth.USER)
}

module.exports = router