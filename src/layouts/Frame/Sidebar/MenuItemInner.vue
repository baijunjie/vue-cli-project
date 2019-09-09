<template>
  <div class="menu-item">
    <i v-if="item.meta.icon" class="menu-item__icon fas" :class="[`fa-${item.meta.icon}`]"></i>
    <span class="menu-item__title" v-text="item.meta.menuTitle ? $t(item.meta.menuTitle) : $t(item.meta.title)"></span>
  </div>
</template>

<script>
export default {
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.menu-item {
  &__icon {
    width: 20px;
    margin-right: 10px;
    text-align: center;
  }
}
</style>
