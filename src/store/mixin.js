export default {
  computed: {
    storeState () {
      const { namespace } = this.$options
      return this.$store ? namespace ? this.$store.state[namespace] : this.$store.state : {}
    }
  },

  beforeCreate () {
    if (this.$store) {
      const { namespace, storeModule } = this.$options
      if (namespace && storeModule && !this.$store.state[namespace]) {
        this.$store.registerModule(namespace, storeModule)
      }
    }
  }

  // beforeDestroy () {
  //   if (this.$store) {
  //     const { namespace, storeModule } = this.$options
  //     if (namespace && storeModule && this.$store.state[namespace]) {
  //       this.$store.unregisterModule(namespace)
  //     }
  //   }
  // }
}
