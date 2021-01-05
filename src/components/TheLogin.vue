<template>
<el-form
  status-icon
  :rules="loginRules"
  ref="loginForm"
  :model="loginForm"
  label-width="0"
  size="small"
  class="login-form">
  <el-form-item prop="username">
    <el-input
      @keyup.enter.native="handleLogin"
      v-model="loginForm.username"
      auto-complete="off"
      placeholder="请输入用户名"
      @change="getVerifyCode"
    >
      <i slot="prefix" class="icon-yonghu"></i>
    </el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input
      @keyup.enter.native="handleLogin"
      :type="passwordType"
      v-model="loginForm.password"
      auto-complete="off"
      placeholder="请输入密码"
    >
      <i class="el-icon-view el-input__icon pointer" slot="suffix" @click="showPassword"></i>
      <i slot="prefix" class="icon-mima pointer"></i>
    </el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-row :span="24">
      <el-col :span="16">
        <el-input
          @keyup.enter.native="handleLogin"
          :maxlength="code.len"
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="请输入验证码">
          <i slot="prefix" class="icon-yanzhengma"></i>
        </el-input>
      </el-col>
      <el-col :span="8">
        <div
          class="pointer login-code"
          ref="loginCode"
          @click="getVerifyCode"
        >
          <TheLoginIdentify
            v-if="loginCodeState"
            :identify-code="code.value"
            :content-width="contentWidth"
            :content-height="contentHeight"
          ></TheLoginIdentify>
          <div class="djs-box">{{ daojishiText }}</div>
        </div>
      </el-col>
    </el-row>
  </el-form-item>
  <div class="password-wrap">
    <el-checkbox v-model="checked">记住密码</el-checkbox>
    <span class="pointer" @click="handleForgetPassword">忘记密码</span>
  </div>
  <el-form-item>
    <el-button
      type="primary"
      @click.native.prevent="handleLogin"
      class="login-submit pointer">登录</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import config from '@/config'
import { cacheNameData } from '@/cache'
import { getuserVerifyCode } from '@/api/user'
import { getUid, cookies, getLocalStorage, mkTree } from '@/utils'
import TheLoginIdentify from './TheLoginIdentify'
import Layout from '@/views/Layout'
export default {
  name: 'AppLogin',
  components: {
    TheLoginIdentify
  },
  data () {
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = ''
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      config,
      loginCodeState: false,
      daojishiText: '',
      contentWidth: 90,
      contentHeight: 33,
      timeInter: null,
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      code: {
        value: '',
        len: 4,
        type: 'text'
      },
      checked: false,
      passwordType: 'password',
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      },
    }
  },
  created() {
    this.loginForm.uuid = getUid()
  },
  mounted () {
    this.contentWidth = this.$refs.loginCode.offsetWidth - 8
    this.loginCodeState = true

    this.loginForm.username = cookies.get(cacheNameData.userName)
    this.loginForm.password = cookies.get(cacheNameData.password)
    this.checked = Boolean(cookies.get(cacheNameData.passwordRemember))

    this.code.value = ''
    if (this.loginForm.username) {
      this.getVerifyCode()
    }
  },
  methods: {
    handleForgetPassword () {
      this.$router.push({ name: 'UserPasswordForget' })
    },
    getVerifyCode () {
      this.code.value = ''
      if (!this.loginForm.username) {
        this.$notify({
          type: 'info',
          title: '',
          message: '请您先输入用户名'
        })
        return
      }
      let params = {
        mac: this.loginForm.uuid,
        username: this.loginForm.username
      }
      this.daojishiText = ''
      getuserVerifyCode(params).then(res => {
        if (res.data.verifyCode.verifyCode) {
          this.code.value = res.data.verifyCode.verifyCode
          let yzmNum = 60
          clearInterval(this.timeInter)
          this.timeInter = null
          this.timeInter = setInterval(() => {
            yzmNum = yzmNum - 1
            this.daojishiText = yzmNum + '秒'
            if (yzmNum === 0) {
              clearInterval(this.timeInter)
              this.timeInter = null
              this.getVerifyCode()
            }
          }, 1000)
          return
        }
        this.code.value = ''
      }).catch(e => {
        console.log(e)
        this.code.value = ''
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {

          this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            if (res === 'error') {
              this.getVerifyCode()
            }
            if (res === 'newUser') {
              this.$router.push({ path: '/user/password' })
              this.$notify({
                type: 'info',
                title: '',
                message: '请修改初始密码'
              })
              return
            }
            if (this.checked) {
              cookies.set(cacheNameData.passwordRemember, true)
              cookies.set(cacheNameData.userName, this.loginForm.username, 3)
              cookies.set(cacheNameData.password, this.loginForm.password, 3)
            }
            if (!this.checked) {
              cookies.delete(cacheNameData.passwordRemember)
              cookies.delete(cacheNameData.userName)
              cookies.delete(cacheNameData.password)
            }

            let menus = JSON.parse(getLocalStorage(cacheNameData.moudles))
						this.checkJs(menus)
          })
        }
      })
    },
    checkJs (mks) {
			let menus = mkTree(mks)
      let addRoutes = [{
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/map-basicInfo',
        meta: {
          isAuth: true
        },
        children: menus
      }]
      this.$router.addRoutes(addRoutes)
      this.$router.push({ path: config.firstPage })
    },
    showPassword() {
      this.passwordType === 'text'
        ? (this.passwordType = 'password')
        : (this.passwordType = 'text')
    }
  }
}
</script>

<style lang='scss' scoped>
.login-form {

  .login-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 0 8px;
    
    .djs-box {
      position: absolute;
      right: -32px;
      top: 0;
      font-size: 14px;
      color: #f25555;
      font-weight: bold;
    }
  }

  .password-wrap {
    display: flex;
    justify-content: space-between;

    .pointer {
      font-size: 14px;
    }
  }

  .login-submit {
    display: block !important;
    margin: 40px auto 10px auto !important;
    width: 100%;
    height: 40px;
    font-size: 16px !important;
    text-align: center;
    border-radius: 4px !important;
    border: 0px;
  }
}
</style>
