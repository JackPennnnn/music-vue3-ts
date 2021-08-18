<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">PP Music</h1>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'm-header'
}
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: @color-theme;
  font-size: 0;

  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    width: 40px;
    height: 42px;
    margin-right: 9px;
    background-image: url('eb89d51a6ff892ebe1bfead1cc7dad4b.png');
    background-size: cover;
  }

  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: @font-size-large;
  }

  .mine {
    position: absolute;
    top: 0;
    right: 0;
  }

  .icon-mine {
    display: block;
    padding: 12px;
    font-size: 20px;
    color: @color-theme;
  }
}
</style>
