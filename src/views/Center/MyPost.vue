<template>
  <a-tabs v-model="currentKey" default-active-key="myPost" @change="changeMenuHandler">
    <a-tab-pane key="myPost" tab="我发的贴">
      <a-table :columns="myPostColumns" :data-source="myPostData" row-key="_id" :pagination="false">
        <template slot="title" slot-scope="record">
          <router-link :to="{ name: 'PostDetails', params: {id: record._id || {}} }">{{ record.title }}</router-link>
        </template>
        <template slot="isEnd" slot-scope="record">
          <span>{{ END_TYPE.getDescFromValue(record.isEnd) }}</span>
        </template>
        <template slot="data" slot-scope="record">
          <span>{{ record.read }}阅/{{ record.answer }}答</span>
        </template>
        <span slot="createTime" slot-scope="text">{{ formatCreateTime(text) }}</span>
        <template slot="operation" slot-scope="record">
          <div style="min-width: 110px;">
            <a-button type="primary" size="small" @click="editPost(record)">编辑</a-button>
            <a-popconfirm
              title="确定要删除该帖子?"
              ok-text="是的"
              cancel-text="我再考虑考虑"
              @confirm="deleteHandler(record)"
            >
              <a-button type="danger" size="small" style="margin-left:10px;">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="myCollect" tab="我收藏的贴">
      <a-table :columns="collectColumns" :data-source="collectData" row-key="_id" :pagination="false">
        <template slot="title" slot-scope="record">
          <router-link :to="{ name: 'PostDetails', params: {id: record._id || {}} }">{{ record.title }}</router-link>
        </template>
        <span slot="createTime" slot-scope="text">{{ formatCreateTime(text) }}</span>
      </a-table>
      <div class="page-box">
        <Pagination
          :total="total"
          :page.sync="pageNum"
          :size.sync="pageSize"
          @pagination="onPageHandler"
        />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
/**
 * 我的帖子
 */
import { getCollectPost, getSendPost } from '@/api/center'
import { deletePost } from '@/api/post'
import { formatCreateTime } from '@/utils/public'
import { END_TYPE } from '@/utils/const/home'
export default {
  name: 'MyPost',
  components: {
    Pagination: () => import('@/components/Pagination.vue')
  },
  data() {
    return {
      END_TYPE,
      // 我发的贴列配置
      myPostColumns: [
        {
          title: '帖子标题',
          key: 'title',
          scopedSlots: { customRender: 'title' }
        },
        {
          title: '结贴',
          key: 'isEnd',
          scopedSlots: { customRender: 'isEnd' }
        },
        {
          title: '阅/回',
          scopedSlots: { customRender: 'data' }
        },
        {
          title: '发表时间',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      // 我发的贴表格数据
      myPostData: [],
      // 收藏表列项
      collectColumns: [
        {
          title: '帖子标题',
          dataIndex: 'tid',
          key: 'tid',
          scopedSlots: { customRender: 'title' }
        },
        {
          title: '收藏时间',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        }
      ],
      // 收藏数据
      collectData: [],
      // 当前选中的tabs
      currentKey: 'myPost',
      pageSize: 20,
      pageNum: 1,
      total: 0
    }
  },
  mounted() {
    const type = this.$route.query.type
    if (type) {
      this.currentKey = type
    }
    this.onPageHandler()
  },
  methods: {
    // 获取收藏帖子数据
    getCollectPost() {
      getCollectPost({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.collectData = res.data.records
        this.total = res.data.total
      })
    },
    // 获取用户发表过的帖子
    getSendPost() {
      getSendPost({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }).then(res => {
        this.myPostData = res.data.records
        this.total = res.data.total
      })
    },
    // 改变tabs事件
    changeMenuHandler(activeKey) {
      if (activeKey === 'myCollect') {
        this.pageNum = 1
        this.pageSize = 20
        this.getCollectPost()
      } else if (activeKey === 'myPost') {
        this.pageNum = 1
        this.pageSize = 20
        this.getSendPost()
      }
    },
    // 分页改变
    onPageHandler() {
      if (this.currentKey === 'myCollect') {
        this.pageNum = 1
        this.pageSize = 20
        this.getCollectPost()
      } else if (this.currentKey === 'myPost') {
        this.pageNum = 1
        this.pageSize = 20
        this.getSendPost()
      }
    },
    formatCreateTime(time) {
      return formatCreateTime(time)
    },
    // 删除帖子按钮事件
    deleteHandler(item) {
      if (item.isEnd === END_TYPE.CLOSE) {
        this.$pop('shake', '该文章已结贴，无法删除！')
      } else {
        deletePost({
          tid: item._id
        }).then(res => {
          this.$pop('shake', res.msg)
          this.getSendPost()
        })
      }
    },
    // 编辑帖子按钮事件
    editPost(item) {
      if (item.isEnd === END_TYPE.CLOSE) {
        this.$pop('shake', '该文章已结贴，无法编辑！')
      } else {
        this.$router.push({ name: 'EditPost', params: { id: item._id }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box{
  text-align: right;
  padding: 15px 15px 15px 0;
}
</style>
