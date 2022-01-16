<template>
  <div id="app">
    <Headers/>
    <router-view />
    <Footer />
  </div>
</template>
<script>
export default {
  components: {
    Headers: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer')
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
