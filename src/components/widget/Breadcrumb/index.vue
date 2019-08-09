<template>
  <div>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <template v-for="route in routes">
          <el-breadcrumb-item
            v-if="!route.meta.breadcrumbHidden"
            :key="route.path"
            :to="route.path"
          >
            <span v-text="$t(route.meta.title)"></span>
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routes: this.$router.getMatched()
    }
  },
  watch: {
    $route (to) {
      this.routes = this.$router.getMatched(to)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-breadcrumb {
  display: inline-block;
  padding: 0 8px;
  vertical-align: middle;

  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    font-weight: 400;
  }
}
</style>
