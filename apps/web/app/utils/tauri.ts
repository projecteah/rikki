/**
 * check if we're running inside a Tauri webview
 */
export const isTauri = typeof window !== 'undefined' && !!(window as any).__TAURI_INTERNALS__
