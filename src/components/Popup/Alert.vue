<template>
  <v-dialog
    v-model="show"
    content-class="dialog-inline-block"
    persistent
  >
    <v-card>
      <v-card-title class="headline" >
        <span v-html="title || $t('common.hint')"></span>
      </v-card-title>

      <v-card-text>
        <div v-if="typeof content === 'string'" v-html="content"></div>
        <div v-else ref="content"></div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="resolveColor"
          @click="close"
        >
          <span v-text="resolveText || $t('common.ok')"></span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    content: {},
    resolveText: String,
    resolveColor: {
      type: String,
      default: 'primary'
    }
  },

  data: () => ({
    show: false
  }),

  mounted () {
    if (this.isDOM(this.$props.content)) {
      setTimeout(() => {
        this.contentParent = this.$props.content.parentNode
        this.$refs.content.appendChild(this.$props.content)
      })
    }
  },

  destroyed () {
    if (this.contentParent) {
      this.contentParent.appendChild(this.$props.content)
    }
  },

  methods: {
    close () {
      this.show = false
    },

    isDOM (dom) {
      return /^\[object HTML.*]$/.test(Object.prototype.toString.call(dom))
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
