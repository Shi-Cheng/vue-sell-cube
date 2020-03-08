/**
* project: vue-sell-cube
* @author panshicheng
* @date 3/4/20
* description:
*/

<template>
    <transition name="fade">
      <div v-show="detail" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item, index) in seller.supports" :key="index" class="support-item">
                <div class="support-icon">
                  <support-ico :size="2" :type="seller.supports[index].type"></support-ico>
                </div>
                <span class="text"> {{ item.description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="buttetin">
              <p class="content"> {{ seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideClose">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
</template>

<script>
import SupportIco from '../support-ico/support-ico'
import Star from '../star/star'
export default {
  name: 'header-detail',
  components: {
    SupportIco,
    Star
  },
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    },
    showHeader: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      detail: this.showHeader
    }
  },
  methods: {
    show () {
      this.detail = true
    },
    hideClose () {
      this.detail = false
      this.$emit('headerChange', this.detail)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .detail{
    position: fixed
    z-index: 50
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: hidden
    color: $color-white
    background: $color-background-s
    backdrop-filter: blur(10px)
    transition: all 0.5s
    &.fade-leave-active{
      opacity: 1;
      background: rgba(7, 17, 27, 0.8)
      transition: all 0.3s
    }
    &.fade-enter, &.fade-leave-active{
      opacity: 0;
      background: rgba(7, 17, 27, 0)
    }
    .detail-wrapper{
      width: 100%
      min-height: 100%
      .detail-main{
        margin-top: 64px
        padding-bottom: 64px
        .name {
          font-weight: 700px
          line-height: 16px
          text-align: center
          font-size: 16px
        }
        .star-wrapper{
          margin-top: 18px
          padding: 2px 0
          text-align: center
        }
        .title{
          display: flex
          width: 80%
          margin: 30px auto 24px auto
          .line{
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          }
          .text{
            padding: 0 12px
            font-weight: 700
            font-size: $font-size-large
          }
        }
        .supports{
          width: 80%
          margin: 0 auto
          .support-item{
            padding: 0 12px
            margin-bottom: 12px
            font-size: $font-size-zero
            .support-icon{
              display: inline-block
            }
            .text{
              vertical-align: top
              line-height:16px
              font-size: $font-size-middle
            }
          }
        }
        .buttetin{
          width: 80%
          margin: 0 auto
          .content{
            padding: 0 12px
            line-height: 24px
            font-size: $font-size-middle
          }
        }
      }
    }
    .detail-close{
      position: relative
      width: 32px
      height: 32px
      margin: -50px auto 0 auto
      clear: both
    }
  }
</style>
