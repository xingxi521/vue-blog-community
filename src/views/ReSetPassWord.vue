<template>
  <div class="app-container">
    <a-row style="padding-top:15px;">
      <a-col :span="8">
        <a-form-model
          ref="resetForm"
          :model="formData"
          :rules="rules"
        >
          <a-form-model-item has-feedback label="" prop="newPassWord">
            <a-input v-model="formData.newPassWord" addon-before="新的密码" autocomplete="off" type="password" placeholder="请输入新的密码" />
          </a-form-model-item>
          <a-form-model-item has-feedback label="" prop="dbPassWord">
            <a-input v-model="formData.dbPassWord" addon-before="确认密码" autocomplete="off" type="password" placeholder="请输入再次输入新的密码" />
          </a-form-model-item>
          <a-button type="primary" style="width:100%;margin-bottom: 20px;" @click="updateHandler">立即修改</a-button>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>
/**
 * 重置密码
 */
import { reSetPassWord } from '@/api/center'
export default {
  name: 'ReSetPassWord',
  data() {
    const checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.formData.newPassWord) {
        callback(new Error('您输入的确认密码与密码不一致，请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      // 提交表单
      formData: {},
      rules: {
        newPassWord: [
          { required: true, message: '请输入新的密码' }
        ],
        dbPassWord: [
          { required: true, validator: checkPass, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 立即修改按钮事件
    updateHandler() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          reSetPassWord({
            ...this.formData,
            uuid: this.$route.query.uuid
          }).then(res => {
            this.notifiySuccess(res.msg)
            this.$router.push({ name: 'Login' })
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.notifiyError('请先填写好数据再进行提交！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  background: #fff;
}
</style>
