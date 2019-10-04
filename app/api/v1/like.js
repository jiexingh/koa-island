const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/like'
});
const {
    Auth
} = require('../../../middelwares/auth');
const {
    LikeValidator
} = require('../../validators/validator');
const {
    Favor
} = require('../../models/favor');

const {
    Success
} = require('../../../core/http-exception');

router.post('/', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        // lin validate 别名系统
        id: 'art_id'
    });
    // uid 在auth 里面放在了ctx 上下文了
    Favor.like(v.get('body.art_id'),
        v.get('body.type'),
        ctx.auth.uid);
    Success('like success');
});

router.post('/cancel', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    });
    Favor.disLike(v.get('body.art_id'),
        v.get('body.type'),
        ctx.auth.uid);
    Success('cancel sucessful');
})

module.exports = router
