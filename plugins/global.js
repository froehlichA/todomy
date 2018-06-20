import Vue from 'vue';

import Todo from '../components/todo.vue';
import TodoAdd from '../components/todo-add.vue';
import TodoList from '../components/todo-list.vue';

import TextAction from '../components/text-action.vue';

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.component('todo', Todo);
Vue.component('todo-add', TodoAdd);
Vue.component('todo-list', TodoList);
Vue.component('text-action', TextAction);
Vue.use(VCalendar, {
  firstDayOfWeek: 2
});

require('../js/fontawesome.js');