<template>
  <div class="wrapper">
    <el-form size="small" label-position="right" label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="原始密码" prop="oldPwd">
        <el-input :type="passOrText1" class="password" v-model="form.oldPwd"></el-input>
        <span class="iconfont icon-chakanmima xiaoyanjing" :class="[p1Show ? 'active' : '']" @click="showP1" title="查看密码"></span>
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
        <el-button @click="cancelPassword">取消</el-button>
        <el-button type="primary" @click="modifyUserPwd">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLocalStorage, cookies } from '@/utils'
import { cacheNameData } from '@/cache'
import { modifyUserPwd } from '@/api/user'
import { removeToken, removeTokenTemporary } from '@/utils/auth'
import config from '@/config'
import md5 from 'js-md5'
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
        return
      }
      callback()
    }
    let validatePass2 = (rule, value, callback) => {
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
    let validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      config,
      rules: {
        oldPwd: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        newPwd: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ],
        rnewPwd: [
          {required: true, validator: validatePass3, trigger: 'blur'}
        ]
      },
      passOrText1: 'password',
      passOrText2: 'password',
      passOrText3: 'password',
      p1Show: false,
      p2Show: false,
      p3Show: false,
      userinfo: {},
      form: {
        oldPwd: '',
        newPwd: '',
        rnewPwd: ''
      }
    }
  },
  created () {
    this.userinfo = getLocalStorage(cacheNameData.userInfo) || {}
  },
  mounted () {
  },
  methods: {
    modifyUserPwd () {
      this.$refs.form.validate(result => {
        if (result) {
          let params = {
            id: this.userinfo.id,
            newPwd: md5(this.form.newPwd),
            oldPwd: md5(this.form.oldPwd)
          }
          modifyUserPwd(params).then(res => {
            
            cookies.delete(cacheNameData.passwordRemember)
            cookies.delete(cacheNameData.userName)
            cookies.delete(cacheNameData.password)
            this.$store.commit('SET_TOKEN', '')
            removeToken()
            removeTokenTemporary()
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
    cancelPassword () {
      // this.$router.push({path: '/'})
      this.$router.go(-1)
    },
    showP1 () {
      this.p1Show = !this.p1Show
      if (this.p1Show) {
        this.passOrText1 = 'text'
      } else {
        this.passOrText1 = 'password'
      }
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
