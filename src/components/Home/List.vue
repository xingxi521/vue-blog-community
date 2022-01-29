<template>
  <div class="list-main">
    <ListItem v-for="item in listData" :key="item._id" :item="item" />
  </div>
</template>

<script>
/**
 * 列表展示组件
 */
import ListItem from '@/components/Home/ListItem.vue'
export default {
  name: 'List',
  components: {
    ListItem
  },
  props: {
    // 数据源
    listData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
