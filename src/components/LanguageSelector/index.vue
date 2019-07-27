<template>
  <el-dropdown trigger="click" @command="change">
    <div class="language-selector">
      <i class="fas fa-language"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(text, locale) in $i18n.languageMap"
        :key="locale"
        :command="locale"
        :disabled="locale === $i18n.locale"
      >
        {{ text }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    change (locale) {
      this.$i18n.setLanguage(locale)
      this.$store.dispatch('app/setLanguage', locale)
    }
  }
}
</script>

<style scoped>
.language-selector {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  font-size: 24px;
  cursor: pointer;
}
</style>
