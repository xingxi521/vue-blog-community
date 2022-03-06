<template>
  <div class="pagination-container">
    <a-pagination
      v-model="currentPage"
      show-size-changer
      show-quick-jumper
      :show-total="totala => `共 ${totala} 条`"
      :page-size.sync="pageSize"
      :page-size-options="pageSizeOptions"
      :total="total"
      @showSizeChange="onShowSizeChange"
      @change="changeCurrent"
    />
  </div>
</template>

<script>
/**
 * 分页组件
 */
export default {
  name: 'Pagination',
  props: {
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 当前页数
    page: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    size: {
      type: Number,
      default: 20
    },
    // 指定每页可以显示多少条
    pageSizeOptions: {
      type: Array,
      default: () => {
        return ['10', '20', '30', '50']
      }
    }
  },
  computed: {
    // 当前页数
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    // 每页显示条数
    pageSize: {
      get() {
        return this.size
      },
      set(val) {
        this.$emit('update:size', val)
      }
    }
  },
  watch: {
    currentPage(val) {
      this.$emit('pagination', { page: val, size: this.pageSize })
    },
    pageSize(val) {
      this.$emit('pagination', { page: this.currentPage, size: val })
    }
  },
  methods: {
    // 改变每页显示条数事件
    onShowSizeChange() {},
    // 改变页码事件
    changeCurrent(page, pageSize) {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
