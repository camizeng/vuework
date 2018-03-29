<template>
  <span v-show="this.type>=0" class="icon" :class="[iconSize, iconImg]"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      iconSize() {
       // console.log('size:', this.size);
        return 'icont' + this.size;
      },
      iconImg() {
        // console.log('type:', this.type);
        return this.classMap[this.type];
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat
    &.icont1
      width: 12px
      height: 12px
      margin-right: 4px
      background-size: 12px 12px
      &.decrease
        bg-image('decrease_1')
      &.discount
        bg-image('discount_1')
      &.invoice
        bg-image('invoice_1')
      &.guarantee
        bg-image('guarantee_1')
      &.special
        bg-image('special_1')
    &.icont2
      width: 16px
      height: 16px
      margin-right: 6px
      background-size: 16px 16px
      &.decrease
        bg-image('decrease_2')
      &.discount
        bg-image('discount_2')
      &.invoice
        bg-image('invoice_2')
      &.guarantee
        bg-image('guarantee_2')
      &.special
        bg-image('special_2')
    &.icont3
      width: 12px
      height: 12px
      margin-right: 2px
      background-size: 12px 12px
      &.decrease
        bg-image('decrease_3')
      &.discount
        bg-image('discount_3')
      &.invoice
        bg-image('invoice_3')
      &.guarantee
        bg-image('guarantee_3')
      &.special
        bg-image('special_3')
    &.icont4
      width: 16px
      height: 16px
      margin-right: 6px
      background-size: 16px 16px
      &.decrease
        bg-image('decrease_4')
      &.discount
        bg-image('discount_4')
      &.invoice
        bg-image('invoice_4')
      &.guarantee
        bg-image('guarantee_4')
      &.special
        bg-image('special_4')
</style>
