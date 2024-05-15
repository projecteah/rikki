import { Hono } from 'hono'

const app = new Hono()

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
