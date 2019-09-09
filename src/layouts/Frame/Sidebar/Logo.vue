<template>
  <div class="sidebar-logo-container" :class="{ 'collapse': collapse }">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img src="@/assets/img/logo.png" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import settings from '@/settings'

export default {
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: settings.name
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  padding: 0 20px;
  width: 100%;
  height: @headerHeight;
  background: #2b2f3a;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;

    .sidebar-logo {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }

    .sidebar-title {
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      white-space: nowrap;
    }
  }

  &.collapse {
    padding: 0;

    .sidebar-logo-link {
      justify-content: center;

      .sidebar-logo {
        margin-right: 0;
      }

      .sidebar-title {
        display: none;
      }
    }
  }
}
</style>
