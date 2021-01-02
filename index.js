var koa = require('koa');
var koaRouter = require('koa-router');
var serve = require('koa-static');
require('dotenv').config();
var port = process.env.PORT || 4000;
var app = new koa();
var router = new koaRouter();
var socket = require('./app/socket');
socket(app);
router.get('/api', (ctx) => {
    ctx.body = 'hello world';
});
app.use(serve('./public'))
app.use(router.routes())
    .use(router.allowedMethods());
app.listen((port), () => {
    console.log(`Server started at: ${port}`)
})