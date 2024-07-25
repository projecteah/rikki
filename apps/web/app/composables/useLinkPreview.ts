export interface LinkPreview {
  url: string
  title: string
  description: string
  image: string
}

export function useLinkPreview() {
  const cache = new Map<string, LinkPreview>()

  const extractUrl = (content: string): string | null => {
    const match = content.match(/https?:\/\/[^\s]+/)
    return match ? match[0] : null
  }

  const fetchPreview = async (url: string): Promise<LinkPreview | null> => {
    if (cache.has(url)) return cache.get(url)!

    try {
      const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      if (data.status === 'success') {
        const preview: LinkPreview = {
          url,
          title: data.data.title || '',
          description: data.data.description || '',
          image: data.data.image?.url || '',
        }
        cache.set(url, preview)
        return preview
      }
    } catch {
      // ignore
    }
    return null
  }

  return { extractUrl, fetchPreview }
}
