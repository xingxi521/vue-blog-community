<template>
  <div class="tabbar-main">
    <div class="app-container">
      <ul class="bar-ul">
        <li v-for="item in menuList" :key="item.value"><a href="" :class="{ 'active-text' : currentPage === item.value }" @click.prevent="clickMenuHandler(item.value)">{{ item.title }}</a></li>
        <li v-if="isLogin"><span class="line" /></li>
        <li v-if="isLogin"><a href="">我发表的贴</a></li>
        <li v-if="isLogin"><a href="">我收藏的贴</a></li>
        <li class="app-hide-sm">
          <a-button type="primary">
            发表新帖
          </a-button>
        </li>
      </ul>
      <div class="bar-right app-hide-xs">
        <a-icon type="search" class="search-ico" />
        <a-button type="primary">
          发表新帖
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TabBar',
  props: {
    // 当前页面
    currentPage: {
      type: String,
      default: 'index'
    }
  },
  data() {
    return {
      // 菜单配置
      menuList: [
        {
          title: '首页',
          value: 'index'
        },
        {
          title: '提问',
          value: 'ask'
        },
        {
          title: '讨论',
          value: 'disscussion'
        },
        {
          title: '建议',
          value: 'suggest'
        },
        {
          title: '公告',
          value: 'notice'
        },
        {
          title: '动态',
          value: 'dynamic'
        }
      ]
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    // 点击菜单事件
    clickMenuHandler(value) {
      this.$emit('onClick', value)
    }
  }
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
    @media (max-width: 768px) {
      .bar-ul{
        height: auto;
        li{
          width: 33.33%;
        }
      }
      // .bar-right{
      //   bottom: 0px;
      //   top: 49%;
      // }
    }
  }
</style>
