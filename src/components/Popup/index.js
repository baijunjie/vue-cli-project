import Vue from 'vue'
import Alert from './Alert'
import Confirm from './Confirm'
import Message from './Message'
import Loading from './Loading'

const defaultOptions = {
  alert: {
    title: '',
    content: '',
    resolveText: ''
  },
  confirm: {
    loading: false,
    title: '',
    content: '',
    loadingText: '',
    resolveText: '',
    rejectText: '',
    beforeClose: () => {}
  },
  message: {
    timeout: 3000,
    content: '',
    closeText: '',
    color: '',
    x: '',
    y: 'top'
  },
  loading: {
    color: 'white'
  }
}

export default class Popup {
  static install (Vue, options) {
    if (Popup._installed) return
    Popup._installed = true
    Vue.prototype.$popup = new Popup(options)
  }

  constructor (options) {
    this.AlertComponent = Vue.extend(Object.assign(Alert, options))
    this.ConfirmComponent = Vue.extend(Object.assign(Confirm, options))
    this.MessageComponent = Vue.extend(Object.assign(Message, options))
    this.LoadingComponent = Vue.extend(Object.assign(Loading, options))
    this._loading = null
  }

  _create (type, options, Component) {
    if (typeof options === 'string') options = { content: options }
    const propsData = Object.assign(defaultOptions[type], options)

    let close
    const wait = new Promise(resolve => {
      close = resolve
    })

    const vm = new Component({
      propsData,
      watch: {
        show: show => {
          if (!show) {
            close(vm.resolve)
          }
        }
      }
    })

    vm.$mount() // $mount 必须在 show = true 之前执行
    vm.show = true
    document.body.appendChild(vm.$el)

    // 等待打开动画结束
    const waitOpen = new Promise(resolve => {
      setTimeout(resolve, 300)
    })

    // 解决后，等待消失动画结束，再销毁组件
    wait.then(() => {
      setTimeout(() => vm.$destroy(), 300)
    })

    return {
      vm,
      wait,
      close: () => {
        waitOpen.then(() => {
          vm.show = false
          close(vm.resolve)
        })
      }
    }
  }

  alert (options) {
    return this._create('alert', options, this.AlertComponent)
  }

  confirm (options) {
    return this._create('confirm', options, this.ConfirmComponent)
  }

  message (options) {
    return this._create('message', options, this.MessageComponent)
  }

  info (options) {
    if (typeof options === 'string') options = { content: options }
    options.color = 'info'
    return this._create('message', options, this.MessageComponent)
  }

  success (options) {
    if (typeof options === 'string') options = { content: options }
    options.color = 'success'
    return this._create('message', options, this.MessageComponent)
  }

  error (options) {
    if (typeof options === 'string') options = { content: options }
    options.color = 'error'
    return this._create('message', options, this.MessageComponent)
  }

  loading (options) {
    this.loaded()
    this._loading = this._create('loading', options, this.LoadingComponent)
    return this._loading
  }

  loaded () {
    if (this._loading) {
      this._loading.close()
    }
  }
}
