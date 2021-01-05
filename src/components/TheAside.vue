<template>
<el-container class="aside-page">

  <!-- <el-header height="56px">
    <el-menu class="aside-menu" @open="handleOpen" @close="handleClose" :collapse="collapseState">
      <el-menu-item class="border-bottem">
        <svg-icon class="menu-icon" icon-class="fanhuishouye"/>
        <span slot="title">返回首页</span>
      </el-menu-item>
    </el-menu>
  </el-header> -->

  <el-main class="aside-main">
    <el-menu
      @select="onSelect"
      :default-active="activeIndex"
      unique-opened
      class="aside-menu" @open="handleOpen" @close="handleClose" :collapse="collapseState">
      <!-- <el-menu-item class="border-bottem">
        <svg-icon class="menu-icon" icon-class="fanhuishouye"/>
        <span slot="title">返回首页</span>
      </el-menu-item> -->

      <template v-for="(item, index) in menus">

        <el-menu-item v-if="!item.moudles.length" :index="item.name" :key="index">
          <svg-icon class="menu-icon" :icon-class="item.iconclass"/>
          <span slot="title">{{ item.mkname }}</span>
        </el-menu-item>

        <el-submenu v-if="item.moudles.length" :index="item.name" :key="index">
          <template slot="title">
            <svg-icon class="menu-icon" :icon-class="item.iconclass"/>
            <span slot="title">{{ item.mkname }}</span>
          </template>

          <template v-for="(subItem, subIndex) in item.moudles">
            <el-menu-item v-if="!subItem.moudles.length" :index="subItem.name" :key="subIndex">{{ subItem.mkname }}</el-menu-item>

            <el-submenu v-if="subItem.moudles.length" :index="subItem.name"  :key="subIndex">
              <span slot="title">{{ subItem.mkname }}</span>
              <template v-for="(subSubItem, subSubIndex) in subItem.moudles">
                <el-menu-item :index="subSubItem.name" :key="subSubIndex">{{ subSubItem.mkname }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-main>
  <el-footer class="aside-footer" height="48px">
    <span @click="handle" class="pointer">
      <svg-icon v-if="!collapseState" icon-class="menu-fold"/>
      <svg-icon v-if="collapseState" icon-class="menu-unfold"/>
    </span>
  </el-footer>
</el-container>
</template>

<script>
import config from '@/config'
import { cacheNameData } from '@/cache'
// import mapFactorConfig from '@/config/mapFactorConfig'
import { getLocalStorage } from '@/utils'
import { removeToken } from '@/utils/auth'
export default {
  data () {
    return {
      config,
      collapseState: false,
      menus: [],
      activeIndex: '',
      allMenus: []
    }
  },
  watch: {
    '$route.name': {
      handler: function(newVal){
        this.activeIndex = newVal
        if (this.allMenus.length) {
          this.fetchData()
        }
      },
      immediate: true
    }
  },
  created () {
    if (JSON.parse(getLocalStorage(cacheNameData.moudles))) {
      this.menus = JSON.parse(getLocalStorage(cacheNameData.moudles))
      // this.allMenus = JSON.parse(getLocalStorage(cacheNameData.moudles))
      // this.fetchData()
    } else {
      removeToken()
      this.$router.push({path: '/'})
    }
  },
  methods: {
    onSelect (index) {
      switch (index) {
        // case '/rcjcyyj/2-6':
        //   this.$store.commit('SET_MAP_SPECIAL_DATA', mapFactorConfig['clgps'])
        //   this.$router.push('/map')
        //   this.$store.commit("SET_ACTIVE_NAV", 0)
        //   this.$store.commit('SET_MAP_SPECIAL_STATE', {key: 'mapSearchForms', value: true})
        //   setTimeout(() => {
        //     this.$store.commit('SET_MAP_SPECIAL_STATE', {key: 'specialStateKey', value: 'filterSearchView'})
        //   }, 100);
        //   break;
        case 'gdjglfwssjc':
          // this.$store.commit('SET_MAP_SPECIAL_DATA', mapFactorConfig['fwq'])
          // this.$router.push('/map')
          // this.$store.commit("SET_ACTIVE_NAV", 0)
          // this.$store.commit('SET_MAP_SPECIAL_STATE', {key: 'mapSearchForms', value: true})
          // setTimeout(() => {
          //   this.$store.commit('SET_MAP_SPECIAL_STATE', {key: 'specialStateKey', value: 'filterSearchView'})
          // }, 100);
          break;
        // case 'qxdzzhjc':
        //   this.$notify.info({
        //     title: '',
        //     message: '暂无数据'
        //   });
        //   break;
        case 'gccldwxx':
          // this.$store.commit('SET_MAP_SPECIAL_DATA', mapFactorConfig['clgps'])
          // this.$router.push('/map')
          // this.$store.commit("SET_ACTIVE_NAV", 0)
          // this.$store.commit('SET_MAP_SPECIAL_STATE', {key: 'mapSearchForms', value: true})
          // setTimeout(() => {
          //   this.$store.commit('SET_MAP_SPECIAL_STATE', {key: 'specialStateKey', value: 'filterSearchView'})
          // }, 100);
          break;

        default:
          this.$router.push({name: index})
          break;
      }
    },
    fetchData() {
      if (this.$route.path.split('/')[1] === 'rcjcyyj') {
        this.menus = this.allMenus['1']['moudles']
        if (this.$route.path === '/rcjcyyj') {
          this.activeIndex = this.menus['0']['moudles']['0']['name']
        }
        this.$router.push({name: this.activeIndex})
        return
      }
      if (this.$route.path.split('/')[1] === 'ztjcyyj') {
        this.menus = this.allMenus['2']['moudles']
        if (this.$route.path === '/ztjcyyj') {
          this.activeIndex = this.menus['0']['moudles']['0']['name']
        }
        this.$router.push({name: this.activeIndex})
        return
      }
      if (this.$route.path.split('/')[1] === 'system') {
        this.menus = this.allMenus['3']['moudles']
        if (this.$route.path === '/system') {
          this.activeIndex = this.menus['0']['name']
        }
        this.$router.push({name: this.activeIndex})
        return
      }
      if (this.$route.path.split('/')[1] === 'sjdr') {
        this.menus = this.allMenus['4']['moudles']
        if (this.$route.path === '/sjdr') {
          this.activeIndex = this.menus['0']['moudles']['0']['name']
        }
        this.$router.push({name: this.activeIndex})
        return
      }
    },
    handle () {
      this.collapseState = !this.collapseState
      this.$emit('switchMenu', this.collapseState)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/styles/variables.scss";
.aside-page {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow:0px 4px 10px 0px rgba(107,108,124,0.2);

  .aside-main::-webkit-scrollbar {
    display: none;
  }

  .aside-menu {
    width: 100%;
    min-height: 400px;

    .menu-icon {
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }

  // .el-menu-item.is-active {
  //   background: $mainBgColor;
  //   border-left: 3px solid $mainColor;
  // }

  /deep/ .el-menu {
    border-right: none;
  }

  // /deep/ .is-active .el-submenu__title {
  //   svg,
  //   i,
  //   span {
  //     color: $mainColor;
  //   }
  // }

  .aside-footer {
    border-top: 1px solid $borderColor;
    text-align: center;
    line-height: 48px;
  }
}
</style>
