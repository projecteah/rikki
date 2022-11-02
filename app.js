var isDark = ref(localStorage.getItem('rikki-dark') === 'true');

function toggleDark(val) {
  document.documentElement.classList.toggle('dark', val);
  localStorage.setItem('rikki-dark', val);
}

if (isDark.value) {
  document.documentElement.classList.add('dark');
}

function onContextCommand(cmd, i) {
  if (cmd === 'delete') deleteNote(i);
}

var app = Vue.createApp({
  setup() {
    return {
      notes: notes,
      activeIndex: activeIndex,
      current: current,
      rendered: rendered,
      editor: editor,
      newNote: newNote,
      selectNote: selectNote,
      deleteNote: deleteNote,
      format: format,
      isDark: isDark,
      toggleDark: toggleDark,
      onContextCommand: onContextCommand,
    };
  },
});

app.use(ElementPlus);
app.mount('#app');
