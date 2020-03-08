/**
* project: vue-sell-cube
* @author panshicheng
* @date 3/5/20
* description:
*/

<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i :class="{'highlight': totalCount > 0}" class="icon-shopping_cart"></i>
            </div>
            <div v-show="totalCount > 0" class="num">
              <bubble :num="totalCount"></bubble>
            </div>
          </div>
          <div v-show="totalPrice > 0" :class="{'highlight':totalPrice > 0}" class="price">￥{{ totalPrice }}</div>
          <div class="desc" >另需配送费￥{{ deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div :class="payClass" class="pay" @click="pay">
            {{ payDesc }}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"/>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from '../bubble/bubble'
const BALL_LEN = 10

function createBalls () {
  const ret = []
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({
      show: false
    })
  }
  return ret
}
export default {
  name: 'shop-cart',
  components: { Bubble },
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 10,
          count: 1
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    fold: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      balls: createBalls(),
      dropBalls: [],
      listFold: this.fold
    }
  },
  computed: {
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice} 元起送`
      } else if (this.totalPrice < this.minPrice) {
        const diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    pay (e) {
      if (this.totalPrice < this.minPrice) {
        return
      }
      this.$createDialog({
        title: '支付',
        content: `您需要支付${this.totalPrice}元`
      }).show()
      e.stopPropagation()
    },
    drop (target) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = target
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        const ball = this.balls[count]
        if (ball.show) {
          const rect = ball.el.getBoundingClientRect()

          const x = rect.left - 32
          const y = -(window.innerHeight - rect.top - 32)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          // 设置元素inner-hook的属性
          const inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el, done) {
      this._reflow = document.body.offsetHeight
      el.style.webkitTransform = 'translate3d(0,0,0)'
      el.style.transform = 'translate3d(0,0,0)'
      // 设置元素inner-hook的属性
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.webkitTransform = 'translate3d(0,0,0)'
      inner.style.transform = 'translate3d(0,0,0)'
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      if (this.listFold) {
        if (!this.totalCount) {
          return
        }
        this.listFold = false
        this._showShopCartList()
        this._showShopCartSticky()
      } else {
        this.listFold = true
        this._hideShopCartList()
      }
    },
    _showShopCartList () {
      this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
        $props: {
          selectFoods: 'selectFoods'
        },
        $events: {
          hide: () => {
            this.listFold = true
          },
          add: (el) => {
            this.shopCartStickyComp.drop(el)
          },
          leave: () => {
            this._hideShopCartSticky()
          }
        }
      })
      this.shopCartListComp.show()
    },
    _hideShopCartList () {
      const list = this.sticky ? this.$parent.list : this.shopCartListComp
      list.hide && list.hide()
    },
    _showShopCartSticky () {
      this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
        $props: {
          selectFoods: 'selectFoods',
          deliveryPrice: 'deliveryPrice',
          minPrice: 'minPrice',
          fold: 'listFold',
          list: this.shopCartListComp // 将shop-cart-list 作为父组件
        }
      })
      this.shopCartStickyComp.show()
    },
    _hideShopCartSticky () {
      this.shopCartStickyComp.hide()
    }
  },
  watch: {
    fold (newVal) {
      this.listFold = newVal
    },
    totalCount (count) {
      if (!this.fold && count === 0) {
        this._hideShopCartList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .shopcart
    left: 0
    bottom: 0
    z-index: 50
    height: 48px
    width: 100%
    .content
      display: flex
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      background: $color-shop-card
      .content-left
        width: 250px
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: $color-shop-card
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: $font-size-large-a
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: $font-size-small
      .content-right
        flex: 0 0 135px
        width: 135px
        .pay
          height: 48px
          line-height: 48px
          font-size: 12px
          text-align: center
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: all 0.4s linear
</style>
