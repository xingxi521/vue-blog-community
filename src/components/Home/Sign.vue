<template>
  <div class="box-panel">
    <div class="box-panel-title">
      签到
      <span class="line" />
      <a href="javascript:;">说明</a>
      <span class="line" />
      <a href="javascript:;">活跃榜</a>
      <span class="sign-day">已连续签到<cite>1</cite>天</span>
    </div>
    <div class="sign-main">
      <a-button type="primary">今日签到</a-button>
      <span class="sign-fav">可获得5个积分</span>
    </div>
  </div>
</template>

<script>
/**
 * 签到
 */
export default {
  name: 'Sign'
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.box-panel-title{
  position: relative;
  .sign-day{
    position: absolute;
    right: 15px;
    padding-left: $spacing-row-base;
    color: $text-color-grey;
    cite{
      padding: 0 $spacing-row-sm;
      color: #ff5722;
      font-style: normal;
    }
  }
}
.sign-main{
  padding: 24px $spacing-row-lg;
  text-align: center;
  .sign-fav{
    margin-left: $spacing-row-base;
  }
}
</style>
