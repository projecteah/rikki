import { ref, computed, watch } from Vue;

export const notes = ref(JSON.parse(localStorage.getItem('notes') || '[{"title":"","content":""}]'));
export const activeIndex = ref('0');
export const current = computed(() => notes.value[parseInt(activeIndex.value)] || { title: '', content: '' });

watch(notes, (val) => localStorage.setItem('notes', JSON.stringify(val)), { deep: true });

export const newNote = () => {
  notes.value.push({ title: '', content: '' });
  activeIndex.value = String(notes.value.length - 1);
};

export const selectNote = (i) => { activeIndex.value = i; };

export const deleteNote = (i) => {
  const idx = i !== undefined ? i : parseInt(activeIndex.value);
  if (notes.value.length <= 1) return;
  notes.value.splice(idx, 1);
  if (parseInt(activeIndex.value) >= notes.value.length) {
    activeIndex.value = String(notes.value.length - 1);
  }
};
