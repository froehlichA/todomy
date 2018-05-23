<template>
  <div>
    <h1>
      You have {{ openTasks }} open {{ openTasks == 1 ? 'task' : 'tasks'}}. {{ todoEmoji }}
    </h1>
    <select class="selectTag" v-model="selectedTag">
      <option
        v-for="tag in availableTags"
        :key="tag"
        :value="tag"
      >{{ tag }}</option>
    </select>
    <small-action></small-action>
    <div class="todoContainer">
      <new-todo></new-todo>
      <transition-group name="fade">
        <todo
          v-for="todo in todos"
          :todo="todo"
          :key="getKeyForTodo(todo)"
        ></todo>
      </transition-group>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  data: () => ({
    selectedTag: 'ALL'
  }),
  computed: {
    todos: function() {
      let todos = this.$store.state.todos;
      if (this.selectedTag != 'ALL') {
        todos = this.$store.state.todos.filter(
          todo => (todo.tags ? todo.tags.includes(this.selectedTag) : false)
        );
      }
      todos.sort((a, b) => {
        if(!a.timestamp) return 1;
        if(!b.timestamp) return -1;
        return moment(a.timestamp).diff(moment()) - moment(b.timestamp).diff(moment());
      });
      return todos;
    },
    availableTags: function() {
      let tags = ['ALL'];
      this.$store.state.todos.forEach(todo => {
        if (todo.tags) {
          todo.tags.forEach(tag => {
            if(!tags.includes(tag)) tags.push(tag);
          });
        }
      });
      return tags;
    },
    openTasks: function() {
      return this.$store.state.todos.filter(todo => !todo.done).length;
    },
    todoEmoji: function() {
      const openTasks = this.openTasks;
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
  },
  methods: {
    getKeyForTodo(todo) {
      return `${todo.label}-${todo.timestamp}`;
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

