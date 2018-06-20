<template>
  <div>
    <h1>You have {{ allTodosInNextMonth.length }} {{ allTodosInNextMonth.length == 1 ? 'task' : 'tasks'}} in the next month. 👏</h1>
    <div class="flexbox">
      <v-calendar v-if="processBrowser" class="calendar" :attributes="allTodosInCalendarFormat" @dayclick="loadTodosAtDay"></v-calendar>
      <div class="todos">
        <h2 class="small title">Todos on {{ formattedDay }}</h2>
        <todo-list :todos="todos"></todo-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as moment from 'moment';

export default {
  data: () => ({
    day: Date.now(),
    todos: []
  }),
  created() {
    this.loadTodosAtDay({ date: Date.now() });
  },
  computed: {
    ...mapGetters([
      'allTodosInCalendarFormat',
      'allTodosOnDay',
      'allTodosInNextMonth'
    ]),
    formattedDay() {
      return moment(this.day).format('MMMM Do');
    },
    processBrowser() {
      return !!process.browser;
    }
  },
  methods: {
    loadTodosAtDay(day) {
      this.todos = this.allTodosOnDay(day.date);
      this.day = day.date;
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
  padding: 0px 15px;
  width: 100%;
}

.empty {
  color: grey
}
</style>
