<template>
  <div class="box-panel">
    <a-divider>回复文章</a-divider>
    <CommentItem v-for="item in commentList" :key="item._id" :item="item" :post-data="postData" />
    <div v-show="commentList.length === 0" class="no-data">暂无回复数据</div>
    <div v-show="commentList.length > 0" class="page-box">
      <Pagination
        :total="total"
        :page.sync="pageNum"
        :size.sync="pageSize"
        @pagination="onSubmitHandler"
      />
    </div>
    <div id="editor" />
    <a-button type="primary" class="submit-comment" @click="pushComment">发表评论</a-button>
  </div>
</template>

<script>
/**
 * 文章评论模块
 */
import E from 'wangeditor'
import config from '@/config/index'
import { getCommentList, addComment } from '@/api/comment'
import { mapState } from 'vuex'
export default {
  name: 'PostComment',
  components: {
    CommentItem: () => import('@/views/Post/CommentItem.vue'),
    Pagination: () => import('@/components/Pagination.vue')
  },
  props: {
    // 文章数据
    postData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 编辑器
      editor: null,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      // 评论数据
      commentList: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    postData: {
      handler() {
        // 解决文章数据异步获取还没成功就先获取文章评论 导致评论取不到的问题
        this.getCommentListRequest()
      },
      deep: true
    }
  },
  mounted() {
    // 初始化编辑器
    this.initEditor()
    this.getCommentListRequest()
  },
  methods: {
    // 获取文章评论数据
    getCommentListRequest() {
      if (!this.postData._id) return
      getCommentList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tid: this.postData._id
      }).then(res => {
        this.commentList = res.data.records
        this.total = res.data.total
      })
    },
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
      this.getCommentListRequest()
    },
    // 发表评论按钮事件
    pushComment() {
      const content = this.editor.txt.html()
      if (!content) {
        this.notifiyWarning('请先输入评论内容！')
      } else {
        addComment({
          content,
          tid: this.postData._id,
          cuid: this.postData.userInfo._id
        }).then(res => {
          const result = res.data
          result.uid = {
            pic: this.userInfo.pic,
            role: this.userInfo.role,
            nickName: this.userInfo.nickName,
            vip: this.userInfo.vip,
            _id: this.userInfo._id
          }
          result.children = []
          this.commentList.unshift(result)
          this.editor.txt.clear()
          this.notifiySuccess('评论成功！')
        }).catch(error => {
          console.log('🚀 ~ file: PostComment.vue ~ line 98 ~ pushComment ~ error', error)
        })
      }
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
.no-data{
  text-align: center;
  font-size: 20px;
  color: #ccc;
}
</style>
