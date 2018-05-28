import Vuex from 'vuex';
import * as chrono from 'chrono-node';
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({ storage: window.localStorage });

export default () => {
  return new Vuex.Store({
    state: {
      todos: [
        {
          id: 0,
          label: 'Go to sleep soon :moon:',
          done: false,
          tags: ['sleep', 'home'],
          priority: 'low',
          timestamp: new Date(2018, 8, 28)
        }
      ]
    },
    mutations: {
      addTodo(state, todo) {
        state.todos.push({
          id: todo.id,
          label: todo.label,
          done: false,
          tags: todo.tags,
          priority: todo.priority,
          timestamp: todo.timestamp
        });
      },
      deleteTodos(state, fil) {
        state.todos = state.todos.filter(todo => !fil(todo));
      },
      toggleTodo(state, id) {
        console.log('Toggled id: '+id);
        const index = state.todos.findIndex(td => td.id == id);
        state.todos[index].done = !state.todos[index].done;
      }
    },
    actions: {
      addTodo(context, text) {
        const chronoData = chrono.parse(text)[0];
        chronoData && (text = text.replace(chronoData.text, ''));
        const timestamp = chronoData && chronoData.start.date();

        const allTags = text.match(/\btag:\w+\b/g);
        const tags = allTags ? allTags.map(tag => tag.replace('tag:', '').toLowerCase()) : [];
        text = text.replace(/\btag:\w+\b/g, '');

        const allPriorities = text.match(/\btag:\w+\b/g);
        const priority = allPriorities ? allPriorities.map(priority => priority.replace('priority:', '').toLowerCase()) : [];
        text = text.replace(/\bpriority:\w+\b/g, '');

        context.commit('addTodo', {
          id: `${text}-${tags}-${timestamp}`,
          label: text,
          tags,
          priority,
          timestamp
        });
      },
      deleteAllFinishedTodos: context => context.commit('deleteTodos', todo => todo.done),
      toggleTodo: (context, id) => context.commit('toggleTodo', id)
    },
    getters: {
      allTodos: state => state.todos,
      doneTodos: state => state.todos.filter(todo => !todo.done),
      doneTodosCount: state => state.todos.filter(todo => !todo.done).length,
    }
    /*plugins: [vuexLocal.plugin]*/
  });
};
