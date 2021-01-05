<template>
  <ul class="tool-wrap">
    <li
      class="pointer tool-item"
      :class="{ 'active' : activeId === tool.id }"
      v-for="tool in tools"
      :key="tool.id"
      @click="handleTooles(tool)"
    >
      <i class="iconfont" :class="tool.icon"></i>
      <span>{{ tool.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      activeId: '',
      tools: [
        {
          id: 'lk',
          name: '路况',
          icon: 'icon-lukuang'
        }, {
          id: 'xd',
          name: '选点',
          icon: 'icon-xuandian'
        }, {
          id: 'cj',
          name: '测距',
          icon: 'icon-ceju'
        }, {
          id: 'cm',
          name: '测面',
          icon: 'icon-cemian'
        }, {
          id: 'qt',
          name: '清图',
          icon: 'icon-biaohui'
        }
      ]
    }
  },
  methods: {
    handleTooles (item) {
      if (item.id === 'qt') {
        this.activeId = ''
        this.$emit('handle-tooles', 'qt')
        return
      }
      if (item.id === this.activeId) {
        this.activeId = ''
      } else {
        this.activeId = item.id
      }
      this.$emit('handle-tooles', this.activeId)
    }
  }
}
</script>

<style lang='scss' scoped>
.tool-wrap {
  padding: 8px 0;
  background: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(15, 21, 53, 0.22);

  .tool-item {
    float: left;
    padding: 0 12px;
    font-size: 12px;
    border-left: 1px #dbdee2 dashed;
    vertical-align: middle;
    color: #5f6477;

    &:first-child {
      border: none;
    }

  }
  .active {
    color: red;
  }

  .iconfont {
    margin-right: 8px;
  }
}
</style>
