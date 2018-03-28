<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods" class="tab-item">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings" class="tab-item">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller" class="tab-item">商家</router-link></div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from './components/header/Header';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        console.log('response', response);

        if (response.errno === ERR_OK) {
          this.seller = response.data;
          console.log('seller', this.seller);
        }
      });
    },
    components: {'v-header': Header}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    .tab-item
      flex: 1
      text-align: center
      & > a
        display : block
        font-size: 14px
        color: rbg(77,85,93);
        &.active
          color rgb(240,20,20)

</style>
