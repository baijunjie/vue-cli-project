<template>
  <section id="login">
    <v-language-toggle class="language-toggle"></v-language-toggle>
    <div class="title" v-text="T('name')"></div>
    <div class="box">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">

        <el-form-item :label="T('userName')" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>

        <el-form-item :label="T('password')" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>

        <el-button
          type="primary"
          class="submit full"
          @click="submit"
          v-text="T('login')"
        ></el-button>
      </el-form>
    </div>
  </section>
</template>

<script>
import metaMixin from '@/core/meta/mixin'
import LanguageToggle from '@/components/LanguageToggle'
import { setStorage } from '@/utils'

const namespace = 'views.Login'
export default {
  namespace,
  mixins: [metaMixin],
  components: {
    vLanguageToggle: LanguageToggle
  },

  data () {
    return {
      form: {
        userName: '',
        password: ''
      },

      rules: {
        userName: { required: true, message: this.T('userNameNotEmpty'), trigger: 'change' },
        password: { required: true, message: this.T('passwordNotEmpty'), trigger: 'change' }
      }
    }
  },

  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    login () {
      const loading = this.$loading({
        target: this.$refs['form'].$el
      })

      // 模拟登录
      setTimeout(() => {
        loading.close()

        // 模拟用户数据
        const userData = {
          createDate: Date.now()
        }

        setStorage('userData', userData)

        console.log('login success!')

        this.$router.push({
          name: 'home'
        })
      }, 1000)
    }
  }
}
</script>

<style lang="less">
@import '~less-lib';

#login {
  height: 100%;
  .lgy3(@blue, @sky, 50%, @green);
  .flex();
  .flex-y();
  .flex-center();

  .title {
    margin-top: -80px;
    .ftsz(50px);
    letter-spacing: 10px;
    color: #fff;
    .text-glow();
  }

  .box {
    margin-top: 40px;
    padding: 20px;
    .bgcl(#fff);
    .bxsd(thin);
  }

  .submit {
    margin-top: 20px;
  }

  .language-toggle {
    position: absolute;
    top: 20px;
    right: 40px;
  }
}
</style>
