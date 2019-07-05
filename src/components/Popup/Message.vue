<template>
  <v-snackbar
    v-model="show"
    :left="x === 'left'"
    :right="x === 'right'"
    :top="y === 'top'"
    :bottom="y === 'bottom'"
    :color="color"
    :timeout="timeout"
  >
    <div v-html="content"></div>
    <v-btn
      :color="closeColor"
      @click="close"
      dark
      text
    >
      <span v-text="closeText || $t('common.close')"></span>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    timeout: Number,
    content: String,
    closeText: String,
    color: String,
    closeColor: String,
    x: String,
    y: {
      type: String,
      default: 'top'
    }
  },

  data: () => ({
    show: false
  }),

  methods: {
    close () {
      this.show = false
    }
  }
}
</script>
