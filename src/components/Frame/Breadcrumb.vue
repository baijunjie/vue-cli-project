<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="meta in matched"
      :key="meta.path"
      :to="meta.empty ? null : meta.path">
      <span v-text="$t(meta.i18n)"></span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      matched: this.$router.getMetaMatched()
    }
  },

  watch: {
    $route (to, from) {
      this.matched = this.$router.getMetaMatched(to)
    }
  }
}
</script>
