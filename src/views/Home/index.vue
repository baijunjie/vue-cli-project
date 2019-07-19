<template>
  <div>
    <h2 class="text-center display-3" v-text="T('welcome')"></h2>
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
    test () {
      // const control = this.$popup.confirm({
      //     beforeClose() {
      //         console.log(1111);
      //         return new Promise(res => {
      //             setTimeout(() => res(), 3000)
      //         })
      //     }
      // })
      //
      // console.log(control)
      // control.wait.then(res => {
      //     console.log(2222, res);
      // })

      // const control = this.$popup.loading()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';

</style>
