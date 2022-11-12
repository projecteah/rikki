import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

router.get('/api/health', (ctx) => {
  ctx.body = { status: 'ok', timestamp: new Date().toISOString() }
})

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`)
})
