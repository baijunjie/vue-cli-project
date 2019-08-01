<template>
  <v-dialog
    v-model="show"
    content-class="dialog-inline-block"
    hide-overlay
    persistent
  >
    <v-card
      class="d-inline-block text-xs-center"
      color="rgba(0,0,0,.5)"
    >
      <v-card-text>
        <v-progress-circular
          :color="color"
          indeterminate
        ></v-progress-circular>
        <div v-if="content" :class="`${color}--text mt-2`" v-html="content"></div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    content: String,
    color: {
      type: String,
      default: 'white'
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

<style>
.dialog-inline-block {
  display: inline-block !important;
  width: auto !important;
}
</style>
