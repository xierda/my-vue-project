<template>
  <div class="header-nav">
    <ul class="nav-wrap">
      <li @click="handleSelect(index)" v-for="(item, index) in menus" :key="index" :class="{'active':activeNav === index}" class="nav-item pointer">
        <!-- <svg-icon :icon-class="item.iconClass"/> -->
        <router-link class="nav-title" :to="`/${item.path}`">{{ item.mkname }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import config from '@/config'
// import { mapGetters } from 'vuex'
// import { getLocalStorage } from '@/utils'
// import { removeToken } from '@/util/auth'
export default {
  data () {
    return {
      activeNav: 0,
      config,
      menus: config.menus
      // menus: []
    }
  },
  computed: {
    // ...mapGetters(["activeNav"])
  },
  created () {
    // if (JSON.parse(getLocalStorage('tocc-moudles'))) {
    //   this.menus = JSON.parse(getLocalStorage('tocc-moudles'))
    // } else {
      // removeToken()
    //   this.$router.push({path: '/'})
    // }
    // this.fetchData()
  },
  methods: {
    // fetchData() {
    //   if (this.$route.path.split('/')[1] === 'map') {
    //     this.$store.commit("SET_ACTIVE_NAV", 0);
    //     return
    //   }
    //   if (this.$route.path.split('/')[1] === 'rcjcyyj') {
    //     this.$store.commit("SET_ACTIVE_NAV", 1);
    //     return
    //   }
    //   if (this.$route.path.split('/')[1] === 'ztjcyyj') {
    //     this.$store.commit("SET_ACTIVE_NAV", 2);
    //     return
    //   }
    //   if (this.$route.path.split('/')[1] === 'system') {
    //     this.$store.commit("SET_ACTIVE_NAV", 3);
    //     return
    //   }
    //   if (this.$route.path.split('/')[1] === 'sjdr') {
    //     this.$store.commit("SET_ACTIVE_NAV", 4);
    //     return
    //   }
    // },
    handleSelect(index) {
      console.log(index)
      // this.$store.commit("SET_ACTIVE_NAV", index);
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/variables.scss';
.header-nav {
  display: inline-block;
  height: 100%;
  color: $mainTextColor;
  font-size: 14px;

  .nav-wrap {
    height: 100%;
    display: flex;

    // .active {
    //   background: $activeMainColor;
    //   border-bottom: 3px solid $activeBottomColor;
    // }

    .nav-item {
      width: 128px;
      height: 100%;
      line-height: 58px;
      text-align: center;

      &:last-child {
        margin-right: 80px;
      }

      // &:hover {
      //   background: $activeMainColor;
      // }

      .nav-title {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
