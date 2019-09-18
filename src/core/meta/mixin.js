import settings from '@/settings'

export default {
  metaInfo () {
    if (!this.$i18n || !this.$route || !this.$route.meta.title) return {}

    let title = ''
    if (this.$route.name !== 'home' && this.$route.meta.title) {
      title = this.$i18n.isDefine(this.$route.meta.title) ? this.$t(this.$route.meta.title) : this.$route.meta.title
    }

    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      title,
      titleTemplate: (titleChunk) => {
        const siteName = settings.name
        return titleChunk ? `${titleChunk} | ${siteName}` : siteName
      }
    }
  }
}
