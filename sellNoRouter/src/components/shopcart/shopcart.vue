<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <!-- Logo 购物车字体样式 -->
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <!-- 购买价格 -->
          <div class="price" :class="{'highlight': totalPrice>0}">￥{{totalPrice}}元</div>
          <!-- 配送价格 等描述 -->
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <!-- right 固定 （结算） -->
        <!-- .stop-阻止冒泡 .prevent-阻止默认事件 -->
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            <!--￥{{minPrice}}元起送-->
            {{payDesc}}
          </div>
        </div>
      </div>
      <!-- 小球动画 -->
      <div class="ball-container">
        <div v-for="ball in balls" :key="ball.id">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 购物车例表 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.id">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <!-- 购物车例表的后背景，所以v-show 为listShow 但其样式是居于整个屏幕定位，所以与shopcart同级 -->
    <transition name="fade">
      <div class="list-mask" @click="hideList"  v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BCscall from 'better-scroll';

  export default {
    components: {cartcontrol},
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            // {price: 30, count: 1}
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          // 用`反引号，可以不用+号拼接 es6
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          /* eslint-disable */
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scoll) {
              this.scoll = new BCscall(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scoll.refresh();
            }
          })
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        // console.log(el);
        // console.log('balls', this.balls);
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          console.log('ball' + i, ball.show);
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
           // console.log(this.balls.toString());
            return;
          }
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if(this.totalPrice < this.minPrice){
          return;
        }
        console.log('total', this.totalPrice);
        // 注意：alert在模拟手机端无法弹出 最好单独做弹出组件,以适应pc 与手机端 ,后续完善 !!
        window.alert(`总共需支付:${this.totalPrice} 元`);

      },
      beforeDrop(el) {
        console.log('before-enter');
        let count = this.balls.length;
       // console.log(count);
        while (count--) {
         // console.log(count);
          let ball = this.balls[count];
          console.log('beforeDrop-show', ball.show);
          if (ball.show) {
            // 浏览器接口，返回视口位置
            let rect = ball.el.getBoundingClientRect();
            console.log(rect);
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = 'inline-block';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        console.log('enter--');
        console.log('el', el);
        console.log(done);
        //  触发浏览器重绘
        /* eslint-disable */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        console.log('enter-leave');
        let ball = this.dropBalls.shift();
        console.log(ball.show);
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    background: #000
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background:  #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center;
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin-left: 12px
          margin-top: 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            backgound: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0,160,220)
          transition: all 0.4s linear

    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0,-100%,0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 1s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0,0,0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .title
          float:left;
          font-size: 14px
          color: rgb(7,17,27)
        .empty
          float:right;
          font-size: 12px
          color: rgb(0,160,220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding 12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7,17,27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240,20,20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    opacity: 1
    background: rgba(7,17,27,0.6)
    backdrop-filter: blur(10px)
    &.fade-enter, &.fade-leave
      opacity: 0
      background: rgba(7,17,27,0)
</style>
