<template>
  <div class="header">
    <div class="content-warpper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!--<span class="icon" :class="classMap[seller.supports[0].type]"></span>-->
          <supporticon :type="seller.supports[0].type" :size="1"></supporticon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 背景图片 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <!-- 弹出评价层 -->
    <transition name="fade" enter-active-class="fade-enter-active">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <!-- 星 -->
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>

            <!-- topic 1-->
            <topic :topicname="'优惠信息'"></topic>

            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports" :key="item.id">
                <!--<span class="icon" :class="classMap[item.type]"></span>-->
                <supporticon :type="item.type" :size="2"></supporticon>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <!-- topic 2-->
            <topic :topicname="'商家公告'"></topic>

            <!-- bulletin -->
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">×</div>
      </div>
    </transition>

    <!-- flex 弹层布局 for test-->
   <!-- <div class="detail-flex" v-show="detailShow">
      <div class="detail-main" >
        <p>{{seller.bulletin}}</p>
      </div>
      <div class="footer">×</div>
    </div>-->

  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import topic from 'components/topic/topic';
  import supporticon from 'components/support/supporticon';

  export default {
    data() {
      return {
        detailShow: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      showDetail: function() {
         console.log(this.detailShow);
        this.detailShow = true;
      },
      hideDetail: function() {
        this.detailShow = false;
      }
    },
    // /* created() {
    //    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    //  },*/
    components: {star, topic, supporticon}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  @import "../../common/stylus/icon";
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-warpper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: bottom
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          /*.icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            marigh-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.invoice
              bg-image('invoice_1')
            &.guarantee
              bg-image('guarantee_1')
            &.special
              bg-image('special_1')*/
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 10px
      background: rgba(0, 0, 0, 0.2)
      .bulletin-icon
        vertical-align top
        display: inline-block
        margin-top: 9px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align top
        margin: 0 4px
        font-size: 10px
        height: 12px;
      .icon-keyboard_arrow_right
        position: absolute
        right: 10px
        top: 10px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      transition: all 0.5s
      backdrop-filter: blur(10)
      background: rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height: 100%
        width:100%
        .detail-main
          padding: 44px 0
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-botton: 0
              /*.icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.invoice
                  bg-image('invoice_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.special
                  bg-image('special_2')*/
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -40px auto 0 auto
        clear: both
        font-size: 32px
    .fade-enter-active, .fade-leave-active {
      opacity: 1
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0
     /* background: rgba(7, 17, 27, 0)*/
    }
    .detail-flex
      position:fixed
      top: 0
      left: 0
      display: flex
      flex-flow: column
      overflow: auto
      background: rgba(0,0,0,0.4)
      height: 100%
      .detail-main
        min-height: 100%
        flex: 1
        padding:44px 8px
      .footer
        flex: 0 1 auto
        text-align: center
        font-size: 32px;
        padding: 0 6px
</style>
