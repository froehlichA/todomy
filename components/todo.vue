<template>
  <div class="todo container">
    <input class="checkbox" type="checkbox" :id="_uid" :checked="todo.done" />
    <label class="todo label" :for="_uid" @click="$store.dispatch('toggleTodo', todo.id)"></label>
    <div class="todo text">
      <span class="todo time">
        <span>{{ label }}</span>
        <span :class="timestampClass">{{ timestamp }}</span>
      </span>
      <p class="todo tags container">
        <span class="todo tags" v-for="(tag, index) in todo.tags" :key="getKeyForTag(tag)">
          {{ tag }}{{ index != todo.tags.length - 1 ? ', ' : '' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment';
import * as emoji from 'node-emoji';

export default {
  props: ['todo'],
  computed: {
    timestamp() {
      return this.todo.timestamp ? moment(this.todo.timestamp).fromNow() : '';
    },
    timestampClass() {
      const diff = this.getDiff();
      return {
        timestamp: true,
        danger: diff <= 0,
        warning: diff > 0 && diff <= 1,
        success: diff > 1 && diff <= 7
      };
    },
    label() {
      return emoji.emojify(this.todo.label);
    }
  },
  methods: {
    getDiff() {
      return this.todo.timestamp
        ? moment(this.todo.timestamp).diff(moment(), 'days', true)
        : false;
    },
    getKeyForTag(tag) {
      return `${this.todo.label}-${this.todo.timestamp}-${tag}`;
    }
  }
};
</script>

<style scoped>
.todo.container {
  display: block;
  position: relative;
  width: 100%;
  height: 55px;
  background: inherit;
}

.checkbox {
  display: none;
}

.todo.label {
  z-index: 15;
  position: absolute;
  left: 0px;
  top: -1px;
  bottom: 10px;
  right: 10px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 20px;
  border: 4px solid #444;
  height: 20px;
}

.todo.text {
  margin-left: 40px;
}

.checkbox:checked + label {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #2ecc71;
  border-left-color: transparent;
  transform: rotate(-50deg) translate(5px, -9px);
}

.checkbox:checked + label:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: -3px;
  height: 15px;
  width: 100%; /* or 100px */
  border-left: 4px solid #2ecc71;
}

.checkbox:checked + label + .text > .tag {
  color: grey;
}

.checkbox:checked + label + .text > .tag:after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: grey;
  animation-name: strike;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes strike {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.todo.time {
  color: inherit;
  position: relative;
}

.timestamp {
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #1a535c;
  float: right;
}
.timestamp.danger {
  text-decoration: underline;
  text-decoration-color: #ff6b6b;
}
.timestamp.warning {
  text-decoration: underline;
  text-decoration-color: #f79256;
}
.timestamp.success {
  text-decoration: underline;
  text-decoration-color: #2ecc71;
}

.todo.tags.container {
  margin: 0px;
  font-size: 12px;
  font-weight: lighter;
}

.todo.tags {
  text-transform: capitalize;
}
</style>