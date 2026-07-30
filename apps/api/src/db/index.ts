import { drizzle } from 'drizzle-orm/d1'
import { notes } from './schema'

export function getDb(d1: D1Database) {
	const db = drizzle(d1)
	return { db, notes }
}
