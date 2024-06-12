import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const notes = sqliteTable('notes', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  tags: text('tags', { mode: 'json' }).$type<string[]>().default([]),
  visibility: text('visibility', { enum: ['public', 'private'] }).default('private'),
  pinned: integer('pinned', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at').notNull(),
})
