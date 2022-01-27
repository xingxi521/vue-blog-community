<template>
  <div class="box-panel">
    <h3 class="box-panel-title">置顶</h3>
    <div class="stick-box">
      <List />
    </div>
  </div>
</template>

<script>
/**
 * 置顶
 */
import List from '@/components/Home/List.vue'
export default {
  name: 'Stick',
  components: {
    List
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/const.scss";
.stick-box{
  padding: $spacing-row-sm $spacing-row-lg $spacing-row-sm $spacing-row-lg;
}
</style>
