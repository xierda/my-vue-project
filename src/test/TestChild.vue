<template>
  <div>
    <input type="text" v-model="childValue" @focus="onFocus">
    <input type="text" v-model="childValue2" @focus="onFocus">
  </div>
</template>

<script>
export default {
  props: [
    'childValue',
    'childValue2',
  ],
  data() {
    return {
      newTitle: 'newTitle',
      newTitle2: 'newTitle2',
    }
  },
  methods: {
    onFocus() {
      this.$emit('update:childValue', this.newTitle)
      this.$emit('update:childValue2', this.newTitle2)
    },
  },
}
</script>

<style lang='scss' scoped>

</style>
