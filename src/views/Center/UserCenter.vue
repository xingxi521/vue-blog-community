<template>
  <div>
    <div class="center-title">欢迎<span style="color:#009688">{{ userInfo.nickName }}</span>来到C社区用户中心</div>
    <a-row :gutter="16">
      <a-col :md="12">
        <div class="box-panel">
          <h3 class="box-panel-title">我的会员信息</h3>
          <div class="vip-info-box">
            <p>积分经验值：{{ userInfo.favs }}</p>
            <p>您当前为：{{ userInfo.isVip ? 'vip': '非VIP' }}</p>
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
              <a class="box-item" @click="setMenuSelectHandler(item)">
                <div class="box-item-icon"><a-icon :type="item.icon" /></div>
                <div class="box-item-title">{{ item.title }}</div>
              </a>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/**
 * 用户中心
 */
import { getUserInfo } from '@/api/center'
export default {
  name: 'UserCenter',
  components: {
    Sign: () => import('@/components/Home/Sign.vue')
  },
  data() {
    return {
      shortMenu: [
        {
          icon: 'setting',
          title: '修改信息',
          link: '/center/base',
          name: 'updateInfo'
        },
        {
          icon: 'smile',
          title: '修改头像',
          link: '/center/base',
          name: 'updateImg'
        },
        {
          icon: 'lock',
          title: '修改密码',
          link: '/center/base',
          name: 'updatePassWord'
        },
        {
          icon: 'project',
          title: '发表新帖',
          link: ''
        },
        {
          icon: 'hdd',
          title: '我的收藏',
          link: '/center/mypost',
          name: 'myCollect'
        },
        {
          icon: 'user',
          title: '我的帖子',
          link: '/center/mypost',
          name: 'myPost'
        }
      ],
      // 用户信息
      userInfo: {}
    }
  },
  mounted() {
    this.getUserInfoRequest()
  },
  methods: {
    // 获取用户信息
    getUserInfoRequest() {
      getUserInfo().then(res => {
        this.userInfo = res.data
      })
    },
    setMenuSelectHandler(item) {
      if (item.link === '/center/base') {
        this.$parent.setSelectKeys('setting')
        this.$router.push({ path: item.link, query: {
          type: item.name
        }})
      } else if (item.link === '/center/mypost') {
        this.$parent.setSelectKeys('post')
        this.$router.push({ path: item.link, query: {
          type: item.name
        }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
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
</style>
