import Koa from 'koa'

const PASSWORD = process.env.RIKKI_PASSWORD || 'admin'

export function auth() {
	return async (ctx: Koa.Context, next: Koa.Next) => {
		if (ctx.path === '/api/login') return next()

		const authHeader = ctx.headers.authorization
		if (authHeader === `Bearer ${PASSWORD}`) return next()

		ctx.status = 401
		ctx.body = { error: 'unauthorized' }
	}
}
