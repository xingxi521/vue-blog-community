<template>
  <div v-show="isShow" ref="pop" class="pop-main" :class="{ 'shake': type === 'shake' }">
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script>
/**
 * Pop抖动组件
 */
export default {
  name: 'Pop',
  props: {
    // 显示开关
    isShow: {
      type: Boolean,
      default: false
    },
    // 展示文本内容
    msg: {
      type: String,
      default: ''
    },
    // pop类型
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        setTimeout(() => {
          const width = this.$refs.pop.clientWidth
          const height = this.$refs.pop.clientHeight
          this.$refs.pop.style.marginLeft = -width / 2 + 'px'
          this.$refs.pop.style.marginTop = -height / 2 + 'px'
        }, 0)
        setTimeout(() => {
          this.isShow = false
          this.msg = ''
          this.type = ''
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-main {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2000;
  animation-fill-mode: both;
  animation-duration: 0.3s;
  .content{
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 10px 15px;
    border-radius: 6px;
  }
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}
.shake {
  animation-name: shake;
}
</style>
