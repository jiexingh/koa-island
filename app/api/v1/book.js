const Router = require('koa-router');
const router = new Router();

router.get('/v1/book/latest', (ctx, next) => {
    console.log('/book/latest');
    ctx.body = { 'value': '/book/latest' }
})

module.exports = router

