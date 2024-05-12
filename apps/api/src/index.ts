import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/notes', async (c) => {
  return c.json([])
})

app.post('/api/notes', async (c) => {
  return c.json({})
})

app.delete('/api/notes/:id', async (c) => {
  return c.json({ success: true })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`)
})

export default app
