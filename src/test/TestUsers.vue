<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="index">{{user}}</li>
    </ul>
    <p>fData: {{fData}}</p>
    <button @click="onClick">come on</button>
  </div>
</template>

<script>
export default {
  props: {
    fData: {
      required: true,
    },
    users: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      usersText: 'child'
    }
  },
  methods: {
    onClick() {
      this.fData.a = 'fData'
      console.log(this.fData)
      this.$emit('on-click', this.usersText)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
