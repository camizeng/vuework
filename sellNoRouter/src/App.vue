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
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from './components/header/Header';
  import {urlParse} from './common/js/util';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log('queryParam', queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        // console.log('App-response', response);

        if (response.errno === ERR_OK) {
          // this.seller = response.data;
          // console.log('App-seller', this.seller);
          // 给对象扩展属性
          this.seller = Object.assign({}, this.seller, response.data);
          console.log('seller.id=', this.seller.id);
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
