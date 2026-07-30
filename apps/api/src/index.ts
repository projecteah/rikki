import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { eq, desc } from 'drizzle-orm'
import { notes } from './db/schema'

const app = new Hono<{ Bindings: { DB: D1Database; RIKKI_PASSWORD: string } }>()

app.get('/api/health', (c) => {
	return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/public/notes', async (c) => {
	const db = drizzle(c.env.DB)
	const data = await db
		.select()
		.from(notes)
		.where(eq(notes.visibility, 'public'))
		.orderBy(desc(notes.createdAt))
	return c.json(data)
})

app.post('/api/login', async (c) => {
	const { password } = await c.req.json()
	if (password === c.env.RIKKI_PASSWORD) {
		return c.json({ token: password })
	}
	return c.json({ error: 'wrong password' }, 401)
})

app.get('/api/notes', async (c) => {
	const db = drizzle(c.env.DB)
	const data = await db.select().from(notes).orderBy(desc(notes.createdAt))
	return c.json(data)
})

app.post('/api/notes', async (c) => {
	const db = drizzle(c.env.DB)
	const { content, tags, visibility } = await c.req.json()
	const note = {
		id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
		content,
		tags: tags || [],
		visibility: visibility || 'private',
		createdAt: Date.now(),
	}
	await db.insert(notes).values(note)
	return c.json(note)
})

app.delete('/api/notes/:id', async (c) => {
	const db = drizzle(c.env.DB)
	await db.delete(notes).where(eq(notes.id, c.req.param('id')))
	return c.json({ success: true })
})

export default app
