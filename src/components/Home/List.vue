<template>
  <div class="list-main">
    <ListItem />
    <ListItem />
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
  }
}
</script>

<style lang="scss" scoped>

</style>
