<template>
  <el-cascader
    :value="value"
    :options="options"
    @change="handleChange"
    :props="props"
    :show-all-levels="showAllLevels"
    filterable
    :clearable="clearable"
    :disabled="disabled"
    placeholder="请选择行政区划">
  </el-cascader>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    showAllLevels: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    props: {
      type: Object,
      default: function () {
        return {
          value: 'code',
          label: 'name',
          children: 'childXzqhs',
          checkStrictly: true,
          emitPath: false
        }
      }
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('handle-change', value)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
