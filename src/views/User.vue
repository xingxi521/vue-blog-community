<template>
  <div class="user-main">
    <div class="box-panel user-top">
      <img :src="env === 'development' ? config.baseUrl.dev + userInfo.pic : config.baseUrl.prod + userInfo.pic" alt="">
      <h1>
        {{ userInfo.nickName }}
        <i v-if="userInfo.vip === 1" class="badge badge-red">VIP</i>
      </h1>
      <p class="top-info">
        <i class="iconfont icon-kiss" />
        <span style="color: rgb(255, 114, 0);">{{ userInfo.favs }} 积分</span>
        <i class="iconfont icon-shijian" />
        <span>{{ formatTime(userInfo.createTime) }} 加入</span>
      </p>
    </div>
    <div class="app-container">
      <a-row :gutter="16">
        <a-col :xs="24" :md="12">
          <div class="box-panel">
            <div class="box-panel-title">
              最近的提问
            </div>
            <div class="box-main">
              <ul class="box-ul">
                <li v-for="item in postLately" :key="item._id">
                  <span class="li-title" @click="readTitleClickHandler(item._id)">
                    {{ item.title }}
                    <span class="li-time">{{ formatTime(item.createTime) }}</span>
                  </span>
                  <span>{{ item.read }}阅/{{ item.answer }}答</span>
                </li>
              </ul>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :md="12">
          <div class="box-panel">
            <div class="box-panel-title">
              最近的回答
            </div>
            <div class="box-main">
              <ul class="box-ul-answer">
                <li v-for="item in commentLately" :key="item._id">
                  <p>
                    <span class="answer-time">{{ formatTime(item.createTime) }}</span>在
                    <a class="li-post" @click.prevent="readTitleClickHandler(item.tid._id)">{{ item.tid.title }}</a>中回答
                  </p>
                  <div class="li-content" v-html="item.content" />
                </li>
              </ul>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
/**
 * 我的主页
 */
import { getPostLately, getCommentLately } from '@/api/public'
import { getUserInfo } from '@/api/center'
import config from '@/config'
export default {
  name: 'User',
  data() {
    return {
      config,
      env: process.env.NODE_ENV,
      // 用户最近发帖数据
      postLately: [],
      // 用户最近评论数据
      commentLately: [],
      // 用户数据
      userInfo: {}
    }
  },
  mounted() {
    this.getUserInfoRequest()
    this.getPostLatelyRequest()
    this.getCommentLatelyRequest()
  },
  methods: {
    // 获取用户最近发帖数据
    getPostLatelyRequest() {
      getPostLately({
        uid: this.$route.params.id
      }).then(res => {
        this.postLately = res.data
      })
    },
    // 获取用户最近评论数据
    getCommentLatelyRequest() {
      getCommentLately({
        uid: this.$route.params.id
      }).then(res => {
        this.commentLately = res.data
      })
    },
    // 获取用户信息
    getUserInfoRequest() {
      getUserInfo({
        _id: this.$route.params.id
      }).then(res => {
        this.userInfo = res.data
      })
    },
    formatTime(time) {
      return this.dayjs(time).format('YYYY-MM-DD')
    },
    // 最近提问点击标题事件
    readTitleClickHandler(id) {
      this.$router.push({
        name: 'PostDetails',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-main{
  .user-top{
    position: relative;
    padding: 30px 0 30px;
    text-align: center;
    h1{
      margin: 0;
    }
    img{
      width: 120px;
      height: 120px;
      border-radius: 100%;
    }
    .top-info{
      i{
        padding-right: 5px;
        padding-left: 10px;
        color: #666;
      }
    }
  }
  .box-main{
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
      }
    }
  }
}
</style>
