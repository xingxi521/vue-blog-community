<template>
  <div class="comment-item-main">
    <div class="detail-userinfo">
      <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="">
      <div class="userinfo-right">
        <div class="userinfo-right-top">
          <span class="top-nickname">CoderX</span>
          <span class="badge badge-red">VIP3</span>
        </div>
        <div class="userinfo-right-bottom">
          <span class="top-time">2022-03-06</span>
        </div>
      </div>
    </div>
    <div class="comment-content">
      这是评论的内容
    </div>
    <div class="comment-bottom">
      <div class="comment-bottom-left">
        <i class="iconfont icon-zan" /><span class="zan-conut">999</span>
        <i class="iconfont icon-svgmoban53" /><span class="zan-conut">回复</span>
      </div>
      <div class="comment-bottom-right">
        <span class="edit">编辑</span>
        <span class="del">删除</span>
        <span class="accept">采纳</span>
      </div>
    </div>
  </div>

</template>

<script>
/**
 * 评论项组件
 */
export default {
  name: 'CommentItem'
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.comment-item-main{
  padding-bottom: $spacing-col-lg;
  border-bottom: 1px solid #DFDFDF;
  .detail-userinfo{
    color: $text-color-grey;
    padding: $spacing-col-lg $spacing-row-lg;
    margin-top: $spacing-col-base;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img{
      width: 45px;
      height: 45px;
    }
    .userinfo-right{
      flex: 1;
      padding-left: $spacing-row-base;
      .userinfo-right-top{
        .top-nickname{
          color: #01AAED;
          cursor: pointer;
          &:hover{
            color: $text-colo-hover;
          }
        }
      }
      .userinfo-right-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn-group{
          .bottom-editpost{
            font-size: $font-size-sm;
            margin-left: $spacing-row-sm;
          }
        }
      }
    }
  }
  .comment-content{
    padding: $spacing-col-base $spacing-row-lg;
  }
  .comment-bottom{
    padding: $spacing-col-base $spacing-row-lg;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .comment-bottom-left{
      i{
        font-size: 20px;
        color: $text-color-grey;
        padding: 0 $spacing-col-sm 0 $spacing-row-lg;
        vertical-align: middle;
        cursor: pointer;
        &:first-child{
          padding: 0 $spacing-col-sm 0 0;
        }
      }
      .icon-zan{
        &:hover{
          color: #c00;
        }
      }
      .zan-conut{
        position: relative;
        top: 3px;
      }
    }
    .comment-bottom-right{
      span{
        color: $text-color-grey;
        padding-right: $spacing-row-lg;
        cursor: pointer;
      }
    }
  }
}

</style>
