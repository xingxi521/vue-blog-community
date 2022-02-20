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
            <a-textarea v-model="formData.personSign" placeholder="Basic usage" :rows="4" />
          </a-form-model-item>
          <a-button type="primary" style="width:100%;margin-bottom: 20px;" @click="updateInfoHandler">确认修改</a-button>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane key="updateImg" tab="头像" force-render>
        <div class="updateImg-box">
          <div class="upbtn-box">
            <label for="pic" class="ant-btn ant-btn-primary uploadbtn">上传头像</label>
          </div>
          <input id="pic" type="file" name="file" accept="image/png, image/gif, image/jpg" @change="uploadFileHandler">
          <p class="tips">建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
          <div class="showpic">
            <img :src="env === 'development' ? config.baseUrl.dev + userInfo.pic : config.baseUrl.prod + 'app/public' + userInfo.pic" alt="">
          </div>
        </div>
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
          <a-button type="primary" style="width:100%;margin-bottom: 20px;" @click="updatePassWordHandler">确认修改</a-button>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
/**
 * 基础设置
 */
import { updateUserInfo, getUserInfo, updatePassWord } from '@/api/center'
import { mapMutations, mapState } from 'vuex'
import { uploadFile } from '@/api/public'
import config from '@/config'
export default {
  name: 'Base',
  data() {
    return {
      config,
      // 表单数据
      formData: {},
      // 校验规则
      rules: {
        passWord: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      },
      // 当前选中的tabsKeys
      currentKey: 'updateInfo',
      env: process.env.NODE_ENV
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    const type = this.$route.query.type
    if (type) {
      this.currentKey = type
    }
    this.getUserInfo()
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    // 获取用户信息
    getUserInfo() {
      getUserInfo().then(res => {
        this.formData = res.data
      })
    },
    changeMenuHandler() {

    },
    // 我的资料-确认修改按钮事件
    updateInfoHandler() {
      updateUserInfo(this.formData).then(res => {
        this.notifiySuccess(res.msg)
        this.formData = res.data
        this.SET_USERINFO({
          ...this.userInfo,
          ...res.data
        })
      })
    },
    // 上传文件事件
    async uploadFileHandler(e) {
      const file = e.target.files
      const form = new FormData()
      if (file && file.length > 0) {
        form.append('file', file[0])
      }
      const res = await uploadFile(form)
      const updateRes = await updateUserInfo({ ...res.data })
      this.SET_USERINFO({
        ...this.userInfo,
        ...res.data
      })
      this.notifiySuccess(updateRes.msg)
    },
    // 修改密码按钮事件
    updatePassWordHandler() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if (this.formData.newPassword !== this.formData.confirmPassword) {
            this.notifiyWarning('您输入的两次新密码不一致，请重新输入！')
            return
          }
          updatePassWord(this.formData).then(res => {
            this.notifiySuccess(res.msg)
            this.formData.passWord = ''
            this.formData.newPassword = ''
            this.formData.confirmPassword = ''
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.updateImg-box{
  width: 373px;
  height: 373px;
  background-color: #f2f2f5;
  .upbtn-box{
    width: 100%;
    text-align: center;
    padding: 16px 0;
    .uploadbtn{
      line-height: 32px;
    }
  }
  .tips{
    padding: 0 16px;
    font-size: 12px;
    text-align: center;
  }
  #pic{
    display: none;
  }
  .showpic{
    text-align: center;
    img{
      border-radius: 100%;
      width: 168px;
      height: 168px;
    }
  }

}
</style>
