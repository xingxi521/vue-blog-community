<template>
  <div class="details-main">
    <TabBar :current-page="currentPage" @onClick="menuClickHandler" />
    <div class="app-container">
      <a-row :gutter="7">
        <a-col :md="16">
          <!-- 文章详情主内容 -->
          <PostContent :content="postData" />
          <!-- 回贴模块 -->
          <PostComment />
        </a-col>
        <a-col :md="8">
          <Tips />
          <WeekHot />
          <Link />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
/**
 * 文章详情
 */
import TabBar from '@/components/TabBar'
import { getPostDetails } from '@/api/public'
export default {
  name: 'PostDetails',
  components: {
    TabBar,
    Tips: () => import('@/components/Home/Tips.vue'),
    WeekHot: () => import('@/components/Home/WeekHot.vue'),
    Link: () => import('@/components/Home/Link.vue'),
    PostContent: () => import('@/views/Post/PostContent.vue'),
    PostComment: () => import('@/views/Post/PostComment.vue')
  },
  data() {
    return {
      // 当前页面
      currentPage: 'index',
      // 文章详情数据
      postData: {}
    }
  },
  mounted() {
    this.getPostDetailsRequest()
  },
  methods: {
    // 菜单单击事件
    menuClickHandler(value) {
      this.$router.push({ name: 'Home' })
    },
    // 获取文章详情数据
    getPostDetailsRequest() {
      getPostDetails({
        tid: this.$route.params.id
      }).then(res => {
        this.postData = res.data
      })
    }
  }
}
</script>
