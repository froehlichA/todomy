<template>
  <div>
    <h1>Welcome to TodoMy! 😉</h1>
    <div class="row">
      <div>
        <div class="card bg blue">
          <div class="icon">
            <i class="far fa-check-square fa-5x fa-fw fa-pull-left"></i>
          </div>
          <span v-if="openTodos != 0">
            <h4 class="no-margin bottom">
              You only have {{ openTodos.length }} open {{ openTodos.length != 1 ? 'tasks' : 'task' }}! 🎉
            </h4>
            <p class="no-margin top bottom">
              Your first task is '{{ firstTodoLabel }}'.
            </p>
          </span>
          <span v-else>
            <h4 class="no-margin bottom">
              You have no tasks left! 🎉
            </h4>
            <p class="no-margin top bottom">
              You can relax and lean back now. ⛱️
            </p>
          </span>
        </div>
      </div>
      <div>
        <div class="card bg green">
          <div class="icon">
            <i class="fas fa-chart-bar fa-5x fa-fw fa-pull-left"></i>
          </div>
          <h4 class="no-margin bottom">
            You have checked off {{ statsFinishedTodos }} {{ statsFinishedTodos.length != 1 ? 'tasks' : 'task' }}. 🏁
          </h4>
          <p v-if="firstTodo" class="no-margin top bottom">
            ... and added {{ statsAddedTodos }} {{ statsAddedTodos.length != 1 ? 'tasks' : 'task' }} since you joined.
          </p>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as emoji from 'node-emoji';

export default {
  computed: {
    ...mapGetters([
      'allTodos',
      'openTodos',
      'firstTodo',
      'statsFinishedTodos',
      'statsAddedTodos'
    ]),
    firstTodoLabel() {
      return emoji.emojify(this.firstTodo.label);
    }
  }
}
</script>


<style scoped>
.row {
  display: flex;
}
.row > div {
  flex-grow: 1;
  flex-basis: 0;
  padding: 10px;
}
.card {
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: 0.3s;
  padding: 10px;
  overflow-y: hidden;
}
.card.bg.blue {
  background: linear-gradient(-136deg, #3959C5, #708AAF);
  color: white;
}
.card.bg.green {
  background: linear-gradient(-68deg, #4EBE71, #07AB3D);
  color: white;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.no-margin.top {
  margin-top: 0;
}
.no-margin.bottom {
  margin-bottom: 0;
}
</style>
