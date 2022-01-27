<template>
  <div class="app-container">
    <a-tabs v-model="currentTabs" @change="changeTabHandler">
      <!-- 登录 -->
      <a-tab-pane key="login" tab="登录">
        <a-row v-if="currentTabs === 'login'">
          <a-col :span="8">
            <a-form-model
              ref="loginForm"
              :model="formData"
              :rules="rules"
            >
              <a-form-model-item has-feedback label="" prop="userName">
                <a-input v-model="formData.userName" addon-before="用户名" autocomplete="off" placeholder="请输入用户名(邮箱)" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="" prop="passWord">
                <a-input v-model="formData.passWord" addon-before="密码" autocomplete="off" type="password" placeholder="请输入密码" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="" prop="captcha">
                <a-row>
                  <a-col :span="16">
                    <a-input v-model="formData.captcha" addon-before="验证码" autocomplete="off" placeholder="请输入验证码" />
                  </a-col>
                  <a-col :span="8">
                    <div class="captch" @click="getCaptchRequest()" v-html="captchaHtml" />
                  </a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item has-feedback label="">
                <a-checkbox-group>
                  <a-checkbox value="1">记住密码</a-checkbox>
                </a-checkbox-group>
                <a class="login-form-forgot" href="javascript:;">
                  忘记密码?
                </a>
              </a-form-model-item>
              <a-button type="primary" style="width:100%;" @click="loginHandler">立即登录</a-button>
            </a-form-model>
          </a-col>
        </a-row>
      </a-tab-pane>
      <!-- 注册 -->
      <a-tab-pane key="register" tab="注册" force-render>
        <a-row v-if="currentTabs === 'register'">
          <a-col :span="8">
            <a-form-model
              ref="loginForm"
              :model="formData"
              :rules="rules"
            >
              <a-form-model-item has-feedback label="" prop="userName">
                <a-input v-model="formData.userName" addon-before="用户名" autocomplete="off" placeholder="请输入用户名(邮箱)" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="" prop="nickName">
                <a-input v-model="formData.nickName" addon-before="昵称" autocomplete="off" placeholder="请输入昵称" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="" prop="passWord">
                <a-input v-model="formData.passWord" addon-before="密码" autocomplete="off" type="password" placeholder="请输入密码" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="" prop="dbpassWord">
                <a-input v-model="formData.dbpassWord" addon-before="确认密码" autocomplete="off" type="password" placeholder="请输入确认密码" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="" prop="captcha">
                <a-row>
                  <a-col :span="16">
                    <a-input v-model="formData.captcha" addon-before="验证码" autocomplete="off" placeholder="请输入验证码" />
                  </a-col>
                  <a-col :span="8">
                    <div class="captch" @click="getCaptchRequest()" v-html="captchaHtml" />
                  </a-col>
                </a-row>
              </a-form-model-item>
              <a-button type="primary" style="width:100%;" @click="registerHandler">立即注册</a-button>
            </a-form-model>
          </a-col>
        </a-row>
      </a-tab-pane>
      <!-- 忘记密码 -->
      <a-tab-pane key="forget" tab="忘记密码" force-render>
        <a-row v-if="currentTabs === 'forget'">
          <a-col :span="8">
            <a-form-model
              ref="loginForm"
              :model="formData"
              :rules="rules"
            >
              <a-form-model-item has-feedback label="" prop="userName">
                <a-input v-model="formData.userName" addon-before="用户名" autocomplete="off" placeholder="请输入用户名(邮箱)" />
              </a-form-model-item>
              <a-form-model-item has-feedback label="" prop="captcha">
                <a-row>
                  <a-col :span="16">
                    <a-input v-model="formData.captcha" addon-before="验证码" autocomplete="off" placeholder="请输入验证码" />
                  </a-col>
                  <a-col :span="8">
                    <div class="captch" @click="getCaptchRequest()" v-html="captchaHtml" />
                  </a-col>
                </a-row>
              </a-form-model-item>
              <a-button type="primary" style="width:100%;" @click="forgetSubmit">提交</a-button>
            </a-form-model>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { getCaptch, login, forgetPassword, register } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'
import { mapMutations, mapState } from 'vuex'
export default {
  name: '',
  data () {
    const checkPass = (rule, value, callback) => {
      console.log(this.formData.dbpassWord, value)
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.formData.passWord) {
        callback(new Error('您输入的确认密码与密码不一致，请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      // 当前激活的tabs
      currentTabs: 'login',
      // 登录表单数据
      formData: {
        userName: '',
        passWord: '',
        captcha: '',
        dbpassWord: '',
        nickName: ''
      },
      // 验证规则
      rules: {
        userName: [
          { required: true, message: '请输入用户名(邮箱)' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
        passWord: [
          { required: true, message: '请输入密码' }
        ],
        dbpassWord: [
          { required: true, validator: checkPass, trigger: 'change' }
        ],
        captcha: [
          { required: true, message: '请输入验证码' }
        ],
        nickName: [
          { required: true, message: '请输入昵称' }
        ]
      },
      captchaHtml: ''
    }
  },
  computed: {
    ...mapState(['uid'])
  },
  mounted () {
    this.getCaptchRequest()
  },
  methods: {
    ...mapMutations(['SET_UID']),
    // 获取验证码
    getCaptchRequest () {
      const uid = this.uid || localStorage.getItem('uid') || uuidv4()
      getCaptch({
        uid
      }).then(res => {
        this.captchaHtml = res.data
        if (!localStorage.getItem('uid')) {
          localStorage.setItem('uid', uid)
          this.SET_UID(uid)
        }
      })
    },
    // 切换tab事件
    changeTabHandler (activeKey) {
      this.resetForm()
    },
    // 重置表单
    resetForm () {
      this.formData = {
        userName: '',
        passWord: '',
        captcha: '',
        dbpassWord: '',
        nickName: ''
      }
      this.getCaptchRequest()
    },
    // 忘记密码提交按钮事件
    forgetSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          forgetPassword({
            userName: this.formData.userName,
            captcha: this.formData.captcha
          }).then(res => {
            this.notifiySuccess(res.msg)
          })
        } else {
          this.notifiyError('请先填写好数据再进行提交！')
          return false
        }
      })
    },
    // 登录按钮事件
    loginHandler () {
      const uid = this.uid || localStorage.getItem('uid')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login({
            userName: this.formData.userName,
            passWord: this.formData.passWord,
            captcha: this.formData.captcha,
            uid
          }).then(res => {
            console.log(res)
          })
        } else {
          this.notifiyError('请先填写好数据再进行提交！')
          return false
        }
      })
    },
    // 注册按钮事件
    registerHandler () {
      const uid = this.uid || localStorage.getItem('uid')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          register({
            userName: this.formData.userName,
            passWord: this.formData.passWord,
            dbpassWord: this.formData.dbpassWord,
            nickName: this.formData.nickName,
            captcha: this.formData.captcha,
            uid
          }).then(res => {
            this.notifiySuccess(res.msg)
            this.currentTabs = 'login'
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
    ::v-deep{
      .ant-input-group-addon{
        width: 80px;
      }
      .ant-form-item{
        margin-bottom: 19px;
      }
      .ant-form-item-with-help{
        margin-bottom: 0px;
      }
    }
    .login-form-forgot{
      float: right;
      color: #333;
    }
    .captch{
      position: relative;
      bottom: 10px;
      height: 40px;
    }
  }
</style>
