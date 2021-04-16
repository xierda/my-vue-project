<template>
  <div>
    <h3>A组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
    <!-- <p style="marginTop:20px;">A组件：{{provideTest}}</p> -->
    <TestAA style="marginTop:20px;"/>
  </div>
</template>

<script>
import TestAA from './TestAA'
export default {
  components: {
    TestAA,
  },
  data() {
    return {
      name: 'tom'
    }
  },
  // inject: ['provideTest'],
  created() {
    // console.log(this.provideTest)
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
