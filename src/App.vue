<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view />
  </div>
</template>

<script lang="ts">
import MHeader from './components/common/m-header/m-header.vue'
import Tab from './components/common/tab/Tab.vue'

export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/variable.less';

#app {
  color: @color-theme;
}
</style>
