<template>
  <div class="box-panel">
    <h3 class="box-panel-title">友情链接</h3>
    <div class="link-box">
      <dd><a href="">百度</a></dd>
      <dd><a href="">网易</a></dd>
      <dd><a href="">QQ</a></dd>
      <dd><a href="">GitHub</a></dd>
      <dd><a href="">慕课网</a></dd>
    </div>
  </div>
</template>

<script>
/**
 * 友情链接
 */
export default {
  name: 'Link'
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
