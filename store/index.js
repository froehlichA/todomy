import Vuex from 'vuex';
import * as chrono from 'chrono-node';
import VuexPersistence from 'vuex-persist';
import * as moment from 'moment';
import * as emoji from 'node-emoji';

const vuexLocal = new VuexPersistence({ storage: window.localStorage });

export default () => {
  return new Vuex.Store({
    state: {
      todos: [
        {
          id: 0,
          label: 'Write some more tasks :white_check_mark:',
          done: false,
          tags: ['tasks', 'writing'],
          timestamp: new Date()
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
          timestamp: todo.timestamp
        });
      },
      deleteTodos(state, fil) {
        state.todos = state.todos.filter(todo => !fil(todo));
      },
      toggleTodo(state, id) {
        const index = state.todos.findIndex(td => td.id == id);
        state.todos[index].done = !state.todos[index].done;
      },
      sortBy(state, fn) {
        state.todos = state.todos.sort(fn);
      }
    },
    actions: {
      addTodo(context, text) {
        const chronoData = chrono.parse(text)[0];
        chronoData && (text = text.replace(chronoData.text, ''));
        const timestamp = chronoData && chronoData.start.date();

        const allTags = text.match(/\btag:\w+\b/g);
        const tags = allTags
          ? allTags.map(tag => tag.replace('tag:', '').toLowerCase())
          : [];
        text = text.replace(/\btag:\w+\b/g, '');

        const todo = {
          id: `${text}-${tags}-${timestamp}`,
          label: text.trim(),
          tags,
          timestamp
        };
        console.log(todo);
        context.commit('addTodo', todo);
      },
      toggleTodo: (context, id) => context.commit('toggleTodo', id),
      deleteAllFinishedTodos: context =>
        context.commit('deleteTodos', todo => todo.done),
      sortByFinished: context => context.commit('sortBy', (a, b) => {
        return +a.done - +b.done;
      }),
      sortByDate: context => context.commit('sortBy', (a, b) => {
        if(!a.timestamp) return 1;
        if(!b.timestamp) return -1;
        return moment(a.timestamp).diff(moment()) - moment(b.timestamp).diff(moment());
      })
    },
    getters: {
      allTodos: state => state.todos,
      doneTodos: state => state.todos.filter(todo => todo.done),
      openTodos: state => state.todos.filter(todo => !todo.done),
      allTodosOnDay: state => day =>
        state.todos
          .filter(todo => todo.timestamp)
          .filter(todo => moment(day).isSame(todo.timestamp, 'day')),
      allTodosInNextMonth: state => 
        state.todos
          .filter(todo => todo.timestamp)
          .filter(todo => moment().isSame(todo.timestamp, 'month')),
      allTodosInCalendarFormat: (state, getters) =>
        getters.allTodos.filter(todo => todo.timestamp).map(todo => ({
          key: todo.id,
          highlight: {
            backgroundColor: '#4ecdc4'
          },
          contentStyle: {
            color: '#fafafa',
            fontWeight: 'bold'
          },
          popover: {
            label: emoji.emojify(todo.label)
          },
          dates: todo.timestamp
        }))
    },
    plugins: [vuexLocal.plugin]
  });
};
