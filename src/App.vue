<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view />
    <player></player>
  </div>
</template>

<script lang="ts">
import MHeader from './components/common/m-header/m-header.vue'
import Tab from './components/common/tab/Tab.vue'
import Player from '@/components/player/Player.vue'

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/style/variable.less';

#app {
  color: @color-theme;
}
</style>
