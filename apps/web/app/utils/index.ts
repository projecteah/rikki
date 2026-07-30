export function formatTime(ts: number): string {
	const diff = Date.now() - ts
	if (diff < 60000) return 'just now'
	if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
	if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
	return new Date(ts).toLocaleDateString()
}

export function extractTags(content: string): string[] {
	const matches = content.match(/#(\S+)/g)
	return matches ? matches.map((t) => t.slice(1)) : []
}
