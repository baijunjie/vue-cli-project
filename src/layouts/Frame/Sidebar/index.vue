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
  transition: width 0.28s;

  // reset element-ui css
  /deep/ .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  /deep/ .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  /deep/ .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  /deep/ .el-scrollbar {
    height: calc(100% - 50px);
  }

  /deep/ .is-horizontal {
    display: none;
  }

  /deep/ a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  /deep/ .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;

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

    // when menu collapsed
    .el-menu--vertical {
      .nest-menu .el-submenu > .el-submenu__title,
      .el-menu-item {
        &:hover {
          // you can use @subMenuHover
          background-color: @menuHover !important;
        }
      }

      // the scroll bar appears when the subMenu is too long
      > .el-menu--popup {
        max-height: 100vh;
        overflow-y: auto;

        &::-webkit-scrollbar-track-piece {
          background: #d3dce6;
        }

        &::-webkit-scrollbar {
          width: 6px;
        }

        &::-webkit-scrollbar-thumb {
          background: #99a9bf;
          border-radius: 20px;
        }
      }
    }

    .el-menu--collapse .el-menu .el-submenu {
      min-width: @sideBarWidth !important;
    }
  }
}
</style>
