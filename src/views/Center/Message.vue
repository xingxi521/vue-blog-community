<template>
  <div class="message-box">
    <a-button type="danger" @click="markAllCommentHandler">清空消息</a-button>
    <div class="box-main">
      <ul v-show="messageData.length > 0" class="box-ul-answer">
        <li v-for="item in messageData" :key="item._id">
          <p>
            <span class="answer-time">{{ formatTime(item.createTime) }}</span><a @click="jumpToUser(item.uid._id)">{{ item.uid.nickName }}</a>在
            <a class="li-post" @click="jumpToPost(item.tid._id)">{{ item.tid.title }}</a>中回复了你
          </p>
          <div class="li-content" v-html="item.content" />
          <p class="mark-btn"><a-button type="primary" size="small" @click="markHandler(item._id)">标为已读</a-button></p>
        </li>
      </ul>
      <a-empty v-show="messageData.length === 0" />
    </div>
    <div class="page-box">
      <Pagination
        v-show="messageData.length > 0"
        :total="total"
        :page.sync="pageNum"
        :size.sync="pageSize"
        @pagination="onPageHandler"
      />
    </div>
  </div>
</template>

<script>
/**
 * 我的消息
 */
import { getNoReadComment, markCommentRead, markAllComment } from '@/api/comment'
export default {
  name: 'Message',
  components: {
    Pagination: () => import('@/components/Pagination.vue')
  },
  data() {
    return {
      // 未读消息数据
      messageData: [],
      pageSize: 20,
      pageNum: 1,
      total: 0
    }
  },
  mounted() {
    this.getNoReadCommentRequst()
  },
  methods: {
    // 获取未读消息
    getNoReadCommentRequst() {
      getNoReadComment({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.messageData = res.data.records
        this.total = res.data.total
      })
    },
    onPageHandler() {
      this.getNoReadCommentRequst()
    },
    formatTime(time) {
      return this.dayjs(time).format('YYYY-MM-DD')
    },
    // 跳转至用户页面
    jumpToUser(id) {
      this.$router.push({
        name: 'User',
        params: {
          id
        }
      })
    },
    // 跳转至帖子页面
    jumpToPost(id) {
      this.$router.push({
        name: 'PostDetails',
        params: {
          id
        }
      })
    },
    // 标记为已读消息
    markHandler(id) {
      markCommentRead({
        id
      }).then(res => {
        this.$pop('shake', res.msg)
        this.getNoReadCommentRequst()
      })
    },
    // 清空所有未读消息按钮事件
    markAllCommentHandler() {
      markAllComment().then(res => {
        this.$pop('shake', res.msg)
        this.getNoReadCommentRequst()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-main{
  border: 1px solid #e5e5e5;
  margin-top: 15px;
  .box-ul{
    li{
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #e9e9e9;
      justify-content: space-between;
      align-items: center;
      .li-title{
        color: #009688;
        cursor: pointer;
        .li-time{
          color: #999;
          padding-left: 15px;
        }
      }
    }
  }
  .box-ul-answer{
    li{
      padding: 10px;
      border-bottom: 1px solid #e9e9e9;
      p{
        color: #999;
        .answer-time{
          padding-right: 5px;
        }
        .li-post{
          padding: 0 5px;
        }
      }
      .li-content{
        background: #f2f2f5;
        padding: 10px;
      }
      .mark-btn{
        padding-top: 15px;
        text-align: right;
      }
    }
  }
}
.page-box{
  margin: 10px;
  text-align: right;
}
</style>
