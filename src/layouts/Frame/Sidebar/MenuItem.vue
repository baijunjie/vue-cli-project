<template>
  <div v-if="!item.meta.menuHidden" class="menu-wrapper">
    <el-submenu v-if="hasChildren(item)" :index="item.path" popper-append-to-body>
      <menu-item-inner :item="item" slot="title" />
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
    <v-link v-else :to="item.path">
      <el-menu-item :index="item.path">
        <menu-item-inner :item="item" />
      </el-menu-item>
    </v-link>
  </div>
</template>

<script>
import VLink from '@/components/Link'
import MenuItemInner from './MenuItemInner'

export default {
  name: 'SidebarItem',
  components: {
    VLink,
    MenuItemInner
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasChildren (route) {
      return route.children &&
        route.children.length &&
        route.children.some(route => !route.meta.menuHidden)
    }
  }
}
</script>

<style lang="less" scoped>
.hideSidebar {
  .menu-wrapper:not(.nest-menu) {
    /deep/ .el-menu-item,
    /deep/ .el-submenu__title {
      padding: 0 !important;
    }

    /deep/ .menu-item {
      text-align: center;

      &__title {
        display: none;
      }

      &__icon {
        margin: 0;
      }
    }

    /deep/ .el-submenu__icon-arrow {
      display: none;
    }
  }
}
</style>
