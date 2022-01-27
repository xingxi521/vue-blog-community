<template>
  <div class="box-panel">
    <div class="box-panel-title">
      <div class="panel-left">
        <a href="javascript:;">综合</a>
        <span class="line" />
        <a href="javascript:;">未结</a>
        <span class="line" />
        <a href="javascript:;">已结</a>
        <span class="line" />
        <a href="javascript:;">精华</a>
      </div>
      <div class="panel-left">
        <a href="javascript:;">按最新</a>
        <span class="line" />
        <a href="javascript:;">按热议</a>
      </div>
    </div>
    <div class="content-box">
      <List />
    </div>
  </div>
</template>

<script>
/**
 * 主列表
 */
import List from '@/components/Home/List.vue'
export default {
  name: 'Cotent',
  components: {
    List
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
</style>
