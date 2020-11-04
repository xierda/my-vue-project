<template>
  <el-pagination
    :class="{'small-class': small}"
    :small="small"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :pager-count="pagerCount"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :layout="layout"
    :total="total">
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [20, 50, 100, 200]
      }
    },
    small: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pagerCount: this.small ? 3 : 7,
      layout: this.small ? 'total, sizes, prev, pager, next' : 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('current-change', val)
    }
  }
}
</script>

<style lang='scss' scoped>
.small-class {
  text-align: center;
  padding-top: 8px !important;

  /deep/ .el-input--mini .el-input__inner {
    height: 24px;
    line-height: 24px;
  }
}
</style>
