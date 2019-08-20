<template>
  <v-dialog
    v-model="show"
    content-class="dialog-inline-block"
    persistent
  >
    <v-card min-width="300">
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
          :color="rejectColor"
          text
          :disabled="loading"
          @click="close"
        >
          <span v-text="rejectText || $t('common.cancel')"></span>
        </v-btn>
        <v-btn
          :color="resolveColor"
          :loading="loading"
          :disabled="loading"
          @click="onResolve"
        >
          <v-progress-circular class="mr-2" v-if="loading" :size="16" :width="2" indeterminate></v-progress-circular>
          <span v-text="loading ? loadingText || $t('common.loading') : resolveText || $t('common.ok')"></span>
          <template v-slot:loader>
            <v-progress-circular class="mr-2" v-if="loading" :size="16" :width="2" indeterminate></v-progress-circular>
            <span v-text="loadingText || $t('common.loading')"></span>
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    title: String,
    content: {},
    loadingText: String,
    resolveText: String,
    rejectText: String,
    resolveColor: {
      type: String,
      default: 'primary'
    },
    rejectColor: {
      type: String,
      default: 'primary'
    },
    beforeClose: {
      type: Function,
      default: () => {}
    }
  },

  data: () => ({
    show: false,
    resolve: false,
    contentParent: null
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
    onResolve () {
      const result = this.beforeClose()
      if (result === false) return

      this.resolve = true
      if (result instanceof Promise) {
        this.loading = true
        result
          .then(() => this.close())
          .finally(() => {
            this.loading = false
          })
      } else {
        this.close()
      }
    },

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
