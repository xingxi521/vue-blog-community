<template>
  <div class="box-panel">
    <h3 class="box-panel-title">温馨通道</h3>
    <div class="tips-box">
      <ul class="tips-box-ul">
        <li><a href="">test</a></li>
        <li><a href="">test</a></li>
        <li><a href="">test</a></li>
        <li><a href="">test</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 温馨通道
 */
export default {
  name: 'Tips'
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
