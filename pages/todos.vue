<template>
  <div>
    <h1>
      You have {{ this.openTodos.length }} open {{ this.openTodos.length == 1 ? 'task' : 'tasks'}}. {{ todoEmoji }}
    </h1>
    <text-action
      label="Sort by Date"
      onClick="sortByDate"
    ></text-action>
    <text-action
      label="Sort by Status"
      onClick="sortByFinished"
    ></text-action>
    <text-action
      v-if="doneTodos.length >= 1"
      label="Delete finished tasks"
      onClick="deleteAllFinishedTodos"
    ></text-action>
    <todo-list withTodoAdd="true" :todos="allTodos"></todo-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'allTodos',
      'openTodos',
      'doneTodos'
    ]),
    todoEmoji: function() {
      const openTasks = this.openTodos.length;
      switch (true) {
        case openTasks == 0:
          return '😍';
        case openTasks < 5:
          return '🤩';
        case openTasks < 10:
          return '😄';
        case openTasks < 20:
          return '😉';
        case openTasks < 40:
          return '🤔';
        default:
          return '😇';
      }
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 0px;
}
.todoContainer {
  margin-top: 20px;
}
.selectTag {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: 4px solid #444;
  background: inherit;
  min-width: 80px;
  height: 28px;
  margin-right: 20px;
}
.selectTag::-ms-expand {
  display: none;
}
.selectTag::before {
  font-family: fontello;
  content: "\f107";
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 10px;
  color: black;
}
.selectTag:hover {
  background-color: lightgrey;
}
</style>

