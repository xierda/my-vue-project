<template>
  <BasePanel @close-panel="$emit('close-panel')" v-bind="basePanelData">
  <ul class="detail-panel" v-loading="loading">
    <li v-for="(item, index) in detailsConfig" :key="index">
      <span v-if="item.key === 'isavailabled'">
        {{ item.name }}：{{ detailsData[item.key] ? '禁用' : '启用' }}
      </span>
      <span v-else>
        {{ item.name }}：{{ detailsData[item.key] }}
      </span>
    </li>
  </ul>
  </BasePanel>
</template>

<script>
import { queryUserByUserId } from '@/api/user'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      basePanelData: {
        title: '详情',
        showFooter: false
      },
      detailsConfig: [
        {
          name: '用户名',
          key: 'username'
        }, {
          name: '真实姓名',
          key: 'realname'
        }, {
          name: '联系方式',
          key: 'phonenum'
        }, {
          name: '启用状态',
          key: 'isavailabled'
        }, {
          name: '使用到期时间',
          key: 'expirationtime'
        }, {
          name: '备注',
          key: 'remark'
        }
      ],
      detailsData: {}
    }
  },
  created () {
    this.getDetailData()
  },
  methods: {
    getDetailData () {
      this.loading = true
      let params = { userId: this.id }
      queryUserByUserId(params).then(res => {
        if (res.data) {
          let { userInfo } = res.data
          this.detailsData = userInfo.userInfo
          return
        }
        this.detailsData = {}
      }).catch(error => {
        console.log(error)
        this.detailsData = {}
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/list-detail.scss';
</style>
