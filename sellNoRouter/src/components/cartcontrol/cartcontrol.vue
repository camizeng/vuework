<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" @click.stop.prevent="decrease" v-show="food.count>0">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
        <div class="cart-count" v-if="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decrease(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count === 1) {
          Vue.delete(this.food, 'count');
        } else {
          this.food.count--;
        }
        // this.food.count -= 1;
      },
      addCart(event) {
        // console.log(event._constructed);
        if (!event._constructed) {
          return;
        }
        // console.log(this.food.count);
        if (!this.food.count) {
          // 对于观察者，对象中没有的属性做增加删除，是感知不到的，需要通过Vue.set先设置
          // this.food.count = 1;
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      /*transform: translate3d(0,0,0)*/
      .inner
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
        transition: all 0.4s linear
      &.move-enter-active,&.move-leave-active
        transition: all 0.4s linear
      &.move-enter,&.move-leave-active
        opacity: 0
        transform: translate3d(48px,0,0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      font-size: 12px;
      line-height:24px;
      width: 12px
      padding-top: 6px;
      text-align: center
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
</style>
