<template>
  <div class="box-panel">
    <div class="box-panel-title">
      <div class="panel-left">
        <a :class="{'active-text': !currentParams}" @click.prevent="barClickHandler()">综合</a>
        <span class="line" />
        <a :class="{'active-text': currentParams === 'unClose'}" @click.prevent="barClickHandler('unClose')">未结</a>
        <span class="line" />
        <a :class="{'active-text': currentParams === 'close'}" @click.prevent="barClickHandler('close')">已结</a>
        <span class="line" />
        <a :class="{'active-text': currentParams === 'essence'}" @click.prevent="barClickHandler('essence')">精华</a>
      </div>
      <div class="panel-left">
        <a :class="{'active-text': currentSort === 'created'}" @click.prevent="sortClickHandler('created')">按最新</a>
        <span class="line" />
        <a :class="{'active-text': currentSort === 'answer'}" @click.prevent="sortClickHandler('answer')">按热议</a>
      </div>
    </div>
    <div class="content-box">
      <List :list-data="contentListData" />
      <a-skeleton :loading="dataLoading" active avatar />
    </div>
    <div class="cotent-bottom">
      <a-button v-if="!isEnd" type="primary" ghost :disabled="dataLoading" @click="loadMoreHandler">加载更多</a-button>
      <div v-else class="nomore">没有更多数据了...</div>
    </div>
  </div>
</template>

<script>
/**
 * 主列表
 */
import List from '@/components/Home/List.vue'
import { getArticleList } from '@/api/public'
export default {
  name: 'Cotent',
  components: {
    List
  },
  props: {
    // 当前页面导航
    currentPage: {
      type: String,
      default: 'index'
    }
  },
  data() {
    return {
      // 主列表当前选中参数项
      currentParams: '',
      // 主列表当前搜索排序
      currentSort: 'created',
      // 主列表文章数据
      contentListData: [],
      // 每页显示条数
      pageSize: 20,
      // 当前页数
      pageNum: 1,
      // 总条数
      total: 0,
      // 是否初次加载
      isInit: true,
      // 是否全部数据加载完了
      isEnd: false,
      // 数据加载状态
      dataLoading: false
    }
  },
  mounted() {
    this.getArticleListRequest()
  },
  methods: {
    // 条件选中事件
    barClickHandler(value) {
      this.currentParams = value
      this.reSetData()
    },
    // 重置数据
    reSetData() {
      this.contentListData = []
      this.isInit = true
      this.isEnd = false
      this.pageSize = 20
      this.pageNum = 1
      this.total = 0
      this.getArticleListRequest()
    },
    // 排序搜索条件点击事件
    sortClickHandler(value) {
      this.currentSort = value
      this.reSetData()
    },
    // 加载更多按钮事件
    loadMoreHandler() {
      this.getArticleListRequest()
    },
    // 获取主列表文章分页数据
    getArticleListRequest() {
      this.dataLoading = true
      getArticleList({
        type: this.currentPage,
        status: this.currentParams === 'unClose' ? 0 : this.currentParams === 'close' ? 1 : '',
        isTop: 0,
        tags: this.currentParams === 'essence' ? this.currentParams : '',
        sort: this.currentSort,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        if (this.isInit) {
          this.contentListData = res.data.records
          this.isInit = false
        } else {
          this.contentListData = [...this.contentListData, ...res.data.records]
        }
        // 是否全部数据加载完了
        if (this.contentListData.length >= res.data.total) {
          this.isEnd = true
        }
        this.pageSize = res.data.pageSize
        this.pageNum = res.data.pageNum
        this.total = res.data.total
        this.dataLoading = false
      }).catch(error => {
        this.dataLoading = false
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.box-panel-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  a{
    color: $text-color;
    &:hover{
      color: $text-colo-hover;
    }
  }
}
.content-box{
  padding: $spacing-row-sm $spacing-row-lg $spacing-row-sm $spacing-row-lg;
}
.cotent-bottom{
  text-align: center;
  padding: $spacing-row-lg;
}
</style>
