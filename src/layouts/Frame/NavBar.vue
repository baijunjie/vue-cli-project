<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :active="sidebar.opened" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <language-selector class="right-menu-item hover-effect" />

      <el-dropdown trigger="click" class="right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar | cdn" class="user-avatar">
          <i v-else class="fas fa-user user-icon"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('views.Home.name') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <div @click="logout">{{ $t('common.logout') }}</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LanguageSelector from '@/components/LanguageSelector'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LanguageSelector
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      avatar: state => state.user.info && state.user.info.avatar
    })
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push({ name: 'login', query: { redirect: this.$route.fullPath } })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/_.less';

.navbar {
  height: @headerHeight;
  line-height: @headerHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    margin-right: 20px;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      height: 100%;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        cursor: pointer;
      }

      .user-icon {
        font-size: 20px;
      }
    }
  }
}
</style>
