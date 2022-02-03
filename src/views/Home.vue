<template>
  <div class="home-main">
    <TabBar :current-page="currentPage" @onClick="menuClickHandler" />
    <div class="app-container">
      <a-row :gutter="7">
        <a-col :md="16">
          <!-- 置顶 -->
          <Stick v-if="currentPage === 'index'" />
          <!-- 主列表 -->
          <Content ref="content" :current-page="currentPage" />
        </a-col>
        <a-col :md="8">
          <Tips v-if="currentPage === 'index'" />
          <Sign v-if="currentPage === 'index'" />
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
  },
  data() {
    return {
      // 当前页面
      currentPage: 'index'
    }
  },
  methods: {
    // 菜单单击事件
    menuClickHandler(value) {
      if (this.currentPage === value) return
      this.currentPage = value
      // 发送网络请求
      this.$nextTick(() => {
        this.$refs.content.reSetData()
      })
    }
  }
}
</script>
