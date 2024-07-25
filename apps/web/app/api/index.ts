interface ApiOptions {
  apiBase: string
  token?: string
  method?: string
  body?: any
}

async function request<T>(path: string, options: ApiOptions): Promise<T> {
  const { apiBase, token, method = 'GET', body } = options
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${apiBase}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) throw new Error(`${method.toLowerCase()} failed`)
  return res.json()
}

export async function login(apiBase: string, password: string) {
  const res = await fetch(`${apiBase}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) throw new Error('login failed')
  const { token } = await res.json()
  return token
}

export async function getNotes(apiBase: string, token: string) {
  return request<any[]>('/api/notes', { apiBase, token })
}

export async function createNote(apiBase: string, token: string, content: string, tags: string[]) {
  return request('/api/notes', { apiBase, token, method: 'POST', body: { content, tags } })
}

export async function deleteNote(apiBase: string, token: string, id: string) {
  await request(`/api/notes/${id}`, { apiBase, token, method: 'DELETE' })
}

export async function updateVisibility(apiBase: string, token: string, id: string, visibility: string) {
  await request(`/api/notes/${id}/visibility`, { apiBase, token, method: 'PATCH', body: { visibility } })
}
