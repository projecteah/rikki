import Koa from 'koa'
import Router from '@koa/router'
import { getDb } from './db'
import { auth } from './auth'

const app = new Koa()
const router = new Router()

app.use(auth())

router.get('/api/health', (ctx) => {
  ctx.body = { status: 'ok', timestamp: new Date().toISOString() }
})

router.post('/api/login', (ctx) => {
  const { password } = ctx.request.body as any
  if (password === process.env.RIKKI_PASSWORD) {
    ctx.body = { token: password }
  } else {
    ctx.status = 401
    ctx.body = { error: 'wrong password' }
  }
})

router.get('/api/notes', async (ctx) => {
  const db = await getDb()
  const notes = await db.collection('notes').find().sort({ createdAt: -1 }).toArray()
  ctx.body = notes
})

router.post('/api/notes', async (ctx) => {
  const db = await getDb()
  const { content, tags, visibility } = ctx.request.body as any
  const note = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    content,
    tags: tags || [],
    visibility: visibility || 'private',
    createdAt: Date.now(),
  }
  await db.collection('notes').insertOne(note)
  ctx.body = note
})

router.patch('/api/notes/:id/visibility', async (ctx) => {
  const db = await getDb()
  const { visibility } = ctx.request.body as any
  await db.collection('notes').updateOne({ id: ctx.params.id }, { $set: { visibility } })
  ctx.body = { success: true }
})

router.delete('/api/notes/:id', async (ctx) => {
  const db = await getDb()
  await db.collection('notes').deleteOne({ id: ctx.params.id })
  ctx.body = { success: true }
})

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`)
})

export default app
