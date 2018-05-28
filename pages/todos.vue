<template>
  <div>
    <h1>
      You have {{ this.doneTodosCount }} open {{ this.doneTodosCount == 1 ? 'task' : 'tasks'}}. {{ todoEmoji }}
    </h1>
    <text-action
      label="Delete finished tasks" onClick="deleteAllFinishedTodos"
    ></text-action>
    <todo-list withTodoAdd="true" :todos="$store.getters.allTodos"></todo-list>
  </div>
</template>

<script>
import * as moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    selectedTag: 'ALL'
  }),
  computed: {
    ...mapGetters([
      'doneTodosCount'
    ]),
    todoEmoji: function() {
      const openTasks = this.doneTodosCount;
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

