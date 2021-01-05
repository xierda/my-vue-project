<template>
  <div class="wrapper">
    <el-form size="small" label-position="right" label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" class="password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phonenum">
        <el-input v-model="form.phonenum" class="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" class="password"></el-input>
        <el-button style="marginLeft:8px;" type="primary" :disabled="showYzm" @click="getCode">{{ codeText }}</el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input :type="passOrText2" class="password" v-model="form.newPwd"></el-input>
        <span class="iconfont icon-chakanmima xiaoyanjing" :class="[p2Show ? 'active' : '']" @click="showP2" title="查看密码"></span>
      </el-form-item>
      <el-form-item label="确认新密码" prop="rnewPwd">
        <el-input :type="passOrText3" class="password" v-model="form.rnewPwd"></el-input>
        <span class="iconfont icon-chakanmima xiaoyanjing" :class="[p3Show ? 'active' : '']" @click="showP3" title="查看密码"></span>
      </el-form-item>
      <el-form-item class="handleButton">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { cacheNameData } from '@/cache'
import { getVerificationCode, modifyUserPwdByMessage } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { cookies } from '@/utils'
import config from '@/config'
export default {
  data () {
    const validatePass2 = (rule, value, callback) => {
      let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,16}$/
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.form.oldPwd) {
        callback('该密码与原密码相同，请重新输入！')
      } else if (value.length < 8 || value.length > 16) {
        callback('为了账号安全，新的密码请输入数字+字母+特殊字符等组合，且长度不低于8位')
      } else if (!reg.test(value)) {
        callback(new Error('为了账号安全，新的密码请输入数字+字母+特殊字符等组合，且长度不低于8位'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      var myreg = /^1\d{10}$/
      if (!value) {
        callback(new Error('请输入手机号码'))
      } else {
        if (!myreg.test(value)) {
          callback(new Error('手机号码格式不正确'))
        } else {
          callback()
        }
      }
    }
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('用户名不能包含空格'))
      } else {
        callback()
      }
    }
    const validateYzm = (rule, value, callback) => {
      let reg = /^\d{6,6}$/
      if (!value) {
        callback(new Error('请输入验证码'))
      } else if (!reg.test(value)) {
        callback(new Error('验证码必须为6位数字'))
      } else {
        callback()
      }
    }
    return {
      config,
      rules: {
        newPwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        rnewPwd: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        phonenum: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        username: [
          { required: true, trigger: 'blur', validator: validateUserName }
        ],
        code: [
          { required: true, trigger: 'blur', validator: validateYzm }
        ]
      },
      passOrText2: 'password',
      passOrText3: 'password',
      p2Show: false,
      p3Show: false,
      form: {
        code: '',
        msgId: '',
        username: '',
        newPwd: '',
        rnewPwd: ''
      },
      showYzm: false,
      yzmNum: 60,
      codeText: '发送验证码'
    }
  },
  methods: {
    getCode () {
      if (!this.form.username || !this.form.phonenum) {
        this.$notify.info({
          message: '用户名和手机号码不能为空'
        })
        return
      }

      let params = {
        phonenum: this.form.phonenum,
        username: this.form.username
      }
      getVerificationCode(params).then(res => {
        if (res.data.msgId) {
          
          this.showYzm = true
          var time = setInterval(() => {
            this.yzmNum = this.yzmNum - 1
            this.codeText = '重新发送(' + this.yzmNum + ')'
            if (this.yzmNum === 0) {
              clearInterval(time)
              this.yzmNum = 60
              this.codeText = '发送验证码'
              this.showYzm = false
            }
          }, 1000)

          this.form.msgId = res.data.msgId
          return
        }
        this.$notify.info({
          message: res.message
        })
      }).catch(e => {
        console.log(e)
      })
    },

    handleSave () {
      this.$refs.form.validate(result => {
        if (result) {

          this.form.newPwd = md5(this.form.newPwd)
          modifyUserPwdByMessage(this.form).then(res => {

            this.$store.commit('SET_TOKEN', '')
            removeToken()
            
            cookies.delete(cacheNameData.passwordRemember)
            cookies.delete(cacheNameData.userName)
            cookies.delete(cacheNameData.password)
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$router.push({path: '/login'})
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },

    handleCancel () {
      this.$router.go(-1)
      // this.$router.push({path: '/login'})
    },
    showP2 () {
      this.p2Show = !this.p2Show
      if (this.p2Show) {
        this.passOrText2 = 'text'
      } else {
        this.passOrText2 = 'password'
      }
    },
    showP3 () {
      this.p3Show = !this.p3Show
      if (this.p3Show) {
        this.passOrText3 = 'text'
      } else {
        this.passOrText3 = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-width: 500px;
  /deep/ .el-form-item__label {
    font-family: SimSun;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #7a7d82;
  }
  .password {
    display: inline;
    /deep/ .el-input__inner {
      width: 50%;
      padding-right: 28px;
    }
  }
  .tip {
    margin-left: 10px;
    height: 12px;
    font-family: SimSun;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #a7a9ab;
  }
  .handleButton {
    margin-top: 50px;
  }
  .xiaoyanjing {
    position: absolute;
    top: 0;
    margin-left: -24px;
    cursor: pointer;
  }
  .active {
    color: #1c8ffa;
  }
}
</style>
