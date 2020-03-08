/**
* project: vue-sell-cube
* @author panshicheng
* @date 2020/3/7
* description:
*/
<template>
  <transition name="fade">
    <cube-popup
      v-show="visible"
      :mask-closable="true"
      :z-index= 50
      position="bottom"
      type="shop-cart-list"
      @mask-click="maskClick"
    >
      <transition
        name="move"
        @after-leave="afterLeave"
      >
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <cube-scroll ref="listcontent" class="list-content">
            <ul>
              <li v-for="(food, index) in selectFoods" :key="index" class="food">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price * food.count }}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add="addFood"></cart-control>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import CartControl from '../cart-control/cart-control'

const EVENT_HIDE = 'hide'
const EVENT_ADD = 'add'
const EVENT_LEAVE = 'leave'

export default {
  name: 'shop-cart-list',
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    CartControl
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    addFood (target) {
      this.$emit(EVENT_ADD, target)
    },
    empty () {
      this.dialogComp = this.$createDialog({
        type: 'confirm',
        content: '清空购物车？',
        $events: {
          confirm: () => {
            this.selectFoods.forEach((food) => {
              food.count = 0
            })
            this.hide()
          }
        }
      })
      this.dialogComp.show()
    },
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.listcontent.refresh()
      })
    },
    hide () {
      this.visible = false
      this.$emit(EVENT_HIDE)
    },
    maskClick () {
      this.hide()
    },
    afterLeave () {
      this.$emit(EVENT_LEAVE)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .cube-shop-cart-list
    bottom: 48px
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all .3s ease-in-out
    .move-enter, .move-leave-active
      transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
      transition: all .3s ease-in-out
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: $color-background-sssss
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)

    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: $color-white
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-weight: 700
          font-size: 14px
          color:  rgb(240, 20, 20)
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 6px

</style>
