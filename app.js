const Koa = require('koa');
const parser = require('koa-bodyparser');
const InitManage = require('./core/init');
const catcheError = require('./middelwares/exception');

require('./app/models/user');

const app = new Koa();
app.use(parser());
app.use(catcheError);
InitManage.initCore(app);

app.listen(3000);


