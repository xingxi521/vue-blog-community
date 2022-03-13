<template>
  <div class="box-panel">
    <h1 class="detail-title">{{ content.title }}</h1>
    <div class="detail-info">
      <div class="detail-info-left">
        <span class="badge badge-green">{{ mappingType[content.type] }}</span>
        <span class="badge badge-grey">{{ content.isEnd === 0 ? '未结' : '已结' }}</span>
        <span v-if="content.isTop" class="badge badge-black">置顶</span>
        <span v-for="tag in []" :key="`tag_${tag.title}`" class="badge" :class="tag.className">{{ tag.title }}</span>
        <!-- 发帖人或者超管账号可以删除 -->
        <span v-if="(content && content.userInfo && userInfo._id === content.userInfo._id) || (content && content.userInfo && content.userInfo.role === ROLE_TYPE.SUPER_ADMIN)" class="badge badge-green" style="margin-left:35px;">删除</span>
        <span v-if="content && content.userInfo && content.userInfo.role === ROLE_TYPE.SUPER_ADMIN" class="badge badge-green">置顶</span>
        <span v-if="content && content.userInfo && content.userInfo.role === ROLE_TYPE.SUPER_ADMIN" class="badge badge-green">加精</span>
      </div>
      <div class="detail-info-right">
        <i class="iconfont"></i>{{ content.answer }}
        <i class="iconfont"></i>{{ content.read }}
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="detail-userinfo">
      <template v-if="content && content.userInfo">
        <img :src="env === 'development' ? config.baseUrl.dev + content.userInfo.pic : config.baseUrl.prod + content.userInfo.pic" alt="">
      </template>
      <div class="userinfo-right">
        <div class="userinfo-right-top">
          <span class="top-nickname">{{ content && content.userInfo ? content.userInfo.nickName : '' }}</span>
          <span v-if="content && content.userInfo && content.userInfo.vip === 1" class="badge badge-red">VIP</span>
          <span class="top-time">{{ formatCreateTime(content.createTime) }}</span>
        </div>
        <div class="userinfo-right-bottom">
          <span class="bottom-xuan">悬赏：{{ content.fav }}积分</span>
          <div class="btn-group">
            <a-button
              v-if="(content && content.userInfo && userInfo._id === content.userInfo._id && content.isEnd !== 1) || (content && content.userInfo && content.userInfo.role === ROLE_TYPE.SUPER_ADMIN && content.isEnd !== 1)"
              type="primary"
              size="small"
              class="bottom-editpost"
              @click="editPostHandler()"
            >编辑帖子
            </a-button>
            <a-button type="primary" size="small" class="bottom-editpost" @click="collectHandler">{{ content.isCollect ? '取消收藏' : '收藏' }}</a-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 文章内容 -->
    <div class="detail-content">
      <div v-html="content.content" />
    </div>
  </div>
</template>

<script>
/**
 * 文章详情的内容模块
 */
import { mapState } from 'vuex'
import { ROLE_TYPE } from '@/utils/const/publlic'
import { formatCreateTime } from '@/utils/public'
import { collectPost } from '@/api/post'
import config from '@/config'
export default {
  name: 'PostContent',
  props: {
    // 详情数据
    content: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ROLE_TYPE,
      // 文章类型映射
      mappingType: {
        ask: '提问',
        share: '分享',
        disscussion: '讨论',
        suggest: '建议',
        notice: '公告',
        dynamic: '动态'
      },
      env: process.env.NODE_ENV,
      config
    }
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  methods: {
    formatCreateTime(time) {
      return formatCreateTime(time)
    },
    // 编辑帖子按钮事件
    editPostHandler() {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
      } else if (this.content.isEnd === 1) { // 结贴
        this.$pop('shake', '帖子已结贴，无法再进行编辑！')
      } else {
        this.$router.push({
          name: 'EditPost',
          params: {
            id: this.content._id
          }
        })
      }
    },
    // 收藏帖子按钮事件
    collectHandler() {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
      } else {
        collectPost({
          tid: this.content._id
        }).then(res => {
          this.$pop('shake', res.msg)
          this.content.isCollect = !this.content.isCollect
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.box-panel{
  padding: 20px;
  .detail-title{
    font-size: 26px;
    line-height: 36px;
  }
  .detail-info{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .detail-info-right{
      i{
        font-size: 22px;
        padding: 0 $spacing-col-sm 0 $spacing-row-lg;
        color: $text-color-grey;
        vertical-align: middle;
      }
    }
  }
  .detail-userinfo{
    background: $bg-color-grey;
    color: $text-color-grey;
    padding: $spacing-row-lg;
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
        .top-time{
          padding-left: $spacing-row-base;
        }
      }
      .userinfo-right-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bottom-xuan{
          color: #FF7200;
        }
        .btn-group{
          .bottom-editpost{
            font-size: $font-size-sm;
            margin-left: $spacing-row-sm;
          }
        }
      }
    }
  }
  .detail-content{
    padding: $spacing-row-lg 0;
  }
}
</style>
