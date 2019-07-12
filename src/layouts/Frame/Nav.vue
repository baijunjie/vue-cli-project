<template>
  <el-menu
    :default-active="$route.fullPath"
    router
  >
    <template v-for="route in menus">
      <template v-if="!route.meta.hide && route.path">
        <el-submenu
          v-if="hasChildren(route)"
          :index="route.path"
          :key="route.path"
        >
          <template
            v-if="route.meta.empty"
            slot="title"
            class="submenu-title"
          >
            <i :class="route.meta.icon"></i>
            <span v-text="$t(route.meta.title)"></span>
          </template>
          <el-menu-item
            v-else
            slot="title"
            class="submenu-title"
            :index="route.path"
          >
            <i :class="route.meta.icon"></i>
            <span v-text="$t(route.meta.title)"></span>
          </el-menu-item>

          <div
            v-for="routeSub in route.children"
            :key="routeSub.path"
          >
            <el-menu-item v-if="!routeSub.meta.hide && routeSub.path" :index="routeSub.path">
              <i :class="routeSub.meta.icon"></i>
              <span v-text="$t(routeSub.meta.title)"></span>
            </el-menu-item>
          </div>
        </el-submenu>

        <el-menu-item
          v-else
          :index="route.path"
          :key="route.path"
        >
          <i :class="route.meta.icon"></i>
          <span v-text="$t(route.meta.title)"></span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  data () {
    const homeRoute = this.$router.findRoute('name', 'home')
    return {
      menus: [
        {
          path: homeRoute.path,
          meta: homeRoute.meta
        },
        ...homeRoute.children || []
      ]
    }
  },
  methods: {
    // 判断当前页面路径是否在指定路径下
    containPath (path) {
      return !this.$route.fullPath.indexOf(path)
    },

    hasChildren (route) {
      return route.children &&
        route.children.length &&
        route.children.some(route => !route.meta.hide)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~less-lib';

.fa {
  margin-right: 10px;
}

.submenu-title {
  height: auto;
  padding: 0 !important;
}
</style>
