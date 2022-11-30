export function useSync() {
  const API_BASE = import.meta.env.VITE_API_BASE || ''

  const fetchMemos = async () => {
    const res = await fetch(`${API_BASE}/api/memos`)
    return res.json()
  }

  const pushMemo = async (content: string, tags: string[]) => {
    const res = await fetch(`${API_BASE}/api/memos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, tags }),
    })
    return res.json()
  }

  const removeMemo = async (id: string) => {
    await fetch(`${API_BASE}/api/memos/${id}`, { method: 'DELETE' })
  }

  return { fetchMemos, pushMemo, removeMemo }
}
