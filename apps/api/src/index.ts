import Koa from 'koa'
import Router from '@koa/router'
import { getDb } from './db'

const app = new Koa()
const router = new Router()

router.get('/api/health', (ctx) => {
  ctx.body = { status: 'ok', timestamp: new Date().toISOString() }
})

router.get('/api/memos', async (ctx) => {
  const db = await getDb()
  const memos = await db.collection('memos').find().sort({ createdAt: -1 }).toArray()
  ctx.body = memos
})

router.post('/api/memos', async (ctx) => {
  const db = await getDb()
  const { content, tags } = ctx.request.body as any
  const memo = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    content,
    tags: tags || [],
    createdAt: Date.now(),
  }
  await db.collection('memos').insertOne(memo)
  ctx.body = memo
})

router.delete('/api/memos/:id', async (ctx) => {
  const db = await getDb()
  await db.collection('memos').deleteOne({ id: ctx.params.id })
  ctx.body = { success: true }
})

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`)
})

export default app
