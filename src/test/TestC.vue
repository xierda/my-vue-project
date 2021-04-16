<template>
  <div>
    <h3>C组件：{{name}}-{{age}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      age: ''
    }
  },
  mounted() {
    this.GlobalEvent.$on('data-a', name => {
      this.name = name
    })
    this.GlobalEvent.$on('data-b', age => {
      this.age = age
    })
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>

</style>
