<template>
  <section class="login-container">
    <el-form ref="form" :model="form" :rules="rules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title" v-text="T('name')"></h3>
        <language-selector class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="icon-container">
          <i class="fas fa-user"></i>
        </span>
        <el-input
          ref="username"
          v-model="form.username"
          :placeholder="T('username')"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" :content="T('capsLockIsOn')" placement="right" manual>
        <el-form-item prop="password">
          <span class="icon-container">
            <i class="fas fa-key"></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="form.password"
            :type="passwordType"
            :placeholder="T('password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapsLock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <i class="fas" :class="[ passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye' ]"></i>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        type="primary"
        style="width:100%;margin:20px 0;"
        :loading="loading"
        @click.native.prevent="handleLogin"
      >
        {{ $t('common.login') }}
      </el-button>
    </el-form>
  </section>
</template>

<script>
import metaMixin from '@/core/meta/mixin'
import LanguageSelector from '@/components/LanguageSelector'

const namespace = 'views.Login'
export default {
  namespace,
  mixins: [metaMixin],
  components: {
    LanguageSelector
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: this.T('usernameNotEmpty') }],
        password: [{ required: true, trigger: 'blur', message: this.T('passwordNotEmpty') }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler (route) {
        const { redirect, ...otherQuery } = route.query
        if (redirect) this.redirect = redirect
        this.otherQuery = otherQuery
      },
      immediate: true
    }
  },
  methods: {
    checkCapsLock ({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if ((shiftKey && key >= 'a' && key <= 'z') || (!shiftKey && key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.form)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    if (!this.form.username) {
      this.$refs.username.focus()
    } else if (!this.form.password) {
      this.$refs.password.focus()
    }
  }
}
</script>

<style lang="less" scoped>
@bg: #2d3a4b;
@autoFillBg: #283443;
@darkGray: #889aa4;
@cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .icon-container {
    padding: 6px 5px 6px 15px;
    color: @darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @darkGray;
    cursor: pointer;
    user-select: none;
  }
}

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  /deep/ .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px @autoFillBg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  /deep/ .el-form-item {
    border: 1px solid rgba(255, 255, 255, .1);
    background: rgba(0, 0, 0, .1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
