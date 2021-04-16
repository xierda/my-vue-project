<template>
  <div>
    <h3>B组件：{{age}}</h3>
    <h3>B组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      age: '20'
    }
  },
  mounted() {
    this.GlobalEvent.$on('data-a', data => {
      this.name = data
    })
  },
  methods: {
    send() {
      this.GlobalEvent.$emit('data-b', this.age)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
