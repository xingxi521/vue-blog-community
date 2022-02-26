<template>
  <div class="app-container">
    <div class="center-left app-hide-xs">
      <a-menu
        v-model="selectedKeys"
        mode="inline"
        theme="dark"
        @click="menuClickHandler"
      >
        <a-menu-item key="my">
          <a-icon type="pie-chart" />
          <span>我的主页</span>
        </a-menu-item>
        <a-menu-item key="user">
          <a-icon type="desktop" />
          <span>用户中心</span>
        </a-menu-item>
        <a-menu-item key="setting">
          <a-icon type="inbox" />
          <span>基本设置</span>
        </a-menu-item>
        <a-menu-item key="post">
          <a-icon type="inbox" />
          <span>我的帖子</span>
        </a-menu-item>
        <a-menu-item key="message">
          <a-icon type="inbox" />
          <span>我的消息</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="center-right box-panel">
      <router-view />
    </div>
  </div>
</template>

<script>
/**
 * 个人中心
 */
export default {
  name: 'Center',
  data() {
    return {
      selectedKeys: []
    }
  },
  mounted() {
    this.selectedKeys = this.$stroage.getItem('currentCenter') || ['user']
  },
  destroyed() {
    this.selectedKeys = this.$stroage.setItem('currentCenter', ['user'])
  },
  methods: {
    menuClickHandler({ key }) {
      if (this.selectedKeys[0] === key) return
      this.selectedKeys = [key]
      this.$stroage.setItem('currentCenter', [key])
      if (key === 'user') {
        this.$router.push({ name: 'UserCenter' }, () => {})
      } else if (key === 'setting') {
        this.$router.push({ name: 'Base' }, () => {})
      } else if (key === 'post') {
        this.$router.push({ name: 'MyPost' }, () => {})
      }
    },
    setSelectKeys(value) {
      this.selectedKeys = [value]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
  .app-container{
    min-height: 600px;
    @media (max-width: 768px) {
      .center-right{
        margin-left: 0px !important;
      }
    }
    .center-left{
      width: 200px;
      position: absolute;
      top: 0;
      bottom: 0;
      background: #393D49;
    }
    .ant-menu-dark, .ant-menu-dark .ant-menu-sub{
      background: #393D49;
    }
    .center-right{
      margin-left: 220px;
      padding: $spacing-row-lg;
    }
  }
</style>
