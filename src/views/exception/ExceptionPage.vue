<template>
  <div class="exception">
    <div class="exception__img">
      <img :src="config[type].img"/>
    </div>
    <div class="exception__content">
      <h1 class="exception__title">{{ config[type].title }}</h1>
      <div class="exception__desc">{{ $t(config[type].desc) }}</div>
      <div class="exception__action">
        <el-button type="primary" @click="backToHome">{{ $t('common.backToHome') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import metaMixin from '@/core/meta/mixin'
import types from './type'

const namespace = 'views.exception'
export default {
  namespace,
  mixins: [metaMixin],
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data () {
    return {
      config: types
    }
  },
  methods: {
    backToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.exception {
  min-height: 500px;
  height: 80%;
  align-items: center;
  text-align: center;
  margin-top: 150px;

  &__img {
    display: inline-block;
    padding-right: 52px;
    zoom: 1;

    img {
      height: 360px;
      max-width: 430px;
    }
  }

  &__content {
    display: inline-block;
    flex: auto;
  }

  &__title {
    color: #434e59;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    margin-bottom: 24px;
  }

  &__desc {
    color: rgba(0, 0, 0, .45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }
}

.mobile {
  .exception {
    margin-top: 30px;

    &__img {
      padding-right: unset;

      img {
        height: 40%;
        max-width: 80%;
      }
    }
  }
}
</style>
