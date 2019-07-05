<template>
  <section>
    <h1 class="title" v-text="T('name')"></h1>
    <router-link to="/">Go to Home</router-link>
  </section>
</template>

<script>
import metaMixin from '@/core/meta/mixin'

const namespace = 'views.demo.Bar'
export default {
  namespace,
  mixins: [metaMixin],

  data () {
    return {

    }
  },

  computed: {
    count () {
      return this.$store.state[namespace].count
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less-lib";

.title {
  text-align: center;
  line-height: 100px;
}
</style>
