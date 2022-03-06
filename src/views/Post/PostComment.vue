<template>
  <div class="box-panel">
    <a-divider>回复文章</a-divider>
    <CommentItem />
    <CommentItem />
    <div class="page-box">
      <Pagination
        :total="total"
        :page.sync="pageNum"
        :size.sync="pageSize"
        @pagination="onSubmitHandler"
      />
    </div>
    <div id="editor" />
    <a-button type="primary" class="submit-comment">发表评论</a-button>
  </div>
</template>

<script>
/**
 * 文章评论模块
 */
import E from 'wangeditor'
import config from '@/config/index'
export default {
  name: 'PostComment',
  components: {
    CommentItem: () => import('@/views/Post/CommentItem.vue'),
    Pagination: () => import('@/components/Pagination.vue')
  },
  data() {
    return {
      // 编辑器
      editor: null,
      total: 500,
      pageNum: 1,
      pageSize: 20
    }
  },
  mounted() {
    // 初始化编辑器
    this.initEditor()
  },
  methods: {
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
    },
    onSubmitHandler() {

    }
  }
}
</script>

<style lang="scss" scoped>
#editor{
  padding: 12px;
}
.submit-comment{
  margin: 15px;
}
.page-box{
  text-align: center;
  padding: 15px 0 5px 0;
}
</style>
