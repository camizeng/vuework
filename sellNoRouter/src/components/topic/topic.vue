<template>
  <div class="topictitle">
    <div class="line"></div>
    <div class="text" v-text="topicname"></div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      topicname: {
        type: String
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .topictitle
    display: flex
    width: 80%
    margin: 20px auto 24px auto
    .line
      flex: 1
      position: relative
      top: -6px
      border-bottom: 1px solid rgba(255,255,255,0.2)
    .text
      padding: 0 12px
      font-size: 14px
      font-weight: 700
</style>
