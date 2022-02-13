<template>
  <a-tabs v-model="currentKey" default-active-key="myPost" @change="changeMenuHandler">
    <a-tab-pane key="myPost" tab="我发的贴">
      <a-table :columns="myPostColumns" :data-source="myPostData">
        <!-- <a slot="title" slot-scope="text">{{ text }}</a> -->
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="myCollect" tab="我收藏的贴">
      <a-table :columns="collectColumns" :data-source="collectData">
        <!-- <a slot="title" slot-scope="text">{{ text }}</a> -->
      </a-table>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
/**
 * 我的帖子
 */
export default {
  name: 'MyPost',
  data() {
    return {
      // 我发的贴列配置
      myPostColumns: [
        {
          title: '帖子标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '结贴',
          dataIndex: 'isEnd',
          key: 'isEnd',
          scopedSlots: { customRender: 'isEnd' }
        },
        {
          title: '发表时间',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        },
        {
          title: '数据',
          dataIndex: 'data',
          key: 'data',
          scopedSlots: { customRender: 'data' }
        }
      ],
      // 我发的贴表格数据
      myPostData: [],
      // 收藏表列项
      collectColumns: [
        {
          title: '帖子标题',
          dataIndex: 'title',
          key: 'title'
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
      currentKey: 'myPost'
    }
  },
  mounted() {
    const type = this.$route.query.type
    if (type) {
      this.currentKey = type
    }
  },
  methods: {
    // 改变tabs事件
    changeMenuHandler() {}
  }
}
</script>

<style lang="scss" scoped>

</style>
