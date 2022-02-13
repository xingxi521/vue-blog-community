<template>
  <div class="box-panel">
    <div class="box-panel-title">
      签到
      <span class="line" />
      <a @click.prevent="signExplainHandler">说明</a>
      <span class="line" />
      <a @click.prevent="signActiveHandler">活跃榜</a>
      <span class="sign-day">已连续签到<cite>{{ count }}</cite>天</span>
    </div>
    <div class="sign-main">
      <a-button v-if="!isSign" type="primary" @click="signHandler">今日签到</a-button>
      <a-button v-else type="primary" disabled>已签到</a-button>
      <span class="sign-fav">可获得{{ favs }}个积分</span>
    </div>
    <!-- 签到说明 -->
    <SignExplain :is-show.sync="explainShow" />
    <!-- 签到活跃榜 -->
    <SignActive :is-show.sync="activeShow" />
  </div>
</template>

<script>
/**
 * 签到
 */
import SignExplain from '@/components/Home/SignExplain.vue'
import SignActive from '@/components/Home/SignActive.vue'
import { getIsSign, sign } from '@/api/center'
import { mapState } from 'vuex'
export default {
  name: 'Sign',
  components: {
    SignExplain,
    SignActive
  },
  data() {
    return {
      // 签到说明显示开关
      explainShow: false,
      // 签到活跃榜显示开关
      activeShow: false,
      isSign: false,
      // 已连续签到的天数
      count: 0
    }
  },
  computed: {
    ...mapState(['isLogin']),
    favs: function() {
      let favs = 0
      if (this.count < 5) {
        favs = 5
      } else if (this.count >= 5 && this.count < 15) {
        favs = 10
      } else if (this.count >= 15 && this.count < 30) {
        favs = 10
      } else if (this.count >= 30 && this.count < 100) {
        favs = 20
      } else if (this.count >= 100 && this.count < 365) {
        favs = 30
      } else if (this.count >= 365) {
        favs = 50
      }
      return favs
    }
  },
  mounted() {
    this.getIsSignRequest()
  },
  methods: {
    // 获取今天是否已签到
    getIsSignRequest() {
      if (!this.isLogin) {
        return
      }
      getIsSign().then(res => {
        this.isSign = res.data.isSign
        this.count = res.data.count
      })
    },
    // 签到说明按钮事件
    signExplainHandler() {
      this.explainShow = true
    },
    // 签到活跃榜按钮事件
    signActiveHandler() {
      this.activeShow = true
    },
    // 签到按钮事件
    signHandler() {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      sign().then(res => {
        this.count = res.data.count
        this.getIsSignRequest()
      })
    }
  }
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
