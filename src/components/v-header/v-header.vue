/**
* project: vue-sell-cube
* @author panshicheng
* @date 3/3/20 12:44 AM
* description:
*/
<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }} 分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
          <span class="text">{{ seller.supports[0].description }} </span>
        </div>
        <div v-if="seller.supports" class="support-count"  @click="showDetail">
          <span class="count">{{ seller.supports.length }}个</span>
          <i class="icon-keyboard_arrow_right"/>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"  @click="showDetail">
      <span class="bulletin-title"/><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"/>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <header-detail ref="headdetail" v-show="showHeader" :seller="seller" @headerChange="headerChange"></header-detail>
  </div>
</template>

<script>
import SupportIco from '../support-ico/support-ico'
import HeaderDetail from '../header-detail/header-detail'
export default {
  name: 'v-header',
  components: {
    HeaderDetail,
    SupportIco
  },
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showHeader: false
    }
  },
  methods: {
    showDetail () {
      this.showHeader = true
    },
    headerChange (state) {
      this.showHeader = state
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable.styl"
  .header
    position: relative
    overflow: hidden
    color: $color-background-sssss
    background: $color-background-ss
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: $font-size-zero
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: $font-size-large
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
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
          line-height: 12px;
          font-size: $font-size-small
        .supports
          .text
            vertical-align: top
            margin-left: 10px
            line-height: 12px
            font-size: 12px
        .support-count
          position: absolute
          right: 12px
          bottom: 18px
          padding: 0 8px
          height: 24px
          line-height: 24px
          border-radius: 14px
          background: $color-background-ssss
          .count
            vertical-align: top
            font-size: 10px
          .icon-keyboard_arrow_right
            margin-left: 4px
            font-size: $font-size-small
            line-height: 24px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: $color-background-sss
      .bulletin-title
        display : inline-block
        vertical-align: top
        margin-top: 7px;
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat:no-repeat
      .bulletin-text
        vertical-align: top
        font-size: 10px
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        font-size:10px
        right: 12px
        top: 8px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
</style>
