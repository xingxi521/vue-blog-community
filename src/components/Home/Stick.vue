<template>
  <div class="box-panel">
    <h3 class="box-panel-title">置顶</h3>
    <div class="stick-box">
      <List :list-data="listData" />
      <a-skeleton :loading="dataLoading" active avatar />
    </div>
  </div>
</template>

<script>
/**
 * 置顶
 */
import List from '@/components/Home/List.vue'
import { getArticleList } from '@/api/public'
export default {
  name: 'Stick',
  components: {
    List
  },
  data() {
    return {
      listData: [],
      // 数据加载状态
      dataLoading: false
    }
  },
  mounted() {
    this.getArticleListRequest()
  },
  methods: {
    // 获取置顶数据
    getArticleListRequest() {
      this.dataLoading = true
      getArticleList({
        type: 'index',
        status: '',
        isTop: 1,
        tags: '',
        sort: '',
        pageSize: 5,
        pageNum: 1
      }).then(res => {
        this.listData = res.data.records
        this.dataLoading = false
      }).catch(error => {
        console.log(error)
        this.dataLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.stick-box{
  padding: $spacing-row-sm $spacing-row-lg $spacing-row-sm $spacing-row-lg;
}
</style>
