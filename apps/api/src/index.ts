import { Hono } from 'hono'
import { MongoClient, Db } from 'mongodb'

const app = new Hono()

let db: Db | null = null

async function getDb(): Promise<Db> {
  if (db) return db
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)
  await client.connect()
  db = client.db('rikki')
  return db
}

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/login', async (c) => {
  const { password } = await c.req.json()
  if (password === process.env.RIKKI_PASSWORD) {
    return c.json({ token: password })
  }
  return c.json({ error: 'wrong password' }, 401)
})

app.get('/api/notes', async (c) => {
  const database = await getDb()
  const notes = await database.collection('notes').find().sort({ createdAt: -1 }).toArray()
  return c.json(notes)
})

app.post('/api/notes', async (c) => {
  const database = await getDb()
  const { content, tags, visibility } = await c.req.json()
  const note = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    content,
    tags: tags || [],
    visibility: visibility || 'private',
    createdAt: Date.now(),
  }
  await database.collection('notes').insertOne(note)
  return c.json(note)
})

app.delete('/api/notes/:id', async (c) => {
  const database = await getDb()
  await database.collection('notes').deleteOne({ id: c.req.param('id') })
  return c.json({ success: true })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`)
})

export default app
