<template>
  <div>
    <h3>AA组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
    <p style="marginTop:20px;">AA组件：{{provideTest}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'tom'
    }
  },
  inject: ['provideTest'],
  created() {
    console.log(this.provideTest)
  },
  methods: {
    send() {
      this.GlobalEvent.$emit('data-a', this.name)
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
