<template>
    <div class='check-container'>
      <input type='checkbox' :id='_uid' :checked="todo.done" @click="$store.commit('toggleDone', todo.id)"/>
      <label :for='_uid'></label>
      <div class="text">
        <span class='tag'>
          {{ label }}&nbsp;&nbsp;&nbsp;<span :class="timestampClass">{{ timestamp }}</span>
        </span>
        <p class="subtag">
          <span class="tags" v-for="(tag, index) in todo.tags" :key="getKeyForTag(tag)">
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
    timestamp: function() {
      if (this.todo.timestamp) {
        return moment(this.todo.timestamp).fromNow();
      } else return '';
    },
    timestampClass: function() {
      return {
        timestamp: true,
        danger: this.getDiff() <= 0,
        success: this.getDiff() > 0 && this.getDiff() <= 1,
        warning: this.getDiff() > 1 && this.getDiff() <= 7
      };
    },
    label: function() {
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
.tag.low {
  font-style: italic;
}
.tag.high {
  font-weight: bold;
}
.timestamp {
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #1a535c;
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
.tags {
  text-transform: capitalize;
}

input[type='checkbox'] {
  display: none;
}

.check-container {
  display: block;
  position: relative;
  width: 100%;
  height: 55px;
}

input[type='checkbox'] + label {
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

.text {
  margin-left: 40px;
}

.tag {
  color: inherit;
  position: relative;
}

.subtag {
  margin: 0px;
  font-size: 12px;
  font-weight: lighter;
}

input[type='checkbox']:checked + label {
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

input[type='checkbox']:checked + label:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: -3px;
  height: 15px;
  width: 100%; /* or 100px */
  border-left: 4px solid #2ecc71;
}

@keyframes strike {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

input[type='checkbox']:checked + label + .text > .tag {
  color: grey;
}

input[type='checkbox']:checked + label + .text > .tag:after {
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
</style>

