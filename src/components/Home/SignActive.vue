<template>
  <div>
    <a-modal
      title="签到说明"
      :visible="isShow"
      ok-text="确定"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-tabs default-active-key="new" @change="changeKeyHandler">
        <a-tab-pane key="new" tab="最新签到">
          <ul class="ul-box">
            <li v-for="item in newSignData" :key="item._id">
              <img :src="env === 'development' ? config.baseUrl.dev + item.uid.pic : config.baseUrl.prod + item.uid.pic" alt="">
              <span class="sign-nickName">{{ item.uid.nickName }}</span>
              <span class="sign-desc">签到于 {{ formatCreateTime(item.createTime) }}</span>
            </li>
          </ul>
        </a-tab-pane>
        <a-tab-pane key="nowFask" tab="今日最快" force-render>
          <ul class="ul-box">
            <li v-for="item in faskSignData" :key="item._id">
              <img :src="env === 'development' ? config.baseUrl.dev + item.uid.pic : config.baseUrl.prod + item.uid.pic" alt="">
              <span class="sign-nickName">{{ item.uid.nickName }}</span>
              <span class="sign-desc">签到于 {{ formatCreateTime(item.createTime) }}</span>
            </li>
          </ul>
        </a-tab-pane>
        <a-tab-pane key="total" tab="总签到榜">
          <ul class="ul-box">
            <li v-for="item in topSignData" :key="item._id">
              <img :src="env === 'development' ? config.baseUrl.dev + item.pic : config.baseUrl.prod + item.pic" alt="">
              <span class="sign-nickName">{{ item.nickName }}</span>
              <span class="sign-desc">已经连续签到 <span style="color:#ff5722;padding:0 3px;">{{ item.count }}</span>天</span>
            </li>
          </ul>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
/**
 * 签到活跃榜
 */
import { getNewSign, getFaskSign, getTopSign } from '@/api/public'
import { formatCreateTime } from '@/utils/public'
import config from '@/config'
export default {
  name: 'SignActive',
  props: {
    // 显示开关
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      config,
      env: process.env.NODE_ENV,
      // 最新签到数据
      newSignData: [],
      // 今日最快签到数据
      faskSignData: [],
      // 签到总榜
      topSignData: []
    }
  },
  mounted() {
    getNewSign().then(res => {
      this.newSignData = res.data
    })
  },
  methods: {
    // 确定按钮事件
    handleOk() {
      this.$emit('update:isShow', false)
    },
    // 取消按钮事件
    handleCancel() {
      this.$emit('update:isShow', false)
    },
    // 改变tabs事件
    changeKeyHandler(activeKey) {
      if (activeKey === 'new') { // 最新签到记录
        getNewSign().then(res => {
          this.newSignData = res.data
        })
      } else if (activeKey === 'nowFask') { // 今日最快
        getFaskSign().then(res => {
          this.faskSignData = res.data
        })
      } else if (activeKey === 'total') { // 签到总榜
        getTopSign().then(res => {
          this.topSignData = res.data
        })
      }
    },
    formatCreateTime(time) {
      return formatCreateTime(time)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.ul-box{
  li {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid $border-color;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
    .sign-desc{
      flex: 1;
      text-align: right;
    }
    .sign-nickName{
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #ff5722;
      padding: 0 $spacing-row-base;
      &:hover{
        color: $text-colo-hover;
      }
    }
  }
}
</style>
