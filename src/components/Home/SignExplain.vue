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
      <p class="sign-title">“签到”可获得的社区积分，规则如下</p>
      <a-table :columns="tableColum" :data-source="tableData" bordered :pagination="false" />
      <p class="sign-desc">中间若有间隔，则连续天数重新计算</p>
      <p class="sign-desc1">不可复用程序自动签到，否则积分清零</p>
    </a-modal>
  </div>
</template>

<script>
/**
 * 签到说明
 */
export default {
  name: 'SignExplain',
  props: {
    // 显示开关
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 表格数据
      tableData: [
        {
          continuous: '<5',
          fav: '5'
        },
        {
          continuous: '≥5',
          fav: '10'
        },
        {
          continuous: '≥15',
          fav: '15'
        },
        {
          continuous: '≥30',
          fav: '20'
        },
        {
          continuous: '≥100',
          fav: '30'
        },
        {
          continuous: '≥365',
          fav: '50'
        }
      ],
      // 表格列项
      tableColum: [
        {
          title: '连续签到天数',
          dataIndex: 'continuous',
          key: 'continuous'
        },
        {
          title: '每天可获积分',
          dataIndex: 'fav',
          key: 'fav'
        }
      ]
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.sign-title{
  background-color: $bg-color-hover;
  padding: $spacing-col-lg;
  border-left: 5px solid $text-colo-hover;
}
.sign-desc{
  margin: $spacing-col-base 0;
}
.sign-desc1{
  color: #ff5722;
}
</style>
