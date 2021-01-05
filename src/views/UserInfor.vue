<template>
  <div class="wrapper">
    <el-form size="small" label-position="right" label-width="80px" :model="userinfo" :rules="rules" ref="userinfo">
      <el-form-item label="用户名">
        <span class="spantext">{{userinfo.username}}</span>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="userinfo.realname" class="password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phonenum">
        <el-input v-model="userinfo.phonenum" class="password"></el-input>
      </el-form-item>
      <el-form-item label="用户单位">
        <span class="spantext">{{unitinfo.name}}</span>
      </el-form-item>
      <el-form-item label="过期时间">
        <span class="spantext">{{userinfo.expirationtime}}</span>
      </el-form-item>
      <el-form-item label="角色权限">
        <span class="spantext">{{roleinfo.rolename}}</span>
      </el-form-item>
      <el-form-item class="handleButton">
        <el-button @click="cancelUser">取消</el-button>
        <el-button type="primary" @click="modifyUserBaseInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLocalStorage } from '@/utils'
import { cacheNameData } from '@/cache'
import { modifyUserBaseInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'
export default {
  data () {
    var validateRealName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入真实姓名'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('真实姓名不能包含空格'))
      } else {
        callback()
      }
    }
    var validatePhone = (rule, value, callback) => {
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
    return {
      userinfo: {},
      roleinfo: {},
      unitinfo: {},
      rules: {
        realname: [{ required: true, trigger: 'blur', validator: validateRealName }],
        phonenum: [{ required: true, trigger: 'blur', validator: validatePhone }]
      }
    }
  },
  created () {
    this.userinfo = getLocalStorage(cacheNameData.userInfo) || {}
    this.roleinfo = getLocalStorage(cacheNameData.roleInfo) || {}
    this.unitinfo = getLocalStorage(cacheNameData.unitInfo) || {}
  },
  mounted () {
  },
  methods: {
    modifyUserBaseInfo () {
      this.$refs.userinfo.validate(result => {
        if (result) {
          let params = {
            id: this.userinfo.id,
            phonenum: this.userinfo.phonenum,
            realname: this.userinfo.realname
          }
          modifyUserBaseInfo(params).then(res => {
            this.$store.commit('SET_TOKEN', '')
            removeToken()
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$router.push({path: '/'})
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    cancelUser () {
      // this.$router.push({path: '/'})
      this.$router.go(-1)
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
    }
  }
  .spantext {
    font-family: SimSun;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #4e5258;
  }
  .handleButton {
    margin-top: 50px;
  }
}
</style>
