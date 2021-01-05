<template>
  <div class="content-page">
    <el-row :gutter="16" style="height:100%;">
      <el-col :span="6" style="height:100%;">
        <div class="tree-panel-wrap">
          <BasePanel v-loading="loadingTree" v-bind="basePanelData" class="tree-panel">
            <el-tree
              :props="defaultProps"
              :load="loadNode"
              lazy
              highlight-current
              @node-click="handleNodeClick">
            </el-tree>
          </BasePanel>
        </div>
      </el-col>
      <el-col :span="18" style="height:100%;">
        <el-row class="search-wrap">
          <el-col class="indent-left" :span="12">
            <el-form size="small" :inline="true" :model="searchData">
              <el-form-item>
                <el-radio-group @change="handleRadioChange" v-model="unitRadio">
                  <el-radio-button label="本单位"></el-radio-button>
                  <el-radio-button label="下属单位"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="用户名、电话或真实姓名" v-model="searchData.username" clearable></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" class="text-align-right indent-right">
            <el-button size="small" type="primary" @click="getTableData('search')">查询</el-button>
            <div class="gap-line" style="right:304px;"></div>
            <el-button style="marginLeft:32px;" size="small" type="primary" @click="addTableItem">添加</el-button>
            <el-button style="marginLeft:16px;" size="small" type="primary" @click="handleTableData(null, 'sc')">删除</el-button>
            <el-button style="marginLeft:16px;" size="small" type="primary" @click="handleTableData(null, 'qy')">启用</el-button>
            <el-button style="marginLeft:16px;" size="small" type="primary" @click="handleTableData(null, 'jy')">禁用</el-button>
          </el-col>
        </el-row>
        <div class="table-wrap gap-top">
          <el-container style="width:100%;height:100%;">
            <el-main>
              <el-table
                @selection-change="handleSelectionChange"
                :data="tableData"
                height="100%"
                :cell-style="cellStyle"
                :header-cell-style="headerCellStyle"
                style="width: 100%"
                v-loading="loading"
                highlight-current-row
                ref="singleTable">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  type="index"
                  :index="indexMethod">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="150"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span @click="showDetail(scope.row, 'xq')" class="theme-title pointer">详情</span>
                    &nbsp;
                    <span @click="showDetail(scope.row, 'edit')" class="theme-title pointer">编辑</span>
                    <template v-if="scope.row.isavailabled === 0">
                      &nbsp;
                      <span @click="handleTableData(scope.row, 'jy')" class="theme-title pointer">禁用</span>
                    </template>
                    <template v-else>
                      &nbsp;
                      <span @click="handleTableData(scope.row, 'qy')" class="theme-title pointer">启用</span>
                    </template>
                    &nbsp;
                    <span @click="handleTableData(scope.row, 'sc')" class="theme-title pointer">删除</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="isavailabled"
                  label="状态"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span v-if="scope.row.isavailabled === 0">启用</span>
                    <span v-else>禁用</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="用户名"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="realname"
                  label="真实姓名"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="phonenum"
                  label="联系方式"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="rolename"
                  label="角色名称"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="单位编码"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="单位名称"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="region"
                  label="所属区域"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer height="30px" class="text-align-right gap-top">
              <BasePagination
                v-bind="paginationData"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
              </BasePagination>
            </el-footer>
          </el-container>
        </div>
      </el-col>
    </el-row>
    <transition-group name="slide-fade">
      <YhglHandle @handleSuccess="getTableData" :unitid="unitid" :id="detailId" @close-panel="handleState = false" v-if="handleState" key="handle"/>
      <YhglDetail :id="detailId" @close-panel="detailState = false" v-if="detailState" key="detail"/>
    </transition-group>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定删除用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleTableData(null, 'qdsc')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryUserList, queryUserListSub, deleteUserByUserId, disable, enable } from '@/api/user'
import { getUnitFirst, getUnitChild } from '@/api/unit'
import YhglDetail from './YhglDetail'
import YhglHandle from './YhglHandle'
import { getLocalStorage } from '@/utils'
import { cacheNameData } from '@/cache'
export default {
  components: {
    YhglDetail,
    YhglHandle
  },
  data () {
    return {
      currentData: {},
      centerDialogVisible: false,
      basePanelData: {
        title: '用户管理',
        headerLeftIcon: 'yonghuguanli',
        showHeaderRightIcon: false,
        showFooter: false
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      currentNode: {},
      unitRadio: '本单位',
      detailId: '',
      unitid: '',
      searchData: {
        current: 0,
        limit: 0,
        type: '',
        unitCode: '',
        // unitCodeList: [],
        unitId: '',
        username: ''
      },
      loading: false,
      loadingTree: false,
      paginationData: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
        small: false
      },
      detailState: false,
      handleState: false,
      tableData: [],
      headerCellStyle: {
        fontSize: '13px',
        color: '#4E5258',
        background: '#F8F8F8',
        textAlign: 'center'
      },
      cellStyle: {
        fontSize: '12px',
        color: '#4E5258',
        textAlign: 'center'
      }
    }
  },
  created() {
  },
  methods: {
    handleTableData (e, key) {
      if (e) {
        this.currentData = e
      }
      if (!this.currentData.id) {
        this.$notify({
          message: '请先选择用户',
          type: 'info'
        });
        return
      }
      let handleApiFuc = ''
      let tipText = ''
      switch (key) {
        case 'qy':
          handleApiFuc = enable
          tipText = '启用'
          break;
        case 'jy':
          handleApiFuc = disable
          tipText = '禁用'
          break;
        case 'sc':
          this.centerDialogVisible = true
          return;
        case 'qdsc':
          this.centerDialogVisible = false
          handleApiFuc = deleteUserByUserId
          tipText = '删除'
          break;
        default:
          break;
      }
      let params = {
        id: this.currentData.id
      }
      this.loading = true
      handleApiFuc (params).then(res => {
        this.$notify({
          message: `${tipText}成功` || res.message,
          type: 'success'
        });
        this.getTableData()
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        this.currentData = {}
        this.loading = false
      })
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
          this.getTableData()
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
      this.currentNode = data
      this.getTableData()
    },
    handleRadioChange () {
      this.getTableData('search')
    },
    addTableItem () {
      this.detailId = ''
      this.unitid = this.currentNode.id
      this.handleState = true
    },
    showDetail (e, key) {
      this.detailState = false
      this.handleState = false
      setTimeout(() => {
        this.$refs.singleTable.setCurrentRow(e)
        if (key === 'xq') {
          this.detailId = e.id
          this.detailState = true
          return
        }
        if (key === 'edit') {
          this.detailId = e.id
          this.handleState = true
          return
        }
      }, 1);
    },

    getTableData (e) {
      this.handleState = false
      if (e) {
        this.paginationData.currentPage = 1
        this.paginationData.pageSize = 20
      }
      this.searchData.current = this.paginationData.currentPage
      this.searchData.limit = this.paginationData.pageSize
      // gap
      let apiFun = queryUserList
      this.searchData.unitId = this.currentNode.id
      if (this.unitRadio === '下属单位') {
        apiFun = queryUserListSub
        this.searchData.unitId = ''
        this.searchData.type = this.currentNode.type
        this.searchData.unitCode = this.currentNode.code
      }
      // gap
      this.loading = true
      apiFun (this.searchData).then(res => {
        if (res.data.total > 0) {
          this.paginationData.total = res.data.total
          let { unitList } = res.data
          this.tableData = unitList
          return
        }
        this.paginationData.total = 0
        this.tableData = []
      }).catch(error => {
        console.log(error)
        this.paginationData.total = 0
        this.tableData = []
      }).finally(() => {
        this.loading = false
      })
    },

    handleSizeChange(val) {
      this.paginationData.currentPage = 1
      this.paginationData.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.paginationData.currentPage = val
      this.getTableData()
    },
    handleSelectionChange (val) {
      this.currentData.id = val.map(item => item.id).toString()
    },
    indexMethod (index) {
      return (this.paginationData.currentPage - 1) * this.paginationData.pageSize + (index + 1)
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
.table-wrap {
	height: calc(100% - 84px);
}
</style>
