import Vue from 'vue';
import Todo from '../components/todo.vue';
import NewTodo from '../components/new-todo.vue';
import SmallAction from '../components/small-action.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.component('todo', Todo);
Vue.component('new-todo', NewTodo);
Vue.component('small-action', SmallAction);
Vue.use(VCalendar, {
  firstDayOfWeek: 2
});