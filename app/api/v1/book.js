const Router = require('koa-router');
const router = new Router({
    prefix: '/v1/book'
});

const {
    HotBook
} = require('../../models/hot_book');
const {
    Book
} = require('../../models/book');
const {
    PositiveIntergerValidator,
    SearchValidator
} = require('../../validators/validator');

router.get('/hot_list', async (ctx, next) => {
    const books = await HotBook.getAll();
    ctx.body = {
        books
    }
});


router.get('/v1/book/latest', async (ctx, next) => {
    const books = await HotBook.getAll();
    ctx.body = {
        'url': '/book/latest',
        'value': books
    }
});

/**
 * 获取书籍详情
 */
router.get('/:id/detail', async (ctx, next) => {
    const v = await new PositiveIntergerValidator().validate(ctx);
    const book = new Book();
    book.exclude = ['updated_at','deletedAt'];
    ctx.body = await book.detail(v.get('path.id'));
});

/**
 * 搜索
 */
router.get('/search', async (ctx, next) => {
    const v = await new SearchValidator().validate(ctx);
    const result = await Book.searchFromYuShu(
        v.get('query.q'),
        v.get('query.start'),
        v.get('query.count')
    );
    ctx.body = result;
})

module.exports = router

