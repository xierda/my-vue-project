<template>
  <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange"
    :props="props"
    :show-all-levels="false"
    filterable
    clearable
    placeholder="">
  </el-cascader>
</template>

<script>
// import { getAllXzqhOptions } from '@/cache'
import { getAllXzqhOptions2 } from '@/cache'
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    // options: {
    //   type: Array,
    //   default: []
    // },
    props: {
      type: Object,
      default () {
        return {
          // value: 'id',
          // label: 'text',
          value: 'code',
          label: 'countyname',
          children: 'children',
          checkStrictly: true,
          emitPath: false
        }
      }
    }
  },
  data () {
    return {
      options: []
    }
  },
  async created() {
    // this.options = await getAllXzqhOptions()
    this.options = await getAllXzqhOptions2()
  },
  methods: {
    handleChange (value) {
      this.$emit('handleChange', value)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
