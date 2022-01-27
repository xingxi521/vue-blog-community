<template>
  <div class="box-panel">
    <h3 class="box-panel-title">本周热议</h3>
    <div class="hot-box">
      <div class="hot-box-item">
        这是本周的一个热议
        <span>
          <i class="iconfont icon-pinglun1"></i>
          0
        </span>
      </div>
      <div class="hot-box-item">
        这是本周的一个热议
        <span>
          <i class="iconfont icon-pinglun1"></i>
          0
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeekHot'
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
      i{
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>
