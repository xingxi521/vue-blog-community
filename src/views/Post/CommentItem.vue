<template>
  <div class="comment-item-main">
    <div class="detail-userinfo">
      <img :src="env === 'development' ? config.baseUrl.dev + item.uid.pic : config.baseUrl.prod + item.uid.pic" alt="">
      <div class="userinfo-right">
        <div class="userinfo-right-top">
          <span class="top-nickname" @click="gotoUserDetails(item.uid._id)">{{ item.uid.nickName }}</span>
          <span v-if="item && item.uid && item.uid.vip === 1" class="badge badge-red">VIP</span>
        </div>
        <div class="userinfo-right-bottom">
          <span class="top-time">{{ formatCreateTime(item.createTime) }}</span>
        </div>
      </div>
      <i v-if="item.isBest" class="iconfont icon-caina" />
    </div>
    <div class="comment-content" v-html="item.content" />
    <div class="comment-bottom">
      <div class="comment-bottom-left">
        <i class="iconfont icon-zan" :class="{ 'zan-active': item.isNice }" @click="niceHandler(item)" /><span class="zan-conut">{{ item.niceCount }}</span>
        <i class="iconfont icon-svgmoban53" /><span class="zan-conut" @click="replyToParent(item)">回复</span>
      </div>
      <div class="comment-bottom-right">
        <span v-if="userInfo._id === item.uid._id && postData.isEnd !== 1" class="edit" @click="editHandler(item)">编辑</span>
        <span v-if="userInfo._id === item.uid._id && postData.isEnd !== 1" class="del" @click="delCommentHandler(item)">删除</span>
        <span v-if="userInfo._id === postData.userInfo._id && postData.isEnd !== 1" class="accept" @click="acceptHandler(item)">采纳</span>
      </div>
    </div>
    <!-- 回复盖楼 -->
    <div v-if="item.children.length > 0" class="relpy-box">
      <div v-for="child in item.children" :key="child._id" class="reply-content">
        <img class="reply-pic" :src="env === 'development' ? config.baseUrl.dev + child.uid.pic : config.baseUrl.prod + child.uid.pic" alt="" style="cursor: pointer;" @click="gotoUserDetails(child.uid._id)">
        <div class="reply-content-right">
          <div class="content-right-top">
            <span>
              {{ child.uid.nickName }}
              <span v-if="child && child.uid && child.uid.vip === 1" class="badge badge-red">VIP</span>
              <span v-if="child.replyToData" style="padding: 0 8px;color:#8a919f;">回复</span>
              <span v-if="child.replyToData">{{ child.replyToData.uid.nickName }}</span>
              <span v-if="child.replyToData && child.replyToData.uid && child.replyToData.uid.vip === 1" class="badge badge-red">VIP</span>
            </span>
            <span>{{ formatCreateTime(child.createTime) }}</span>
          </div>
          <div class="content-right-body" v-html="child.content" />
          <div v-if="child.replyToData" class="quote">
            <div>“</div>
            <div class="quote-wrapper">{{ child.replyToData.content }}</div>
            <div>”</div>
          </div>
          <div class="content-bottom-left">
            <i class="iconfont icon-zan" :class="{ 'zan-active': child.isNice }" @click="niceHandler(child)" /><span class="zan-conut">{{ child.niceCount }}</span>
            <i class="iconfont icon-svgmoban53" /><span class="zan-conut" @click="replyToSon(item, child)">回复</span>
          </div>
        </div>
      </div>
    </div>
    <a-modal v-model="isShow" :title="submitData.type === 'edit' ? '编辑评论': '回复评论'" @ok="handleOk">
      <a-textarea v-model="submitData.content" placeholder="请输入内容" :rows="4" />
    </a-modal>
  </div>

</template>

<script>
/**
 * 评论项组件
 */
import { formatCreateTime, getObjByAttr } from '@/utils/public'
import { mapState } from 'vuex'
import { setBestComment, setNice, addComment, updateComment, deleteComment } from '@/api/comment'
import config from '@/config'
export default {
  name: 'CommentItem',
  props: {
    // 数据
    item: {
      type: Object,
      default: () => {}
    },
    // 文章数据
    postData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      config,
      env: process.env.NODE_ENV,
      // 弹出显示开关
      isShow: false,
      // 提交数据
      submitData: {
        content: '',
        type: 'reply'
      }
    }
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  methods: {
    // 格式化时间
    formatCreateTime(time) {
      return formatCreateTime(time)
    },
    // 编辑按钮事件
    editHandler(item) {
      this.isShow = true
      this.submitData = {
        type: 'edit',
        content: item.content,
        _id: item._id
      }
    },
    // 采纳按钮事件
    acceptHandler(item) {
      if (this.isLogin) {
        setBestComment({
          tid: item.tid,
          cid: item._id
        }).then(res => {
          this.$set(item, 'isBest', true)
          // 设置结贴
          this.$set(this.postData, 'isEnd', 1)
          this.notifiySuccess(res.msg)
        })
      } else {
        this.$pop('shake', '请先登录')
      }
    },
    // 点赞事件
    niceHandler(item) {
      if (this.isLogin) {
        setNice({
          cid: item._id
        }).then(res => {
          this.$set(item, 'niceCount', ++item.niceCount)
          this.$pop('shake', res.msg)
        })
      } else {
        this.$pop('shake', '请先登录')
      }
    },
    // 一级评论回复
    replyToParent(item) {
      this.isShow = true
      this.submitData = {
        type: 'reply',
        content: '',
        tid: item.tid,
        cid: item._id
      }
    },
    // 二级评论回复
    replyToSon(pItem, sItem) {
      this.isShow = true
      this.submitData = {
        type: 'reply',
        content: '',
        tid: pItem.tid,
        cid: pItem._id,
        replyToCid: sItem._id
      }
    },
    // 弹出提交事件
    handleOk() {
      if (this.submitData.type === 'reply') {
        if (!this.submitData.content) {
          this.$pop('shake', '请输入内容再提交！')
          return
        }
        addComment(this.submitData).then(res => {
          const result = res.data
          result.uid = {
            pic: this.userInfo.pic,
            role: this.userInfo.role,
            nickName: this.userInfo.nickName,
            vip: this.userInfo.vip
          }
          // 如果是回复别人评论（就是评论里回复评论）
          if (this.submitData.replyToCid) {
            result.replyToData = getObjByAttr(this.item.children, '_id', this.submitData.replyToCid)
          }
          this.item.children.push(result)
          this.$pop('shake', '回复成功！')
          this.isShow = false
        })
      } else if (this.submitData.type === 'edit') {
        if (!this.submitData.content) {
          this.$pop('shake', '请输入内容再提交！')
          return
        }
        updateComment(this.submitData).then(res => {
          this.item.content = this.submitData.content
          this.$pop('shake', res.msg)
          this.isShow = false
        })
      }
    },
    // 删除评论按钮事件
    delCommentHandler(item) {
      if (this.isLogin) {
        this.confirmBox('确定要删除该评论吗？', () => {
          deleteComment({
            _id: item._id
          }).then(res => {
            this.$pop('shake', res.msg)
            this.$parent.getCommentListRequest()
          })
        }, () => {})
      } else {
        this.$pop('shake', '请先登录')
      }
    },
    // 跳转用户主页
    gotoUserDetails(id) {
      this.$router.push({ name: 'User', params: { id }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.comment-item-main{
  padding-bottom: $spacing-col-lg;
  border-bottom: 1px solid #DFDFDF;
  .detail-userinfo{
    color: $text-color-grey;
    padding: $spacing-col-lg $spacing-row-lg;
    margin-top: $spacing-col-base;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img{
      width: 45px;
      height: 45px;
    }
    .userinfo-right{
      flex: 1;
      padding-left: $spacing-row-base;
      .userinfo-right-top{
        .top-nickname{
          color: #01AAED;
          cursor: pointer;
          &:hover{
            color: $text-colo-hover;
          }
        }
      }
      .userinfo-right-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn-group{
          .bottom-editpost{
            font-size: $font-size-sm;
            margin-left: $spacing-row-sm;
          }
        }
      }
    }
    i{
      font-size: 60px;
      color: #58A571;
    }
  }
  .comment-content{
    padding: $spacing-col-base $spacing-row-lg;
  }
  .comment-bottom{
    padding: 0 $spacing-row-lg;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .comment-bottom-left{
      i{
        font-size: 20px;
        color: $text-color-grey;
        padding: 0 $spacing-col-sm 0 $spacing-row-lg;
        vertical-align: middle;
        cursor: pointer;
        &:first-child{
          padding: 0 $spacing-col-sm 0 0;
        }
      }
      .icon-zan{
        &:hover{
          color: #c00;
        }
      }
      .zan-active{
        color: #c00;
      }
      .zan-conut{
        position: relative;
        top: 3px;
      }
    }
    .comment-bottom-right{
      span{
        color: $text-color-grey;
        padding-right: $spacing-row-lg;
        cursor: pointer;
      }
    }
  }
  .relpy-box{
    background: #F9FBFA;
    margin: $spacing-col-lg $spacing-row-lg;
    .reply-content{
      padding: 15px;
      display: flex;
      .reply-pic{
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }
      .reply-content-right{
        flex: 1;
        padding: 0 10px;
        .content-right-top{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .content-right-body{
          margin: 10px 0;
        }
        .quote{
          display: flex;
          background: #f2f3f5;
          border: 1px solid #e4e6eb;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 0 12px;
          line-height: 36px;
          height: 36px;
          font-size: 14px;
          color: #8a919f;
          margin: 8px 0;
          .quote-wrapper{
            flex-shrink: 1;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
        .content-bottom-left{
          i{
            font-size: 16px;
            color: $text-color-grey;
            padding: 0 $spacing-col-sm 0 $spacing-row-lg;
            vertical-align: middle;
            cursor: pointer;
            &:first-child{
              padding: 0 $spacing-col-sm 0 0;
            }
          }
          .icon-zan{
            &:hover{
              color: #c00;
            }
          }
          .zan-active{
            color: #c00;
          }
          .zan-conut{
            position: relative;
            top: 3px;
          }
        }
      }
    }
  }
}

</style>
