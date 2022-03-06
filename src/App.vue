<template>
  <a-config-provider :locale="locales.zh_CN">
    <div id="app">
      <Headers />
      <router-view />
      <Footer />
    </div>
  </a-config-provider>
</template>
<script>
import { locales } from 'ant-design-vue/dist/antd-with-locales'
export default {
  components: {
    Headers: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer')
  },
  data() {
    return {
      locales
    }
  }
}
</script>
<style lang="scss">
@import "@/style/global.scss";
#app{
  height: 100%;
  overflow-y: auto;
}
</style>
