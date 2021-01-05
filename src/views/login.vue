<template>
  <div class="login-wrap">
    <div class="header">
      <h1 class="title">{{ website.title }}</h1>
    </div>
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <p class="title">欢迎登录</p>
        <p class="e-title gap-top">Welcome to login</p>
        <TheLogin style="marginTop:32px;"/>
      </div>
    </div>
    <div class="footer">
      <p>{{ website.footerTitle }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import TheLogin from '@/components/TheLogin'
export default {
  name: 'Login',
  components: {
    TheLogin
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['website'])
  }
}
</script>

<style lang='scss' scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #eff8fd;
  background-image: url("../assets/login/-s-iogin_bg.png");
  background-size: cover;

  .header .title {
    position: absolute;
    top: 8%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 34px;
    font-weight: bold;
    color:rgba(34,39,46,1);
  }

  .content {
    margin: 0 auto;
    width: 57.6%;
    height: 60%;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 10px 0px rgba(107,108,124,0.08);
    border-radius:10px;

    .left {
      width: 50%;
      height: 100%;
      float: left;
      border-radius: 10px;
      background: url("../assets/login/left.gif") no-repeat;
      background-size: 100% 100%;
    }

    .right {
      width: 50%;
      height: 100%;
      float: right;
      padding: 60px;

      .title {
        font-size:18px;
        font-weight:400;
        color:rgba(34,39,46,1);
      }
      .e-title {
        font-size:14px;
        font-family:Arial;
        font-weight:400;
        color:rgba(34,39,46,0.4);
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: 400;
    color:rgba(78,82,88,1);
    line-height: 18px;
  }
}
</style>
