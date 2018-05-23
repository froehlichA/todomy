import Vuex from 'vuex';
import * as chrono from 'chrono-node';
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({ storage: window.localStorage });

export default () => {
  return new Vuex.Store({
    state: {
      todos: [
        {
          id: 1,
          label: 'Add some tasks :smile:',
          done: false
        }
      ]
    },
    mutations: {
      addTodo(state, text) {
        const chronoData = chrono.parse(text)[0];
        if (chronoData) text = text.replace(chronoData.text, '');

        const tags = parseTags(text);
        text = replaceTags(text);
        const priority = parsePriority(text);
        text = replacePriority(text);

        state.todos.push({
          id: `${text}-${tags}-${
            chronoData ? chronoData.start.date() : 'no-chrono'
          }`,
          label: text,
          done: false,
          tags: tags,
          priority: priority,
          timestamp: chronoData && chronoData.start.date()
        });
      },
      toggleDone(state, id) {
        const index = state.todos.findIndex(td => td.id == id);
        state.todos[index].done = !state.todos[index].done;
      },
      deleteAllDone(state) {
        console.log('Delete all done.');
        state.todos = state.todos.filter(todo => !todo.done);
      }
    },
    plugins: [vuexLocal.plugin]
  });
};

function parseTags(text) {
  return text.includes('tag:')
    ? text
        .match(/\btag:\w+\b/g)
        .map(tag => tag.replace('tag:', '').toLowerCase())
    : [];
}

function replaceTags(text) {
  return text.replace(/\btag:\w+\b/g, '');
}

function parsePriority(text) {
  return text.includes('priority:')
    ? text
        .match(/\bpriority:\w+\b/g)
        .map(tag => tag.replace('priority:', '').toLowerCase())[0]
    : 'normal';
}

function replacePriority(text) {
  return text.replace(/\bpriority:\w+\b/g, '');
}
