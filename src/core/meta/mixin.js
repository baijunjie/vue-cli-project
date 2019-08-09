export default {
  metaInfo () {
    const { namespace } = this.$options
    if (!namespace || !this.$i18n || !this.$route || !this.$route.meta.title) return {}
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      title: this.$route.name === 'home' ? '' : this.$t(this.$route.meta.title),
      titleTemplate: (titleChunk) => {
        const siteName = this.$t('common.siteName')
        return titleChunk ? `${titleChunk} | ${siteName}` : siteName
      }
    }
  }
}
