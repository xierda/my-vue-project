<template>
  <div class="base-panel-page">
    <header v-if="showHeader" class="base-panel-header">
      <slot name="header">
        <span @click="$emit('handle-header-left')" :class="{'pointer': headerLeftPointer}">
          <i v-if="showHeaderLeftIcon" class="show-icon theme-title iconfont" :class="`icon-${headerLeftIcon}`"/>
          <span>{{ title }}</span>
        </span>
        <span v-if="showHeaderRightIcon" @click="$emit('close-panel')" :title="headerRightTitle" class="handle-icon pointer">
          <i class="iconfont" :class="`icon-${headerRightIcon}`"/>
        </span>
      </slot>
    </header>
    <main
      :class="{
        'base-panel-content': true,
        'base-panel-content-noh': !showHeader,
        'base-panel-content-nof': !showFooter,
        'base-panel-content-noh-nof': (!showHeader && !showFooter)}">
      <el-scrollbar style="height: 100%;">
        <slot></slot>
      </el-scrollbar>
    </main>
    <footer
      v-if="showFooter"
      :class="{
        'base-panel-footer-line': showFooterLine
      }"
      :style="{
        height: footerHeight + 'px'
      }">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showFooterLine: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'title'
    },
    showHeaderLeftIcon: {
      type: Boolean,
      default: true
    },
    showHeaderRightIcon: {
      type: Boolean,
      default: true
    },
    headerLeftIcon: {
      type: String,
      default: 'data'
    },
    headerLeftPointer: {
      type: Boolean,
      default: false
    },
    headerRightIcon: {
      type: String,
      default: 'close'
    },
    headerRightTitle: {
      type: String,
      default: ''
    },
    footerHeight: {
      type: Number,
      default: 56
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.base-panel-page {
  position: absolute;
  width: 320px;
  top: 16px;
  bottom: 0;
  right: 0;
  background: #fff;
	box-shadow: 0px 4px 10px 0px rgba(107, 108, 124, 0.08);
  border-radius: 4px;
  z-index: 10;

  .base-panel-header {
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    border-bottom: 1px solid #dadbdc;
    font-size: 12px;

    .show-icon {
      margin-right: 4px;
    }

    .handle-icon {
      display: block;
      float: right;
    }
  }

  .base-panel-content {
    height: calc(100% - 96px);
    padding: 16px;

    /deep/ .el-scrollbar__view {
      height: 100%;
      overflow-x: hidden;
    }
  }
  .base-panel-content-noh, .base-panel-content-nof {
    height: calc(100% - 56px);
  }
  .base-panel-content-noh-nof {
    height: 100%;
  }

  .base-panel-footer-line {
    border-top: 1px solid #dadbdc;
  }
}
</style>
