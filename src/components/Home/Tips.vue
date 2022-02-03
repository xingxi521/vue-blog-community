<template>
  <div class="box-panel">
    <h3 class="box-panel-title">温馨通道</h3>
    <div class="tips-box">
      <ul class="tips-box-ul">
        <li v-for="item in listData" :key="item._id"><a :href="item.link" target="_blank">{{ item.title }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 温馨通道
 */
import { getLinkList } from '@/api/public'
export default {
  name: 'Tips',
  data() {
    return {
      // 温馨通道数据
      listData: []
    }
  },
  mounted() {
    this.getLinkListRequest()
  },
  methods: {
    // 获取友情链接、温馨通道列表数据
    getLinkListRequest() {
      getLinkList({
        type: 'tips'
      }).then(res => {
        this.listData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.tips-box{
  padding: $spacing-row-lg;
  .tips-box-ul{
    clear: both;
    overflow: hidden;
    li{
      width: 50%;
      float: left;
      display: block;
      a{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #f2f2f2;
        color: #333;
        &:hover{
          color: $text-colo-hover;
        }
      }
    }
  }
}
</style>
