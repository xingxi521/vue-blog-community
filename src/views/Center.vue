<template>
  <div class="app-container">
    <div class="center-left app-hide-xs">
      <a-menu
        :default-selected-keys="['user']"
        mode="inline"
        theme="dark"
      >
        <a-menu-item key="my">
          <a-icon type="pie-chart" />
          <span>我的主页</span>
        </a-menu-item>
        <a-menu-item key="user">
          <a-icon type="desktop" />
          <span>用户中心</span>
        </a-menu-item>
        <a-menu-item key="setting">
          <a-icon type="inbox" />
          <span>基本设置</span>
        </a-menu-item>
        <a-menu-item key="post">
          <a-icon type="inbox" />
          <span>我的帖子</span>
        </a-menu-item>
        <a-menu-item key="message">
          <a-icon type="inbox" />
          <span>我的消息</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="center-right box-panel">
      <div class="center-title">欢迎<span style="color:#009688">{{ userInfo.nickName }}</span>来到C社区用户中心</div>
      <a-row :gutter="16">
        <a-col :md="12">
          <div class="box-panel">
            <h3 class="box-panel-title">我的会员信息</h3>
            <div class="vip-info-box">
              <p>积分经验值：1000</p>
              <p>您当前为：非VIP</p>
            </div>
          </div>
        </a-col>
        <a-col :md="12">
          <Sign />
        </a-col>
        <a-col :md="24">
          <div class="box-panel">
            <h3 class="box-panel-title">快捷方式</h3>
            <a-row class="box-row" :gutter="16">
              <a-col v-for="item in shortMenu" :key="item.title" :xs="8" :md="6">
                <a class="box-item">
                  <div class="box-item-icon"><a-icon :type="item.icon" /></div>
                  <div class="box-item-title">{{ item.title }}</div>
                </a>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心
 */
import { mapState } from 'vuex'
export default {
  name: 'Center',
  components: {
    Sign: () => import('@/components/Home/Sign.vue')
  },
  data() {
    return {
      shortMenu: [
        {
          icon: 'setting',
          title: '修改信息',
          link: ''
        },
        {
          icon: 'smile',
          title: '修改头像',
          link: ''
        },
        {
          icon: 'lock',
          title: '修改密码',
          link: ''
        },
        {
          icon: 'project',
          title: '发表新帖',
          link: ''
        },
        {
          icon: 'hdd',
          title: '我的收藏',
          link: ''
        },
        {
          icon: 'user',
          title: '我的帖子',
          link: ''
        }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
  .app-container{
    min-height: 600px;
    @media (max-width: 768px) {
      .center-right{
        margin-left: 0px !important;
      }
    }
    .center-left{
      width: 200px;
      position: absolute;
      top: 0;
      bottom: 0;
      background: #393D49;
    }
    .ant-menu-dark, .ant-menu-dark .ant-menu-sub{
      background: #393D49;
    }
    .center-right{
      margin-left: 220px;
      padding: $spacing-row-lg;
      .center-title{
        background: #f8f8f8;
        padding: $spacing-col-base $spacing-row-lg;
        margin-bottom: $spacing-col-lg;
      }
      .vip-info-box{
        padding: 19px $spacing-row-lg;
        p{
          margin: 0;
        }
      }
      .box-row{
        padding: $spacing-col-lg $spacing-row-lg;
        .box-item{
          display: block;
          color: $text-color;
          .box-item-icon{
            text-align: center;
            color: $text-color-inverse;
            background: $text-colo-hover;
            padding: $spacing-row-base;
            font-size: 24px;
          }
          .box-item-title{
            text-align: center;
            padding: $spacing-col-base 0;
          }
        }
      }
    }
  }
</style>
