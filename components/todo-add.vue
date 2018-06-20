<template>
  <div class="add-todo-button" @click="editMode = true">
    <div class="add-todo">
      <i class="add-todo-icon fas fa-plus" />
    </div>
    <span v-if="!editMode" class="add-todo-tag"><b>New Task</b></span>
    <input v-else class="add-todo-input" v-model="label" @keyup.enter="submitTask()"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    editMode: false,
    label: ''
  }),
  methods: {
    ...mapActions([
      'addTodo'
    ]),
    submitTask() {
      if (this.label !== '') {
        this.addTodo(this.label);
        this.label = '';
      }
      this.editMode = false;
    }
  }
};
</script>

<style scoped>
.add-todo-button {
  cursor: pointer;
  height: 50px;
}

.add-todo {
  display: inline-block;
  width: 28px;
  height: 28px;
  background-color: #1a535c;
  border-radius: 1px;
  color: #f7fff7;
  line-height: 28px;
  text-align: center;
}
.add-todo:hover {
  background-color: #0f2f34;
}
.add-todo:active {
  background-color: #133b42;
}
.add-todo-tag {
  margin-left: 10px;
  color: #1a535c;
}
.add-todo-tag:hover {
  color: #0f2f34;
}
.add-todo-tag:active {
  color: #133b42;
}
.add-todo-input {
  margin-left: 12px;
  border: 2px solid #1a535c;
  font-size: 16px;
  width: calc(100% - 46px);
}
</style>