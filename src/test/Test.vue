<template>
  <div class="test-wrap">

    <!-- 自定义指令 -->
    <div style="marginBottom: 50px;">
      <button v-has="'add'">增加</button>
      <button v-has="'edit'">编辑</button>
      <button v-has="'delete'">删除</button>
    </div>
    <!-- <input v-focus type="text">
    <div id="baseexample">
      <p>Scroll down the page</p>
      <p v-pin="100">Stick me 100px from the top of the page</p>
    </div> -->

    <!-- 事件修饰符 -->
    <!-- <div v-on:scroll.passive="onScroll">...</div> -->
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

    <!-- 组件.sync修饰符 -->
    <TestChild :childValue="childValue" :childValue2="childValue2" @update:childValue="childValue = $event"/>
    <TestChild :childValue.sync="childValue" :childValue2.sync="childValue2"/>
    <TestChild v-bind.sync="obj"/>

    <!-- 组件传值 -->
    <TestUsers style="marginTop:20px;" :fData="sonProps" :users="users" @on-click="onUserClick"/>
    <p>子组件的值：{{usersText}}</p>

    <!-- <p>{{provideTest}}</p> -->

    <TestA style="marginTop:20px;"/>
    <TestB style="marginTop:20px;"/>
    <TestC/>

    <child-com1
      style="marginTop:20px;"
      :foo="foo"
      :boo="boo"
      :coo="coo"
      :doo="doo"
      title="前端工匠"
      @handleTest="handleTest"
    ></child-com1>
  </div>
</template>

<script>
const childCom1 = () => import("./childCom1.vue");
import TestChild from './TestChild'
import TestUsers from './TestUsers'
import TestA from './TestA'
import TestB from './TestB'
import TestC from './TestC'
import has from '@/directive/has.js'
export default {
  components: {
    TestChild,
    TestUsers,
    TestA,
    TestB,
    TestC,
    childCom1,
  },
  data() {
    return {
      sonProps: {
        a: 1,
        b: 2
      },
      foo: "Javascript",
      boo: "Html",
      coo: "CSS",
      doo: "Vue",
      childValue: 'childValue',
      childValue2: 'childValue2',
      obj: {
        childValue: 'childValue',
        childValue2: 'childValue2',
      },
      users: [
        'lxq', 'lqe'
      ],
      usersText: ''
    }
  },
  provide: {
    provideTest: 'pretty'
  },
  directives: {
    has,
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
    handleTest() {
      console.log(1)
    },
    onUserClick(e) {
      console.log(this.sonProps)
      this.usersText = e
    },
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
