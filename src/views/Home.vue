<template>
  <div class="home-main">
    <TabBar />
    <div class="app-container">
      <a-row :gutter="7">
        <a-col :md="16">
          <Stick />
          <Content />
        </a-col>
        <a-col :md="8">
          <Tips />
          <Sign />
          <WeekHot />
          <Link />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
export default {
  name: 'Home',
  components: {
    TabBar,
    Tips: () => import('@/components/Home/Tips.vue'),
    Sign: () => import('@/components/Home/Sign.vue'),
    WeekHot: () => import('@/components/Home/WeekHot.vue'),
    Link: () => import('@/components/Home/Link.vue'),
    Stick: () => import('@/components/Home/Stick.vue'),
    Content: () => import('@/components/Home/Cotent.vue')
  }
}
</script>
