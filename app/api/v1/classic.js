const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/classic'
});

const {
    HttpException,
    ParameterException
} = require('../../../core/http-exception');
const {
    PositiveIntergerValidator
} = require('../../validators/validator');
const {
    Auth
} = require('../../../middelwares/auth');
const {
    ApiScope
} = require('../../libs/enum');
const {
    Flow
} = require('../../models/flow');
const {
    Art
} = require('../../models/art');

// 权限值 之后可以做出枚举
// router.get('/latest', new Auth(ApiScope.ADMIN).m, async (ctx, next) => {
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    });
    const art =await Art.getData(flow.art_id, flow.type);
    // art.dataValues.index = flow.index
    art.setDataValue('index', flow.index);
    ctx.body = {
        'uid': ctx.auth.uid,
        'scope': ctx.auth.scope,
        'art': art
    }
})

// router.get('/v1/:id/classic/latest', new Auth().m, async (ctx, next) => {
//     const params = ctx.params;
//     const query = ctx.request.query;
//     const hearder = ctx.request.header;
//     const body = ctx.request.body;

//     const v = new PositiveIntergerValidator().validate(ctx);
//     const id = v.get('path.id', parsed = false)

//     ctx.body = {
//         'url': '/classic/latest',
//         params,
//         query,
//         hearder,
//         body
//     }
// })

module.exports = router
