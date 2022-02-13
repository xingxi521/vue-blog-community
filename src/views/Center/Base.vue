<template>
  <div>
    <a-tabs v-model="currentKey" default-active-key="updateInfo" @change="changeMenuHandler">
      <a-tab-pane key="updateInfo" tab="我的资料">
        <a-form-model
          ref="infoForm"
          :model="formData"
          :rules="rules"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item has-feedback label="昵称" prop="nickName" :colon="false">
            <a-input v-model="formData.nickName" autocomplete="off" placeholder="请输入昵称" />
          </a-form-model-item>
          <a-form-model-item has-feedback label="城市" prop="location" :colon="false">
            <a-input v-model="formData.location" autocomplete="off" placeholder="请输入城市" />
          </a-form-model-item>
          <a-form-model-item has-feedback label="性别" prop="gender" :colon="false">
            <a-radio-group v-model="formData.gender">
              <a-radio :value="0">
                男
              </a-radio>
              <a-radio :value="1">
                女
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item has-feedback label="个性签名" prop="personSign" :colon="false">
            <a-textarea placeholder="Basic usage" :rows="4" />
          </a-form-model-item>
          <a-button type="primary" style="width:100%;margin-bottom: 20px;">确认修改</a-button>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane key="updateImg" tab="头像" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="updatePassWord" tab="修改密码">
        <a-form-model
          ref="infoForm"
          :model="formData"
          :rules="rules"
          :label-col="{ span: 2 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item has-feedback label="当前密码" prop="passWord" :colon="false">
            <a-input v-model="formData.passWord" autocomplete="off" placeholder="请输入当前密码" />
          </a-form-model-item>
          <a-form-model-item has-feedback label="新的密码" prop="newPassword" :colon="false">
            <a-input v-model="formData.newPassword" autocomplete="off" placeholder="请输入新的密码" />
          </a-form-model-item>
          <a-form-model-item has-feedback label="确认密码" prop="confirmPassword" :colon="false">
            <a-input v-model="formData.confirmPassword" autocomplete="off" placeholder="请输入确认密码" />
          </a-form-model-item>
          <a-button type="primary" style="width:100%;margin-bottom: 20px;">确认修改</a-button>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
/**
 * 基础设置
 */
export default {
  name: 'Base',
  data() {
    return {
      // 表单数据
      formData: {},
      // 校验规则
      rules: {},
      // 当前选中的tabsKeys
      currentKey: 'updateInfo'
    }
  },
  mounted() {
    const type = this.$route.query.type
    if (type) {
      this.currentKey = type
    }
  },
  methods: {
    changeMenuHandler() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
