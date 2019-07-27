<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="app-main-container">
      <div class="fixed-header">
        <nav-bar />
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <div class="app-container">
            <router-view :key="$route.fullPath" />
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import mix from './mixin'
import { mapState } from 'vuex'

export default {
  components: {
    NavBar,
    Sidebar
  },
  mixins: [mix],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .clear;

  &.withoutAnimation {
    .app-main-container,
    .sidebar-container {
      transition: none;
    }
  }

  &.hideSidebar {
    .sidebar-container {
      width: @sideBarHideWidth !important;
    }

    .app-main-container {
      margin-left: @sideBarHideWidth;
    }

    .fixed-header {
      left: @sideBarHideWidth;
    }
  }

  // mobile responsive
  &.mobile {
    &.openSidebar {
      position: fixed;
      top: 0;
    }

    &.hideSidebar {
      .sidebar-container {
        pointer-events: none;
        transition-duration: 0.3s;
        transform: translate3d(-@sideBarWidth, 0, 0);
      }
    }

    .app-main-container {
      margin-left: 0;
    }

    .sidebar-container {
      transition: transform .28s;
      width: @sideBarWidth !important;
    }

    .fixed-header {
      left: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
}

.app-main-container {
  min-height: 100%;
  transition: margin-left .28s;
  margin-left: @sideBarWidth;
  position: relative;
}

.app-container {
  padding: 20px;
}

.app-main {
  min-height: calc(100vh - @headerHeight);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  left: @sideBarWidth;
  z-index: 9;
  transition: left 0.28s;

  + .app-main {
    padding-top: @headerHeight;
    min-height: 100vh;
    overflow: auto;
  }
}
</style>
