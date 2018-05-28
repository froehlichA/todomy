<template>
  <div>
    <h1>You have {{ tasksInNextMonth }} tasks in the next month. 👏</h1>
    <div class="flexbox">
      <v-calendar class="calendar" :attributes="calendarTodos" @dayclick="loadTodosAtDay"></v-calendar>
      <div class="todos">
        <h2 class="small title">Todos that day</h2>
        <todo-list :todos="todos"></todo-list>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment';
import * as emoji from 'node-emoji';

export default {
  data: () => ({
    todos: []
  }),
  created() {
    this.loadTodosAtDay({ date: Date.now() });
  },
  computed: {
    calendarTodos() {
      return this.$store.state.todos.map(todo => ({
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
        dates: moment(todo.timestamp).toDate()
      }));
    },
    tasksInNextMonth() {
      return this.$store.state.todos.filter(todo => {
        if (todo.timestamp) {
          const difference = moment(todo.timestamp).diff(
            moment(),
            'days',
            true
          );
          return difference < 30;
        } else return false;
      }).length;
    }
  },
  methods: {
    loadTodosAtDay(day) {
      this.todos = this.$store.getters.allTodos.filter(todo => {
        const dayTodo = moment(todo.timestamp).format("YYYY-MM-DD");
        const dayCalendar = moment(day.date).format("YYYY-MM-DD");
        return dayTodo == dayCalendar;
      });
    }
  }
};
</script>

<style scoped>
.flexbox {
  display: flex;
}
.todos {
  margin-left: 40px;
  border: 1px solid rgb(218, 218, 218);
  background-color: rgb(250, 250, 250);
  padding: 0px 15px;
  width: 100%;
}

.empty {
  color: grey
}
</style>
