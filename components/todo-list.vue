<template>
  <div class="todo list">
    <todo-add v-if="withTodoAdd"></todo-add>
    <transition-group name="fade" mode="in-out">
      <todo
        v-if="sortedTodos.length != 0"
        v-for="todo in sortedTodos"
        :todo="todo"
        :key="todo.id"
      ></todo>
    </transition-group>
    <p v-if="sortedTodos.length == 0" class="todo empty">No todos left :)</p>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  props: ['withTodoAdd', 'todos'],
  computed: {
    sortedTodos() {
      return this.todos;
      /*return this.todos.sort((a, b) => {
        if(!a.timestamp) return 1;
        if(!b.timestamp) return -1;
        return moment(a.timestamp).diff(moment()) - moment(b.timestamp).diff(moment());
      });*/
    }
  }
};
</script>

<style scoped>
.todo.empty {
  color: grey;
  margin-top: 0;
  margin-bottom: 0;
}
.todo.list {
  margin-top: 20px;
}
</style>