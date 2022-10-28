var editor = Vue.ref(null);

function format(before, after) {
  var el = editor.value.textarea;
  var start = el.selectionStart;
  var end = el.selectionEnd;
  var text = current.value.content || '';
  var selected = text.substring(start, end);
  var replacement = before + (selected || 'text') + (after || '');
  current.value.content = text.substring(0, start) + replacement + text.substring(end);
  setTimeout(function() {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + (selected ? selected.length : 4));
  });
}

var rendered = Vue.computed(function() { return marked.parse(current.value.content || ''); });
