<template>
  <div class="todo list">
    <todo-add v-if="withTodoAdd"></todo-add>
    <transition-group name="fade" mode="in-out">
      <todo
        v-if="todos.length != 0"
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
      ></todo>
    </transition-group>
    <p v-if="todos.length == 0" class="todo empty">No todos left :)</p>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  props: ['withTodoAdd', 'todos']
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