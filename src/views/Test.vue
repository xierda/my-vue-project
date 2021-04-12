<template>
  <div class="test-wrap">
    <!-- 自定义指令 -->
    <!-- <input v-focus type="text">
    <div id="baseexample">
      <p>Scroll down the page</p>
      <p v-pin="100">Stick me 100px from the top of the page</p>
    </div> -->
    <!-- 事件修饰符 -->
    <div v-on:scroll.passive="onScroll">...</div>
    <!-- <div class="normal" @click.once="outClick">Once</div> -->
    <!-- <a @click.prevent="doThat" href="http://www.baidu.com">百度一下</a> -->
    <!-- <div class="outDiv" @click.self="outClick">
      outDiv
      <div class="innerDiv" @click="innerClick">innerDiv</div>
    </div> -->
    <!-- <div class="outDiv" @click.capture="outClick">
      outDiv
      <div class="innerDiv" @click="innerClick">innerDiv</div>
    </div> -->
    <!-- <div class="outDiv" @click="outClick">
      outDiv
      <div class="innerDiv" @click.stop="innerClick">innerDiv</div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    },
    pin: {
      inserted: function (el, binding) {
        el.style.position = 'fixed'
        el.style.top = binding.value + 'px'
      }
    }
  },
  methods: {
    outClick() {
      console.log('outDiv')
    },
    innerClick() {
      console.log('innerDiv')
    },
    onSubmit() {
      console.log('submit')
    },
    doThat() {
      console.log('doThat')
    }
  }
}
</script>

<style lang='scss' scoped>
.test-wrap {
  padding: 20px;
}
#baseexample {
  height: 200px;
}
</style>
