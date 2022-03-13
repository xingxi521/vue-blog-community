<template>
  <div class="app-container">
    <div class="post-title">编辑帖子</div>
    <a-form-model
      ref="form"
      :model="formData"
      :rules="rules"
    >
      <a-row style="margin-top:15px;">
        <a-col :span="4">
          <a-form-model-item has-feedback label="" prop="type">
            <a-select v-model="formData.type" placeholder="请选择分类" allow-clear disabled>
              <a-select-option v-for="item in typeOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="20">
          <a-form-model-item has-feedback label="" prop="title">
            <a-input v-model="formData.title" addon-before="标题" autocomplete="off" placeholder="请输入标题" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <div id="editor" />
      <a-form-model-item has-feedback label="" prop="fav">
        <a-input v-model="formData.fav" addon-before="悬赏积分" autocomplete="off" placeholder="请输入悬赏积分" disabled />
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
      <a-button type="primary" style="width:100%;margin-bottom: 20px;" @click="submitHandler">提交编辑</a-button>
    </a-form-model>
  </div>
</template>

<script>
/**
 * 编辑帖子
 */
import E from 'wangeditor'
import { getCaptch } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'
import { mapMutations } from 'vuex'
import config from '@/config/index'
import { editPost } from '@/api/post'
import { getPostDetails } from '@/api/public'
import { ARTICLE_TYPE } from '@/utils/const/home'
export default {
  name: 'EditPost',
  data() {
    return {
      // 提交表单
      formData: {},
      // 校验规则
      rules: {
        title: [
          { required: true, message: '请输入标题' },
          { min: 3, max: 50, message: '标题长度为3-50', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        fav: [
          { required: true, message: '请输入悬赏积分', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码' }
        ]
      },
      // 编辑器
      editor: null,
      captchaHtml: '',
      // 类型下拉数据源
      typeOptions: ARTICLE_TYPE.getLabelData(null, null, false)
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      await this.getPostDetails()
      this.initEditor()
      this.getCaptchRequest()
    },
    // 获取文章详情
    async getPostDetails() {
      const res = await getPostDetails({
        tid: this.$route.params.id
      })
      this.formData = res.data
    },
    ...mapMutations(['SET_UID']),
    // 初始化编辑器
    initEditor() {
      this.editor = new E('#editor')
      this.editor.config.zIndex = 0
      this.editor.config.uploadImgHeaders = {
        Authorization: 'bearer ' + this.$store.state.token || ''
      }
      this.editor.config.uploadFileName = 'file'
      this.editor.config.uploadImgServer = process.env.NODE_ENV === 'development' ? `${config.baseUrl.dev}content/uploadFile` : `${config.baseUrl.prod}content/uploadFile`
      this.editor.config.uploadImgHooks = {
        customInsert: function(insertImgFn, result) {
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          insertImgFn(process.env.NODE_ENV === 'development' ? `${config.baseUrl.dev}${result.data.pic}` : `${config.baseUrl.prod}${result.data.pic}`)
        }
      }
      this.editor.create()
      this.editor.txt.html(this.formData.content)
    },
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
    // 提交按钮事件
    submitHandler() {
      const uid = this.uid || localStorage.getItem('uid')
      this.$refs.form.validate(valid => {
        if (valid) {
          const html = this.editor.txt.html()
          if (!html) {
            this.notifiyWarning('请输入正文内容！')
            return
          }
          editPost({
            ...this.formData,
            content: html,
            uid
          }).then(res => {
            this.notifiySuccess(res.msg)
            this.$router.push({ name: 'PostDetails', params: {
              id: this.$route.params.id
            }})
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.notifiyWarning('请先填写好数据再进行提交！')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  background-color: #fff;
  padding: 20px;
  .post-title{
    background-color: #f1f1f1;
    padding: 12px;
    border-left: 5px solid #009688;
  }
  .captch{
    position: relative;
    bottom: 10px;
    height: 40px;
  }
}
</style>
