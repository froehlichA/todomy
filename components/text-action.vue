<template>
  <small>
    <span class="action color red" @click="$store.dispatch(onClick)">{{ label }}</span>
  </small>
</template>

<script>
export default {
  props: ['label', 'onClick']
}
</script>

<style scoped>
.action {
  text-decoration: underline;
  cursor: pointer;
  margin-right: 20px;
  user-select: none;
}
.color.red {
  color: #ff6b6b;
}
.color.red:hover {
  color: #ff3838;
}
.color.red:active {
  color: #ff9e9e;
}
</style>
