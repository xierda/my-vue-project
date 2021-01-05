<template>
  <el-container class="index-page" style="height:100%;">
    <el-header height="56px">
      <TheHeader/>
    </el-header>
    <el-container class="content-wrap">
      <el-aside :width="collapseState ? '65px' : '15%'">
        <TheAside @switchMenu="switchMenu"/>
      </el-aside>
      <el-main class="main-class">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheAside from '@/components/TheAside'
export default {
  components: {
    TheHeader,
    TheAside
  },
  data () {
    return {
      collapseState: undefined
    }
  },
  methods: {
    switchMenu (e) {
      this.collapseState = e
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/variables.scss';
.index-page {
  .content-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .main-class {
    position: relative;
    background-color: $bgColor;
    overflow: hidden;
  }
}
</style>
