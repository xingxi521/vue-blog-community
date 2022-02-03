<template>
  <div class="box-panel">
    <h3 class="box-panel-title">友情链接</h3>
    <div class="link-box">
      <dd v-for="item in listData" :key="item._id"><a :href="item.link" target="_blank">{{ item.title }}</a></dd>
    </div>
  </div>
</template>

<script>
/**
 * 友情链接
 */
import { getLinkList } from '@/api/public'
export default {
  name: 'Link',
  data() {
    return {
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
        type: 'link'
      }).then(res => {
        this.listData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.link-box{
  padding: $spacing-row-lg;
  dd{
    display: inline-block;
    a{
      line-height: 24px;
      padding-right: $spacing-row-lg;
      color: $text-color;
      &:hover{
        color: $text-colo-hover;
      }
    }
  }
}
</style>
