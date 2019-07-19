<template>
  <section class="language-toggle">
    <select @change="change">
      <option
        v-for="(text, locale) in $i18n.languageMap"
        :key="locale"
        :value="locale"
        :selected="locale === $i18n.locale"
        v-text="text"
      ></option>
    </select>
  </section>
</template>

<script>
export default {
  methods: {
    change (e) {
      this.$i18n.setLanguage(e.target.value)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';

.language-toggle {
  font-size: 14px;
  color: #333;
}
</style>
