var koa = require('koa');
var koaRouter = require('koa-router');
var IO = require('koa-socket-2');
var serve = require('koa-static');
require('dotenv').config();
var port = process.env.PORT || 4000;
var app = new koa();
var router = new koaRouter();
var io = new IO();
router.get('/api', (ctx) => {
    ctx.body = 'hello world';
});
app.use(serve('./public'))
io.attach(app);
io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('chat message', msg);
    });
});
app.use(router.routes())
    .use(router.allowedMethods());
app.listen((port), () => {
    console.log(`Server started at: ${port}`)
})