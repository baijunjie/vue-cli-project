<template>
  <div>
    <h2 class="text-center" v-text="T('welcome')"></h2>
  </div>
</template>

<script>
import metaMixin from '@/core/meta/mixin'

const namespace = 'views.Home'
export default {
  namespace,
  mixins: [metaMixin],

  data () {
    return {

    }
  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';

</style>
