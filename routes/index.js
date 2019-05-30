const router = require('koa-router')()
const userService = require('./mysqlConfig')
var cors = require('koa2-cors')
// router.use(cors({
//   origin: function (ctx) {
//     console.log(ctx)
//     // if (ctx.url === '/test') {
//     //   return '*';
//     // }
//     return 'http://127.0.0.1:8848'
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

// 跨域解决
router.use(cors())
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 测试接口
router.post('/test', async (ctx, next) => {
  var data1 = {
    token: ctx.request.body.token,
    identify: ctx.request.body.identify,
  };
  await userService.findUserData(data1)
      .then((data2) => {
        if (data1.token == 666 && data1.identify == 'frontEnd') {
          ctx.body = {
            code: 200,
            msg: 'SUCCESS',
            data: data2
          }
        } else {
          ctx.body = { err: 1, msg: 'invalid request' }
        }
      }).catch(() => {
          
      })
})

module.exports = router
