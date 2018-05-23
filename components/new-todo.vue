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
export default {
  data: () => ({
    editMode: false,
    label: ''
  }),
  methods: {
    submitTask() {
      if(this.label !== '') {
        this.$store.commit('addTodo', this.label);
        this.label = '';
      }
      this.editMode = false;
    }
  }
}
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
    color: #f7fff7;
    line-height: 28px;
    text-align: center;
  }
  .add-todo-tag {
    margin-left: 10px;
    color: #1a535c;
  }
  .add-todo-input {
    margin-left: 12px;
    border: 2px solid #1a535c;
    font-size: 16px;
    width: 50%;
  }
</style>