<template>
  <div class="swapper">
    <div class="index-nav header-page">
      <div class="logo">
        <svg-icon class="app-logo" icon-class="logo"/>
        <span>{{ config.title }}</span>
      </div>
    </div>
    <div class="content">
      <div class="infor">
        <div class="main">
          <div class="left">
            <div
              class="item"
              :class="{ 
                active: isActive === 'infor',
                'theme-title': isActive === 'infor'
              }"
              @click="chooseItem('infor')"
            >
              <span class="icon"></span>
              <span>基本信息</span>
            </div>
            <div class="line"></div>
            <div
              class="item"
              :class="{
                active: isActive === 'password',
                'theme-title': isActive === 'password'
              }"
              @click="chooseItem('password')">
              <span class="icon"></span>
              <span>密码设置</span>
            </div>
            <div class="line"></div>
            <div
              class="item"
              :class="{
                active: isActive === 'forget',
                'theme-title': isActive === 'forget'
              }"
              @click="chooseItem('forget')">
              <span class="icon"></span>
              <span>忘记密码</span>
            </div>
          </div>
          <div class="right-tocc">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config"
import { getToken } from '@/utils/auth'
  export default {
    data () {
      return {
        config,
        isActive: 'infor'
      }
    },
    watch: {
      $route: function() {
        this.isActive = this.$route.path.split('/')[this.$route.path.split('/').length - 1]
      }
    },
    created () {
      this.isActive = this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    },
    methods: {
      chooseItem (item) {
        switch (item) {
          case 'infor':
            if (!getToken()) {
              return
            }
            this.isActive = item
            this.$router.push({path: '/user/infor'})
            break;
          case 'password':
            if (!getToken()) {
              return
            }
            this.isActive = item
            this.$router.push({path: '/user/password'})
            break;
          case 'forget':
            if (this.isActive !== 'password' && !getToken()) {
              this.isActive = item
              this.$router.push({path: '/user/forget'})
            }
            break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.swapper {
  width: 100%;
  height: 100%;
  min-width: 1120px;
  background: rgba(107, 108, 124, 0.08);
  .header-page {
    background-color: #27bcba;
  }
  .index-nav {
    height: 56px;
    .logo {
      width: 100%;
      color: #fff;
      line-height: 56px;
      font-weight: bold;
      padding-left: 16px;
      span {
        font-family: MicrosoftYaHei-Bold;
        font-size: 18px;
        margin-left: 16px;
      }
    }
  }
  .content {
    position: relative;
    width: 100%;
    height: calc(100% - 56px);
    min-width: 1120px;
    .infor {
      position: relative;
      width: 100;
      height: 100%;
      background: #fff;
      box-shadow: 0px 4px 10px 0px rgba(107, 108, 124, 0.08);
      border-radius: 4px;
      .main {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 97px 300px 303px 400px;
        display: flex;
        .left {
          font-family: MicrosoftYaHei;
          width: 330px;
          font-size: 13px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          line-height: 20px;
          min-width: 207px;
          .item {
            color: #7a7d82;
            margin-left: 2px;
            cursor: pointer;
            .icon {
              display: inline-block;
              width: 5px;
              height: 5px;
              border: 3px solid #7a7d82;;
              border-radius: 5px;
              margin-right: 4px;
            }
          }
          .active {
            // color: #1c8ffa;
            margin-left: 0;
            .icon {
              width: 10px;
              height: 10px;
              // border: 2px solid #1c8ffa;
              border: 2px solid;
              border-radius: 5px;
              margin-right: 2px;
            }
          }
          .line {
            width: 1px;
            height: 45px;
            border: dotted 1px #dadbdc;
            margin-left: 3px;
          }
        }
        .right-tocc {
          width: 100%;
        }
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
  }


  .app-logo {
    height: 2em;
    width: 2em;
  }
}
</style>
