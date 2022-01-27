<template>
  <div class="tabbar-main">
    <div class="app-container">
      <ul class="bar-ul">
        <li><a href="">首页</a></li>
        <li><a href="">提问</a></li>
        <li><a href="">讨论</a></li>
        <li><a href="">建议</a></li>
        <li><a href="">公告</a></li>
        <li><a href="">动态</a></li>
        <li><span class="line" /></li>
        <li><a href="">我发表的贴</a></li>
        <li><a href="">我收藏的贴</a></li>
      </ul>
      <div class="bar-right">
        <a-icon type="search" class="search-ico" />
        <a-button type="primary">
          发表新帖
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="scss" scoped>
  .tabbar-main{
    width: 100%;
    background: #fff;
    .bar-ul{
      height: 50px;
      line-height: 50px;
      li {
        display: inline-block;
        a{
          display: inline-block;
          padding: 0 20px;
          color: #333;
          &:hover{
            color: #5fb878;
          }
        }
      }
    }
    .bar-right{
      height: 50px;
      line-height: 50px;
      position: absolute;
      right: 0;
      top: 0;
      .search-ico{
        font-size: 20px;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        cursor: pointer;
        transition: color .3s;
        &:hover{
          color: #5fb878;
        }
      }
    }
  }
</style>
