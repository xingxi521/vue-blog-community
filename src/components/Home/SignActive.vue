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
            <li>
              <img src="../../assets/avr.png" alt="">
              <span class="sign-nickName">CoderX</span>
              <span class="sign-desc">签到于 2022-02-12</span>
            </li>
            <li>
              <img src="../../assets/avr.png" alt="">
              <span class="sign-nickName">CoderX</span>
              <span class="sign-desc">签到于 2022-02-12</span>
            </li>
          </ul>
        </a-tab-pane>
        <a-tab-pane key="nowFask" tab="今日最快" force-render>
          <ul class="ul-box">
            <li>
              <img src="../../assets/avr.png" alt="">
              <span class="sign-nickName">CoderX</span>
              <span class="sign-desc">签到于 2022-02-12</span>
            </li>
            <li>
              <img src="../../assets/avr.png" alt="">
              <span class="sign-nickName">CoderX</span>
              <span class="sign-desc">签到于 2022-02-12</span>
            </li>
          </ul>
        </a-tab-pane>
        <a-tab-pane key="total" tab="总签到榜">
          <ul class="ul-box">
            <li>
              <img src="../../assets/avr.png" alt="">
              <span class="sign-nickName">CoderX</span>
              <span class="sign-desc">已经连续签到 <span style="color:#ff5722;padding:0 3px;">8</span>天</span>
            </li>
            <li>
              <img src="../../assets/avr.png" alt="">
              <span class="sign-nickName">CoderX</span>
              <span class="sign-desc">已经连续签到 <span style="color:#ff5722;padding:0 3px;">8</span>天</span>
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
export default {
  name: 'SignActive',
  props: {
    // 显示开关
    isShow: {
      type: Boolean,
      default: false
    }
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
      console.log(activeKey)
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
