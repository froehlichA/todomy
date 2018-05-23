<template>
  <small>
    <span class="action color-red" @click="$store.commit('deleteAllDone')">Delete finished tasks</span>
  </small>
</template>

<script>
export default {

}
</script>

<style scoped>
.action {
  text-decoration: underline;
  cursor: pointer;
}
.color-red {
  color: #ff6b6b;
}
.color-green {
  color: #2ecc71;
}
.action:not(:last-child) {
  margin-right: 20px;
}
</style>
