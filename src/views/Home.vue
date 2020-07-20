<template>
  <div class="home">
    <div id="example">
      <p>Original message: "{{ message }}"</p>
      <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>
    <div
      class="static"
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
    >123</div>
    <div v-bind:class="classObject">321</div>
    <ul id="example-1">
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="addItem">addItem</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      message: 'Hello',
      isActive: true,
      hasError: false,
      classObject: {
        active: true,
        'text-danger': true
      },
      items: ['a', 'b', 'c']
    }
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    addItem () {
      this.items[1] = 'x'
      // this.items[0].message += 1
      // this.items.push({ message: 'Baz' })
    }
  }
}
</script>
