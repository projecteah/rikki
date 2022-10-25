const { createApp, ref, computed, watch } = Vue;

const app = createApp({
  setup() {
    const notes = ref(JSON.parse(localStorage.getItem('notes') || '[{"title":"","content":""}]'));
    const activeIndex = ref('0');
    const editor = ref(null);
    const menuVisible = ref(false);
    const menuX = ref(0);
    const menuY = ref(0);
    const menuIndex = ref(0);

    const current = computed(() => notes.value[parseInt(activeIndex.value)] || { title: '', content: '' });
    const rendered = computed(() => marked.parse(current.value.content || ''));

    watch(notes, (val) => localStorage.setItem('notes', JSON.stringify(val)), { deep: true });

    const newNote = () => {
      notes.value.push({ title: '', content: '' });
      activeIndex.value = String(notes.value.length - 1);
    };

    const selectNote = (i) => { activeIndex.value = i; };

    const showMenu = (e, i) => {
      menuX.value = e.clientX;
      menuY.value = e.clientY;
      menuIndex.value = i;
      menuVisible.value = true;
    };

    const deleteNote = (i) => {
      const idx = i !== undefined ? i : parseInt(activeIndex.value);
      if (notes.value.length <= 1) return;
      notes.value.splice(idx, 1);
      if (parseInt(activeIndex.value) >= notes.value.length) {
        activeIndex.value = String(notes.value.length - 1);
      }
    };

    const format = (before, after) => {
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

    document.addEventListener('click', () => { menuVisible.value = false; });

    return { notes, activeIndex, current, rendered, editor, newNote, selectNote, deleteNote, format, menuVisible, menuX, menuY, menuIndex, showMenu };
  },
});

app.use(ElementPlus);
app.mount('#app');
