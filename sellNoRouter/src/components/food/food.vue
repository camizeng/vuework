<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="foodInfo">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span clas="reting">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @add="addFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>

      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    components: {cartcontrol},
    methods: {
      show() { // 父组件可调用子组件，子组件不可调用父组件
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodInfo, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        // console.log('target', event.target);
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    top: 0
    left:0
    bottom: 48px
    width:100%
    background: #fff
    z-index: 30
    transition: all 0.5s linear
    transform: translate3d(0,0,0)
    &.move-enter,&.move-leave-active
      transform: translate3d(100%,0,0)
    .img-header
      position: relative
      width: 100%
      height: 0
      /* height设置为0，使用padding-top/padding-bottom 实现宽高相等的容器 */
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position:relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 14px
        font-size:0
        .sell-count,.rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right:12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147,153,159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        border-radius: 12px
        color: #fff
        background: rgb(0,160,240)
        transition: all 0.2s linear
        opacity: 1
        &.fade-enter,&.fade-leave-active
          opacity: 0.5
</style>
