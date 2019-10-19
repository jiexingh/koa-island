const Koa = require('koa');
const parser = require('koa-bodyparser');
const InitManage = require('./core/init');
const catcheError = require('./middelwares/exception');
const static = require('koa-static');
const path = require('path');

require('./app/models/user');

const app = new Koa();
app.use(parser());
app.use(catcheError);
app.use(static(path.join(__dirname, './static')));
InitManage.initCore(app);

app.listen(3000);


