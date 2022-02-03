<template>
  <div class="list-item-main">
    <div class="list-item-left">
      <img src="../../assets/avr.png" alt="">
    </div>
    <div class="list-item-right">
      <div class="list-item-top">
        <div class="top-left">
          <span class="item-tag">{{ mappingType(item.type) }}</span>
          <span class="top-title">{{ item.title }}</span>
        </div>
        <div class="top-right">
          <span v-for="tag in item.tags" :key="`tag_${tag.title}`" :class="tag.className">{{ tag.title }}</span>
        </div>
      </div>
      <div class="list-item-bottom">
        <div class="bottom-left">
          <a href="javascript:;">{{ item.userInfo.nickName }}<span v-if="item.userInfo.vip === 1" class="left-vip badge-red">VIP</span></a>
          <span class="left-time">{{ formatCreateTime(item.createTime) }}</span>
          <span class="left-fav"><i class="iconfont icon-kiss" />{{ item.fav }}</span>
        </div>
        <div class="bottom-right">
          <i class="iconfont icon-pinglun1" />
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 列表子项
 */
import { ARTICLE_TYPE } from '@/utils/const/home'
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 映射文章类型
    mappingType(value) {
      return ARTICLE_TYPE.getDescFromValue(value)
    },
    // 格式化时间
    formatCreateTime(value) {
      const beforeSeven = this.dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss')
      const createTime = this.dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      if (createTime < beforeSeven) {
        return this.dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return this.dayjs(value).fromNow()
      }
    }
  }
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
        .left-vip{
          padding: 0 6px;
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
