import { ref, computed } from Vue';
import { current } from './store.js';

export const editor = ref(null);

export const format = (before, after) => {
  const el = editor.value.textarea;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const text = current.value.content || '';
  const selected = text.substring(start, end);
  const replacement = before + (selected || 'text') + (after || '');
  current.value.content = text.substring(0, start) + replacement + text.substring(end);
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 4));
  });
};

export const rendered = computed(() => marked.parse(current.value.content || ''));
