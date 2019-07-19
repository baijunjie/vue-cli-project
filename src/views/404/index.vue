<template>
  <section>
    <p class="title" v-text="T('name')"></p>
    <p class="message" v-text="T('message')"></p>
  </section>
</template>

<script>
import metaMixin from '@/core/meta/mixin'

const namespace = 'views.404'
export default {
  namespace,
  mixins: [metaMixin]
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';
.title {
  text-align: center;
  line-height: 100px;
  .ftsz(30px);
}

.message {
  text-align: center;
  .ftsz(20px);
}
</style>
