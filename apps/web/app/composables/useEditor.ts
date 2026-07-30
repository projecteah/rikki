import { marked } from 'marked'

export function useEditor() {
	const format = (textarea: HTMLTextAreaElement, before: string, after?: string) => {
		const start = textarea.selectionStart
		const end = textarea.selectionEnd
		const text = textarea.value
		const selected = text.substring(start, end)
		const replacement = before + (selected || 'text') + (after || '')

		textarea.value = text.substring(0, start) + replacement + text.substring(end)

		setTimeout(() => {
			textarea.focus()
			textarea.setSelectionRange(
				start + before.length,
				start + before.length + (selected ? selected.length : 4),
			)
		})
	}

	const render = (content: string) => marked.parse(content)

	return { format, render }
}
