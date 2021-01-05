<template>
  <div class="content-page role-management">
    <el-row :gutter="16" style="height:100%;">
      <el-col :span="6" style="height:100%;">
        <div class="tree-panel-wrap">
          <BasePanel v-loading="loadingRole" v-bind="basePanelData" class="tree-panel">
            <ul>
              <li
                v-for="(item, index) in roleList"
                @click="handleItem(item, index)"
                :key="item.id"
                class="special-li pointer theme-hover-bg"
                :class="{'theme-active-bg':activeIndex === index}"
              >{{ item.rolename }}</li>
            </ul>
            <template #footer>
              <div class="footer-wrap">
                <el-button round size="small" @click="handleroleData('add')">新增角色</el-button>
              </div>
            </template>
          </BasePanel>
        </div>
      </el-col>
      <el-col v-loading="loading" :span="18" style="height:100%;">
        <el-row class="search-wrap">
          <el-col :span="24" class="text-align-right indent-right">
            <template v-if="disabledState">
              <el-button size="small" type="primary" @click="handleroleData('edit')">编辑</el-button>
            </template>
            <template v-if="!disabledState">
              <el-button style="marginLeft:16px;" size="small" type="primary" @click="handleroleData">保存</el-button>
              <el-button style="marginLeft:16px;" size="small" type="primary" @click="handleroleData('cancel')">取消</el-button>
            </template>
          </el-col>
        </el-row>
        <div class="table-wrap gap-top">
          <el-container style="width:100%;height:100%;">
            <el-main>
              <el-form size="small" inline :disabled="disabledState" :model="roleData" :rules="rules" ref="form" label-width="100px" class="form-class">
                <el-form-item label="角色名称" prop="rolename" class="form-item-class">
                  <el-input v-model.trim="roleData.rolename" :maxlength="20" clearable></el-input>
                </el-form-item>
                <el-form-item label="角色等级" prop="type" class="form-item-class">
                  <el-select v-model="roleData.type" clearable>
                    <el-option label="系统级" :value="-2"></el-option>
                    <el-option label="监督级" :value="-1"></el-option>
                    <el-option label="部级" :value="1"></el-option>
                    <el-option label="省级" :value="2"></el-option>
                    <el-option label="市级" :value="3"></el-option>
                    <el-option label="县级" :value="4"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="角色描述" prop="roledesc" class="form-item-class">
                  <el-input type="textarea" autosize v-model.trim="roleData.roledesc" :maxlength="50"></el-input>
                </el-form-item>
              </el-form>
              <el-scrollbar :noresize="false" :native="false" style="height: calc(100% - 102px);">
                <YhqxglTable :items="items" :flag="flag"/>
              </el-scrollbar>
            </el-main>
          </el-container>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  selectAllRoles,
  getRoleInfoByRoleid,
  getRoleInfoByRoleidV1,
  getCreateRoleInfo,
  updateOneRole,
  addOneRole
} from '@/api/role'
import { getLocalStorage } from '@/utils'
import { cacheNameData } from '@/cache'
import YhqxglTable from './YhqxglTable'
export default {
  components: {
    YhqxglTable
  },
  data () {
    const checkRolename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入角色名称'))
      }
      if (value.indexOf(' ') !== -1) {
        return callback(new Error('角色名称不能包含空格'))
      }
      callback()
    }
    return {
      currentId: '',
      items: [],
      roleList: [],
      activeIndex: 0,
      rules: {
        rolename: [
          { required: true, trigger: 'blur', validator: checkRolename }
        ],
        type: [
          { required: true, message: '请选择角色等级', trigger: 'change' }
        ]
      },
      disabledState: true,
      roleData: {},
      basePanelData: {
        title: '用户权限管理',
        headerLeftIcon: 'yonghuquanxianguanli',
        showHeaderRightIcon: false
      },
      loading: false,
      loadingRole: false,
      flag: '',
      userdetail: {},
      roleinfo: {}
    }
  },
  created() {
    this.getRoleList()
    this.userdetail = getLocalStorage(cacheNameData.userInfo) || {}
    this.roleinfo = getLocalStorage(cacheNameData.roleInfo) || {}
  },
  methods: {
    getRoleList () {
      let params = {
        // type: getLocalStorage('tocc-roleinfo').type || ''
        type: -2
      }
      this.loadingRole = true
      selectAllRoles(params).then(res => {
        if (res.data.roleinfo) {
          this.roleList = res.data.roleinfo
          this.currentId = this.roleList[this.activeIndex].id
          this.getCurrentUserRole(this.currentId)
          return
        }
        this.roleList = []
      }).catch(error => {
        console.log(error)
        this.roleList = []
      }).finally(() => {
        this.loadingRole = false
      })
    },

    handleItem (item, index) {
      this.disabledState = true
      this.flag = '1'
      this.activeIndex = index
      this.currentId = item.id
      this.getCurrentUserRole(item.id)
    },

    getCurrentUserRole (id) {
      let params = {
        roleid: id || ''
      }
      this.loading = true
      getRoleInfoByRoleid(params).then(res => {
        if (res.data.roleinfo) {
          this.roleData = res.data.roleinfo
          this.items = res.data.menusinfo
          return
        }
        this.roleData = {}
        this.items = []
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.loading = false
      })
    },

    handleroleData (key) {
      if (key === 'cancel') {
        this.$refs['form'].clearValidate()
        this.disabledState = true
        this.flag = '1'
        this.getCurrentUserRole(this.currentId)
        return
      }
      if (key === 'add') {
        this.flag = key
        this.disabledState = false
        this.roleData = {}
        getCreateRoleInfo().then(res => {
          this.items = res.data.menusinfo
        }).catch(error => {
          console.log(error)
        })
        return
      }
      if (key === 'edit') {
        this.flag = key
        this.disabledState = false
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let params = {
              roleid: this.currentId
            }
            this.loading = true
            getRoleInfoByRoleidV1(params).then(res => {
              if (res.data.roleinfo) {
                this.roleData = res.data.roleinfo
                if (this.items && this.items.length > 0) {
                  this.items = res.data.menusinfo
                } else {
                  getCreateRoleInfo().then(res => {
                    if (res.data.menusinfo) {
                      this.items = res.data.menusinfo
                    }
                  }).catch(error => {
                    console.log(error)
                  })
                }
                return
              }
              this.roleData = {}
              this.items = []
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
        return
      }
      // gap
      if (this.flag === 'edit') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 提交数组
            let menus = []
            // 有一级
            if (this.items && this.items.length) {
              this.items.map(item => {
                if (item.ischeck) {
                  menus.push({
                    moudle: {
                      createrid: this.userdetail.id,
                      id: item.id,
                      moudleid: item.moudleid,
                      roleid: this.roleData.id
                    },
                    operations: []
                  })
                }
                // 有二级
                if (item.moudles && item.moudles.length) {
                  item.moudles.map(subItem => {
                    if (subItem.ischeck) {
                      menus.push({
                        moudle: {
                          createrid: this.userdetail.id,
                          id: subItem.id,
                          moudleid: subItem.moudleid,
                          roleid: this.roleData.id
                        },
                        operations: []
                      })
                    }
                    // 有三级
                    if (subItem.moudles && subItem.moudles.length) {
                      subItem.moudles.map(subSubItem => {
                        if (subSubItem.ischeck) {
                          menus.push({
                            moudle: {
                              createrid: this.userdetail.id,
                              id: subSubItem.id,
                              moudleid: subSubItem.moudleid,
                              roleid: this.roleData.id
                            },
                            operations: []
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
            // submit
            let params = {
              menus: menus,
              roleinfo: {
                createrid: this.userdetail.id,
                id: this.roleData.id,
                roledesc: this.roleData.roledesc,
                rolename: this.roleData.rolename,
                systemtype: this.roleinfo.systemtype,
                type: this.roleData.type
              }
            }
            // gap
            this.loading = true
            updateOneRole(params).then(res => {
              this.getRoleList()
              this.$notify({
                message: '成功编辑信息' || res.message,
                type: 'success'
              });
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading = false
              this.disabledState = true
              this.flag = '22'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
        return
      }
      // gap
      if (this.flag === 'add') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 提交数组
            let menus = []
            // 有一级
            if (this.items && this.items.length) {
              this.items.map(item => {
                if (item.ischeck) {
                  menus.push({
                    moudle: {
                      createrid: this.userdetail.id,
                      id: item.id,
                      moudleid: item.moudleid,
                      roleid: this.roleData.id
                    },
                    operations: []
                  })
                }
                // 有二级
                if (item.moudles && item.moudles.length) {
                  item.moudles.map(subItem => {
                    if (subItem.ischeck) {
                      menus.push({
                        moudle: {
                          createrid: this.userdetail.id,
                          id: subItem.id,
                          moudleid: subItem.moudleid,
                          roleid: this.roleData.id
                        },
                        operations: []
                      })
                    }
                    // 有三级
                    if (subItem.moudles && subItem.moudles.length) {
                      subItem.moudles.map(subSubItem => {
                        if (subSubItem.ischeck) {
                          menus.push({
                            moudle: {
                              createrid: this.userdetail.id,
                              id: subSubItem.id,
                              moudleid: subSubItem.moudleid,
                              roleid: this.roleData.id
                            },
                            operations: []
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
            // submit
            let params = {
              menus: menus,
              roleinfo: {
                createrid: this.userdetail.id,
                id: this.roleData.id,
                roledesc: this.roleData.roledesc,
                rolename: this.roleData.rolename,
                systemtype: this.roleinfo.systemtype,
                type: this.roleData.type
              }
            }
            // gap
            this.loading = true
            addOneRole(params).then(res => {
              this.getRoleList()
              this.$notify({
                message: res.message,
                type: 'success'
              });
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading = false
              this.disabledState = true
              this.flag = '22'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  @import "~@/styles/variables";
.tree-panel-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .tree-panel {
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .special-li {
    line-height: 40px;
    font-size: 14px;
    color: #7a7d82;
    border-radius: 4px;
    padding-left: 8px;
  }
  .footer-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.form-class {

  .form-item-class {
    width: 45%;
    /deep/ .el-form-item__content {
      width: 250px;
    }

    /deep/ .el-select.el-select--small {
      width: 100%;
    }
  }
}
</style>
