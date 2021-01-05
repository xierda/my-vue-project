<template>
  <div class="header-page">
    <el-row class="header-layout" type="flex" justify="space-between">
      <el-col :span="8" class="header-left">
        <svg-icon class="app-logo" icon-class="logo"/>
        <h1 class="header-title">{{ website.title }}</h1>
      </el-col>

      <el-col :span="16" class="header-right">
        <!-- <TheHeaderNav/> -->
        <!-- <el-badge class="header-message" :value="2">
          <svg-icon icon-class="message"/>
        </el-badge> -->
        <!-- <span class="xinxikanban pointer">
          <svg-icon icon-class="xinxikanban"/>
        </span> -->
        <span @click="handleHf" class="huanfu pointer" :class="{'active': hfState}">
          <svg-icon icon-class="huanfu"/>
          <!-- <i class="iconfont icon-huanfu"></i> -->
        </span>
        <!-- <div class="header-avatar">
          <el-avatar :size="32">
            <img src="../../../assets/tocc/avatar.png" alt="用户头像" srcset="">
          </el-avatar>
        </div> -->
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userinfo.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
            <el-dropdown-item command="退出">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <transition name="fade-transform">
      <!-- <header-hf v-show="hfState" @closeHfState="hfState = false"></header-hf> -->
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getLocalStorage } from '@/utils'
import { cacheNameData } from '@/cache'
import config from "@/config"
// import TheHeaderNav from './TheHeaderNav'
// import HeaderHf from './header-hf'

export default {
  components: {
    // TheHeaderNav,
    // HeaderHf
  },
  data() {
    return {
      config,
      hfState: false,
      userinfo: {}
    };
  },
  computed: {
    ...mapGetters(['website'])
  },
  created () {
    this.userinfo = getLocalStorage(cacheNameData.userInfo) || {}
  },
  methods: {
    handleHf() {
      this.hfState = !this.hfState
    },
    handleCommand(command) {
      if (command === '退出') {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: '/login' })
        })
        return
      }
      if (command === '个人中心') {
        this.$router.push({ path: '/user/infor' })
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/styles/variables.scss";
.header-page {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: $mainColor;
  color: $mainTextColor;

  .header-left {
    display: flex;
    align-items: center;
  }

  .app-logo {
    height: 2em;
    width: 2em;
  }

  .header-layout {
    height: 100%;
  }

  .header-title {
    margin: 0 0 0 8px;
    line-height: $headerHeight;
    font-size: 18px;
    font-weight: bold;
  }

  .header-right {
    height: 100%;
    text-align: right;
    line-height: $headerHeight;

    .header-message {
      font-size: 20px;
      margin-right: 40px;

      /deep/ .is-fixed {
        top: 15px !important;
      }
    }

    .xinxikanban, .huanfu {
      display: inline-block;
      width: 40px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      margin-right: 16px;

      .svg-icon {
        width: 16px;
        height: 16px;
      }

      // &:hover {
      //   background: $activeMainColor;
      // }
    }
    
    // .active {
    //   background: $activeMainColor;
    //   border-bottom: 3px solid $activeBottomColor;
    // }

    .header-avatar {
      display: inline-block;
      height: 100%;
      margin-right: 16px;

      .el-avatar {
        vertical-align: middle;
      }
    }

    .el-dropdown-link {
      cursor: pointer;
      color: $mainTextColor;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }

  }
}
</style>
