<template>
  <div>
    <h3 :style="{ color: this.theme.color }">D 组件</h3>
  </div>
</template>

<script>
export default {
  inject: {
    theme: {
      //函数式组件取值不一样
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
