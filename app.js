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
      onContextCommand: onContextCommand,
    };
  },
});

app.use(ElementPlus);
app.mount('#app');
