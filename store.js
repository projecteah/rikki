var notes = Vue.ref(JSON.parse(localStorage.getItem('notes') || '[{"title":"","content":""}]'));
var activeIndex = Vue.ref('0');
var current = Vue.computed(function() { return notes.value[parseInt(activeIndex.value)] || { title: '', content: '' }; });

Vue.watch(notes, function(val) { localStorage.setItem('notes', JSON.stringify(val)); }, { deep: true });

function newNote() {
  notes.value.push({ title: '', content: '' });
  activeIndex.value = String(notes.value.length - 1);
}

function selectNote(i) { activeIndex.value = i; }

function deleteNote(i) {
  var idx = i !== undefined ? i : parseInt(activeIndex.value);
  if (notes.value.length <= 1) return;
  notes.value.splice(idx, 1);
  if (parseInt(activeIndex.value) >= notes.value.length) {
    activeIndex.value = String(notes.value.length - 1);
  }
}
