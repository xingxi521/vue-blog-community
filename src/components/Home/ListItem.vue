<template>
  <div class="list-item-main">
    <div class="list-item-left">
      <img src="../../assets/avr.png" alt="">
    </div>
    <div class="list-item-right">
      <div class="list-item-top">
        <div class="top-left">
          <span class="item-tag">分享</span>
          <span class="top-title">大前端课程中权限内容和实现方式？</span>
        </div>
        <div class="top-right">2</div>
      </div>
      <div class="list-item-bottom">
        <div class="bottom-left">
          <a href="javascript:;">IT学习者</a>
          <span class="left-time">2022-01-27</span>
          <span class="left-fav"><i class="iconfont icon-kiss" />20</span>
        </div>
        <div class="bottom-right">
          <i class="iconfont icon-pinglun1" />
          6
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 列表子项
 */
export default {
  name: 'ListItem'
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.list-item-main{
  display: flex;
  padding: $spacing-col-base 0;
  .list-item-left{
    img{
      width: 45px;
      height: 45px;
    }
  }
  .list-item-right{
    padding-left: $spacing-row-base;
    flex: 1;
    .list-item-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-col-sm;
      .top-left{
        .top-title{
          color: $text-color;
          font-size: $font-size-lg;
          padding-left: $spacing-row-base;
          cursor: pointer;
          transition: color .2s;
          &:hover{
            color: $text-colo-hover;
          }
        }
      }
    }
    .item-tag{
      border: 1px solid $text-colo-hover;
      border-radius: 3px;
      color: $text-colo-hover;
      padding: 0 $spacing-row-sm;
      font-size: $font-size-sm;
    }
    .list-item-bottom{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bottom-left{
        a, span{
          padding-right: $spacing-row-lg;
        }
        .left-time{
          color: $text-color-grey;
        }
        .left-fav{
          color: #ff5722;
          i{
            font-size: 18px;
            padding-right: $spacing-row-sm;
          }
        }
        a{
          &:hover{
            color: $text-colo-hover;
          }
        }
      }
      .bottom-right{
        i{
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
