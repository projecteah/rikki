import process from 'node:process'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2'
import { admin } from 'better-auth/plugins'
import { db } from './db'

export const auth = betterAuth({
	baseURL: process.env.NUXT_PUBLIC_SITE_URL as string,
	database: drizzleAdapter(db, {
		provider: 'sqlite',
	}),
	plugins: [admin()],
})
