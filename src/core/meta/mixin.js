export default {
  metaInfo () {
    const { namespace } = this.$options
    if (!namespace || !this.$route || !this.$route.meta.i18n) return {}
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      title: namespace.match(/home$/i) ? '' : this.$t(this.$route.meta.i18n),
      titleTemplate: (titleChunk) => {
        const siteName = this.$t('common.siteName')
        return titleChunk ? `${titleChunk} | ${siteName}` : siteName
      }
    }
  }
}
