<template>
  <div class="content-page">
    <el-row :gutter="16" style="height:100%;">
      <el-col :span="6" style="height:100%;">
        <div class="tree-panel-wrap">
          <BasePanel v-loading="loadingTree" v-bind="basePanelData" class="tree-panel">
            <el-tree
              v-if="refreshTree"
              :props="defaultProps"
              :load="loadNode"
              lazy
              highlight-current
              @node-click="handleNodeClick">
            </el-tree>
          </BasePanel>
        </div>
      </el-col>
      <el-col v-loading="loading" :span="18" style="height:100%;">
        <el-row class="search-wrap">
          <el-col :span="24" class="text-align-right indent-right">
            <template v-if="disabledState">
              <el-button size="small" type="primary" @click="handleUnitData('edit')">编辑</el-button>
              <el-button
                @click="handleUnitData('add')"
                :disabled="buttonHandleQxAdd"
                style="marginLeft:16px;"
                size="small"
                type="primary"
              >添加下级</el-button>
            </template>
            <template v-if="!disabledState">
              <el-button style="marginLeft:16px;" size="small" type="primary" @click="handleUnitData('')">保存</el-button>
              <el-button style="marginLeft:16px;" size="small" type="primary" @click="handleUnitData('cancel')">取消</el-button>
            </template>
          </el-col>
        </el-row>
        <div class="table-wrap gap-top">
          <el-container style="width:100%;height:100%;">
            <el-main>
              <el-form :disabled="disabledState" :model="unitData" :rules="rules" ref="form" label-width="100px" class="form-class">
                <el-form-item label="部门名称" prop="name">
                  <el-input v-model.trim="unitData.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="行政区划" prop="xzqh">
                  <BaseCascader
                    @handle-change="handleChange"
                    :value="unitData.xzqh"
                    :options="xzqhOptions"
                    :disabled="buttonHandleQxAdd"
                    :clearable="false"
                    style="width:100%;"
                  />
                </el-form-item>
                <el-form-item label="地址" prop="address">
                  <el-input v-model.trim="unitData.address"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                  <el-input v-model.trim="unitData.telephone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model.trim="unitData.email"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                  <el-input type="textarea" autosize v-model.trim="unitData.remark"></el-input>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getXzqhOptionsUserQx, cacheNameData } from '@/cache'
import { getUnitFirst, getUnitChild, queryUnit, updateUnit, addUnit } from '@/api/unit'
import { getLocalStorage } from '@/utils'
export default {
  data () {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入部门名称'))
      }
      if (value.indexOf(' ') !== -1) {
        return callback(new Error('部门名称不能包含空格'))
      }
      callback()
    }
    const checkPhonenum = (rule, value, callback) => {
      if (!value) {
        callback()
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
      rules: {
        name: [
          { required: true, trigger: 'blur', validator: checkName }
        ],
        xzqh: [
          { required: true, message: '请选择行政区划', trigger: 'change' }
        ],
        telephone: [
          { trigger: 'blur', validator: checkPhonenum }
        ]
      },
      xzqhOptionsAll: [],
      xzqhOptions: [],
      xzqhValue: '',
      refreshTree: true,
      disabledState: true,
      unitData: {
        address: '',
        code: '',
        createtime: '',
        email: '',
        id: '',
        name: '',
        parentcode: '',
        remark: '',
        state: '',
        telephone: '',
        type: '',
        xzqh: ''
      },
      basePanelData: {
        title: '部门管理',
        headerLeftIcon: 'bumenguanli',
        showHeaderRightIcon: false,
        showFooter: false
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      currentNode: {},
      loading: false,
      loadingTree: false,
      flag: ''
    }
  },
  computed: {
    buttonHandleQxAdd: function () {
      if (this.currentNode.name === '生态环境部' || this.currentNode.type === 0 || this.currentNode.type === 1) {
        return true
      }
      return false
    }
  },
  watch: {
    currentNode (newVal) {
      if (newVal.id) {
        this.getUnitInfo(newVal.id)
      }
    }
  },
  async created() {
    this.xzqhOptions = await getXzqhOptionsUserQx()
  },
  methods: {
    handleUnitData (key) {
      if (key === 'edit') {
        this.flag = key
        this.disabledState = false
        return
      }
      if (key === 'add') {
        this.flag = key
        this.disabledState = false
        this.unitData = {
          address: '',
          code: '',
          createtime: '',
          email: '',
          id: '',
          name: '',
          parentcode: '',
          remark: '',
          state: '',
          telephone: '',
          type: '',
          xzqh: ''
        }
        return
      }
      if (key === 'cancel') {
        this.$refs['form'].clearValidate()
        this.disabledState = true
        this.getUnitInfo(this.currentNode.id)
        return
      }
      if (this.flag === 'edit') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // this.unitData.xzqh = this.xzqhValue
            if (this.currentNode.type === 0 || this.currentNode.type === 1) {
              this.unitData.xzqh = ''
            }
            this.loading = true
            updateUnit(this.unitData).then(res => {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.refreshTree = false
              setTimeout(() => {
                this.refreshTree = true
              }, 1);
            }).catch(error => {
              console.log(error)
            }).finally(() => {
              this.loading = false
              this.disabledState = true
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
      if (this.flag === 'add') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            delete this.unitData.code
            delete this.unitData.createtime
            delete this.unitData.type

            this.unitData.parentcode = this.currentNode.code
            // this.unitData.xzqh = this.xzqhValue

            this.loading = true
            addUnit(this.unitData).then(res => {
              this.$notify({
                message: res.message,
                type: 'success'
              });
              this.disabledState = true
              this.refreshTree = false
              setTimeout(() => {
                this.refreshTree = true
              }, 1);
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
      }
    },

    getUnitInfo (id) {
      let params = { id }
      queryUnit(params).then(res => {
        if (res.data.unitinfo) {
          this.unitData = res.data.unitinfo
          // this.filterXzqh(this.xzqhOptionsAll, this.unitData.type, this.unitData.xzqh)
          return
        }
        this.unitData = {}
        this.$notify({
          message: `查询异常`,
          type: 'info'
        });
      }).catch((error) => {
        this.unitData = {}
        console.log(error)
      })
    },

    handleChange (e) {
      // this.xzqhValue = e
      this.unitData.xzqh = e
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        let params = {
          username: getLocalStorage(cacheNameData.userInfo).username || ''
        }
        this.loadingTree = true
        getUnitFirst (params).then(res => {
          if (res.data.unitinfo) {
            this.currentNode = res.data.unitinfo
            return resolve([res.data.unitinfo])
          }
          this.currentNode = {}
          return resolve([])
        }).catch(error => {
          console.log(error)
          this.currentNode = {}
          return resolve([])
        }).finally(() => {
          this.loadingTree = false
        })
      }
      if (node.level > 0) {
        let params = {
          id: node.data.id
        }
        this.loadingTree = true
        getUnitChild (params).then(res => {
          if (res.data.unitList.length) {
            return resolve(res.data.unitList)
          }
          return resolve([])
        }).catch(error => {
          console.log(error)
          return resolve([])
        }).finally(() => {
          this.loadingTree = false
        })
      }
    },

    handleNodeClick(data) {
      this.disabledState = true
      this.currentNode = data
    },

    filterXzqh (xzqhs, type, xzqh) {
      this.xzqhValue = ''
      let s = []
      let xzqhSheng = []
      let shi = []
      let shiXzqh = []
      let xian = []
      
      switch (type) {
        case 0:
          this.xzqhOptions = this.xzqhOptionsAll
          break;
        case 1:
          xzqh.split(',').forEach(item => {
            let xzqhSheng = item + '0000'
            let xzqhOption = xzqhs.filter(xzqhItem => xzqhItem.code === xzqhSheng)[0]
            this.xzqhOptions.push(xzqhOption)
          })
          break;
        case 2:
          this.xzqhOptions = xzqhs.filter(xzqhItem => xzqhItem.code === xzqh)[0]
          break;
        case 3:
          xzqhSheng = xzqh.substr(0, 2) + '0000'
          s = xzqhs.filter(xzqhItem => xzqhItem.code === xzqhSheng)[0]
          this.xzqhOptions = s.childXzqhs.filter(childXzqh => childXzqh.code === xzqh)[0]
          break;
        case 4:
          // 县级用户
          xzqhSheng = xzqh.substr(0, 2) + '0000'
          s = xzqhs.filter(itemOne => itemOne.code === xzqhSheng)[0]
          shiXzqh = xzqh.substr(0, 4) + '00'
          shi = s.childXzqhs.filter(itemOne => itemOne.code === shiXzqh)[0]
          xian = shi.childXzqhs.filter(itemOne => itemOne.code === xzqh)[0]
          this.xzqhOptions.push(xian)
          break;
      
        default:
          break;
      }
    }
  }
}
</script>

<style lang='scss' scoped>
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
}
.form-class {
  width: 80%;
  padding-top: 40px;
  margin: 0 auto;
}
</style>
