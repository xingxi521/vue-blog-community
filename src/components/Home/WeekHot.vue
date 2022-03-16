<template>
  <div class="box-panel">
    <h3 class="box-panel-title">本周热议</h3>
    <div class="hot-box">
      <div v-for="item in topData" :key="item._id" class="hot-box-item">
        <router-link :to="{ name:'PostDetails', params: {id:item._id} }">{{ item.title }}</router-link>
        <span>
          <i class="iconfont icon-pinglun1" />
          {{ item.answer }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopWeek } from '@/api/public'
export default {
  name: 'WeekHot',
  data() {
    return {
      topData: []
    }
  },
  mounted() {
    this.getTopWeekRequest()
  },
  methods: {
    getTopWeekRequest() {
      getTopWeek().then(res => {
        this.topData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.hot-box{
  padding: $spacing-row-lg;
  .hot-box-item{
    &:hover{
      color: $text-colo-hover;
      cursor: pointer;
    }
    span{
      color: #ccc;
      margin-left: 10px;
      i{
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>
