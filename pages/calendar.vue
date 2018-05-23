<template>
  <div>
    <h1>You have {{ tasksInNextMonth }} tasks in the next month. 👏</h1>
    <div class="flexbox">
      <v-calendar class="calendar" :attributes="calendarTodos" @dayclick="loadTodosAtDay"></v-calendar>
      <div class="todos">
        <h2 class="small title">Todos that day</h2>
        <small-action></small-action>
        <div class="todo-container">
          <transition-group name="fade">
            <todo
              v-for="todo in todos"
              :todo="todo"
              :key="getKeyForTodo(todo)"
            ></todo>
          </transition-group>
          <p v-if="todos.length == 0" class="empty">Nothing to do here :)</p>
        </div>
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
  methods: {
    loadTodosAtDay(day) {
      this.todos = this.$store.state.todos.filter(todo => {
        const dayTodo = moment(todo.timestamp).format("YYYY-MM-DD");
        const dayCalendar = moment(day.date).format("YYYY-MM-DD");
        return dayTodo == dayCalendar;
      });
    },
    getKeyForTodo(todo) {
      return `${todo.label}-${todo.timestamp}`;
    }
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
  }
};
</script>

<style scoped>
.todo-container {
  margin-top: 20px;
}
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
.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
  max-height: 230px;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  max-height: 0px;
}
.fade-list-move {
  transition: transform 1s;
}
.small.title {
  margin-top: 5px;
  margin-bottom: 5px;
}
.empty {
  color: grey
}
</style>
