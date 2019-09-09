<template>
  <div class="sidebar-container">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <menu-item v-for="route in routes" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Logo from './Logo'
import MenuItem from './MenuItem'
import variables from '@/assets/styles/_variables.less'

export default {
  components: {
    MenuItem,
    Logo
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    routes () {
      const homeRoute = this.$router.findRoute('name', 'home')
      return [
        {
          path: homeRoute.path,
          meta: homeRoute.meta
        },
        ...(homeRoute.children || [])
      ]
    },
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';

.sidebar-container {
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  width: @sideBarWidth !important;
  height: 100%;
  overflow: hidden;
  background-color: @menuBg;
  transition: width .3s;

  /deep/ .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  /deep/ .el-scrollbar__bar.is-vertical {
    right: 0;
  }

  /deep/ .el-scrollbar {
    height: calc(100% - @headerHeight);
  }

  /deep/ .is-horizontal {
    display: none;
  }

  /deep/ .el-menu {
    border: none;
    width: 100%;
    height: 100%;

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    &.el-menu--collapse {
      width: 100%;
    }

    // menu hover
    .submenu-title-noDropdown,
    .el-submenu__title {
      &:hover {
        background-color: @menuHover !important;
      }
    }

    .is-active > .el-submenu__title {
      color: @subMenuActiveText !important;
    }

    & .nest-menu .el-submenu > .el-submenu__title,
    & .el-submenu .el-menu-item {
      min-width: @sideBarWidth !important;
      background-color: @subMenuBg !important;

      &:hover {
        background-color: @subMenuHover !important;
      }
    }
  }
}
</style>
