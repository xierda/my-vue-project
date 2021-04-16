<template>
  <div>
    <h1>A 组件</h1>
    <button @click="() => changeColor()">改变color</button>
    <ChildrenB />
    <ChildrenC />
  </div>
</template>

<script>
import Vue from 'vue'
import ChildrenB from './provideB'
import ChildrenC from './provideC'
export default {
  components: {
    ChildrenB, ChildrenC
  },
  data() {
    return {
      color: 'blue'
    }
  },
  // provide() {
  //   return {
  //     theme: this//方法一：提供祖先组件的实例
  //   };
  // },
   // 方法二:使用2.6最新API Vue.observable 优化响应式 provide
  provide() {
    this.theme = Vue.observable({
      color: "blue"
    });
    return {
      theme: this.theme
    };
  },
  methods: {
    changeColor(color) {
      if (color) {
        this.theme.color = color;
      } else {
        this.theme.color = this.theme.color === "blue" ? "red" : "blue";
      }
    }
    //方法一：提供祖先组件的实例
    // changeColor(color) {
    //   if (color) {
    //     this.color = color;
    //   } else {
    //     this.color = this.color === "blue" ? "red" : "blue";
    //   }
    // }
  }
}
</script>

<style lang='scss' scoped>

</style>
