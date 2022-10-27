import { notes, activeIndex, current, newNote, selectNote, deleteNote } from './store.js';
import { editor, rendered, format } from './editor.js';
import { menuVisible, menuX, menuY, menuIndex, showMenu } from './context-menu.js';

const app = createApp({
  setup() {
    return {
      notes, activeIndex, current, rendered,
      editor, newNote, selectNote, deleteNote, format,
      menuVisible, menuX, menuY, menuIndex, showMenu,
    };
  },
});

app.use(ElementPlus);
app.mount('#app');
