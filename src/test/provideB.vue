<template>
  <div>
    <h2>B 组件</h2>
    <provideD/>
    <provideE/>
  </div>
</template>

<script>
import provideD from './provideD'
import provideE from './provideE'
export default {
  components: {
    provideD,
    provideE
  },
  data() {
    return {
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
