<template>
  <BasePanel @close-panel="$emit('close-panel')" v-bind="basePanelData">
  <el-form :rules="rules" ref="form" :model="form" size="mini" class="app-form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" clearable :disabled="disabledState" :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realname">
      <el-input v-model="form.realname" clearable :maxlength="20"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="phonenum">
      <el-input v-model="form.phonenum" clearable></el-input>
    </el-form-item>
    <el-form-item label="角色权限设置" prop="roleid">
      <el-select :clearable="false" v-model="form.roleid" style="width: 100%;">
        <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="过期时间">
      <el-date-picker
        style="width:100%;"
        v-model="form.expirationtime"
        type="date"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="使用状态">
      <el-radio-group v-model="form.isavailabled">
        <el-radio :label="0">启用</el-radio>
        <el-radio :label="1">禁用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="重置密码" v-if="disabledState">
      <el-radio-group v-model="form.isCheck">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" :maxlength="20" clearable></el-input>
    </el-form-item>
  </el-form>
  <template #footer>
    <el-form size="mini" class="app-form-button">
      <el-form-item>
        <el-button @click="$emit('close-panel')">取消</el-button>
        <el-button type="primary" @click="addTableData" style="marginLeft:40px;">确定</el-button>
      </el-form-item>
    </el-form>
  </template>
  </BasePanel>
</template>

<script>
import { addUser, queryUserByUserId, modifyUserByUserId } from '@/api/user'
import { selectAllRoles } from '@/api/role'
import { getLocalStorage } from '@/utils'
import { cacheNameData } from '@/cache'
export default {
  props: {
    unitid: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    const checkUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
        return
      }
      if (/[\u4e00-\u9fa5]/gm.test(value)) {
        callback(new Error('用户名不能为中文'))
        return
      }
      if (value.indexOf(' ') !== -1) {
        callback(new Error('用户名不能包含空格'))
        return
      }
      callback()
    }
    const checkRealname = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入真实姓名'))
        return
      }
      if (value.indexOf(' ') !== -1) {
        callback(new Error('真实姓名不能包含空格'))
        return
      }
      callback()
    }
    const checkPhonenum = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'))
        return
      }
      const myreg = /^1\d{10}$/
      if (!myreg.test(value)) {
        callback(new Error('手机号码格式不正确'))
        return
      }
      callback()
    }
    return {
      disabledState: false,
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: checkUsername }
        ],
        realname: [
          { required: true, trigger: 'blur', validator: checkRealname }
        ],
        phonenum: [
          { required: true, trigger: 'blur', validator: checkPhonenum }
        ],
        roleid: { required: true, message: '请选择角色权限设置', trigger: 'change' }
      },
      form: {
        // createtime: '',
        expirationtime: '',
        // id: '',
        isavailabled: 0,
        // password: '',
        phonenum: '',
        realname: '',
        remark: '',
        unitid: '',
        userSystemRequests: {
          // id: '',
          // roleid: '',
          // systemtype: '',
          // temproleid: '',
          // userid: ''
        },
        username: '',
        roleid: '',
        isCheck: 0
      },
      roleList: [],
      loading: false,
      basePanelData: {
        title: '添加',
        headerLeftIcon: 'add',
        showFooterLine: false,
        footerHeight: 62
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    addTableData () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // add
          if (!this.disabledState) {
            this.form.unitid = this.unitid
            this.form.userSystemRequests = {
              roleid: this.form.roleid,
              systemtype: getLocalStorage(cacheNameData.roleInfo).systemtype || ''
            }
            delete this.form.roleid
            delete this.form.isCheck
            this.loading = true
            addUser(this.form).then(res => {
                this.$notify({
                  message: res.message || '添加成功',
                  type: 'success'
                });
                this.$emit('handleSuccess')
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading = false
            })
          }
          // edit
          if (this.disabledState) {
            this.form.systemtype = getLocalStorage(cacheNameData.roleInfo).systemtype || ''
            delete this.form.unitid
            delete this.form.createtime
            delete this.form.errorcount
            this.loading = true
            modifyUserByUserId(this.form).then(res => {
                this.$notify({
                  message: res.message || '编辑成功',
                  type: 'success'
                });
                this.$emit('handleSuccess')
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getRoleList () {
      let params = {
        type: -2
        // type: getLocalStorage('tocc-roleinfo').type || ''
      }
      selectAllRoles(params).then(res => {
        if (res.data.roleinfo.length) {
          this.roleList = res.data.roleinfo
          return
        }
        this.roleList = []
      }).catch(error => {
        console.log(error)
        this.roleList = []
      }).finally(() => {
        this.disabledState = false
        this.basePanelData.title = '添加'
        this.basePanelData.headerLeftIcon = 'add'
        if (this.id) {
          this.disabledState = true
          this.basePanelData.title = '编辑'
          this.basePanelData.headerLeftIcon = 'edit'
          this.getDetailData()
        }
      })
    },
    getDetailData () {
      this.loading = true
      let params = { userId: this.id }
      queryUserByUserId(params).then(res => {
        let { userInfo } = res.data
        let userInfo2 = userInfo.userInfo
        userInfo2.roleid = userInfo.roleid
        userInfo2.isCheck = 0
        this.form = userInfo2
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.detail-item {
  margin-bottom: 8px;
  line-height: 1.5;
}
.app-form {
  padding: 0 12px;
}
.app-form-button {
  text-align: center;
}
/deep/ .el-form-item__label {
  font-size: 12px;
}
</style>
