/**
* project: vue-sell-cube
* @author panshicheng
* @date 3/4/20
* description: goods页面
*/

<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :label="props.labels"
            :current="props.current"
            :txts="barTxts"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico
                  v-if="props.txt.type >= 1"
                  :size=3
                  :type="props.txt.type"
                ></support-ico>
                <span>{{ props.txt.name }}</span>
                <span v-if="props.txt.count" class="num">
                    <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="(good, index) in goods"
          :key="index"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li v-for="(food, foodIndex) in good.foods" :key="foodIndex" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc"> {{ food.description }}</p>
                <div class="extra">
                  <span>月售 {{ food.sellCount }} 份</span>
                  <span>好评率 {{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now"> ￥ {{ food.price }}</span>
                  <span v-show="food.oldPrice" class="old"> ￥{{ food.oldPrice }}</span>
                </div>
              </div>
              <div class="cart-control-wrapper">
                <cart-control :food="food" @add="addFood"></cart-control>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart ref="shopcart"
                 :select-foods="selectFoods"
                 :min-price="minPrice"
                 :delivery-price="deliveryPrice">

      </shop-cart>
    </div>
  </div>
</template>

<script>
import { getGoods } from '../../api'
import ShopCart from '../shop-cart/shop-cart'
import CartControl from '../cart-control/cart-control'
import SupportIco from '../support-ico/support-ico'
import Bubble from '../bubble/bubble'

const deliveryPrice = 20
const minPrice = 20

export default {
  name: 'goods',
  components: {
    Bubble,
    SupportIco,
    ShopCart,
    CartControl
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      goods: [],
      minPrice: minPrice,
      deliveryPrice: deliveryPrice,
      selectedFood: {},
      scrollOptions: {
        listenScroll: true,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    selectFoods () {
      const foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    barTxts () {
      const ret = []
      this.goods.forEach((good) => {
        const {
          type,
          name,
          foods
        } = good

        let count = 0
        foods.forEach((food) => {
          count += food.count || 0
        })
        ret.push({
          type,
          name,
          count
        })
      })
      return ret
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      this._getGoods()
    },
    addFood (el) {
      this._drop(el)
    },
    _getGoods () {
      getGoods().then((res) => {
        this.goods = res
      })
    },
    _drop (target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/style"
  @import "~common/stylus/variable.styl"
  .goods{
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper{
      position: absolute
      width: 100%
      top: 0
      left: 0
      bottom: 48px
      >>> .cube-scroll-nav-bar{
        width: 80px
        white-space: normal
        overflow: hidden
      }
      >>> .cube-scroll-nav-bar-item{
        padding: 0 10px
        display: flex
        align-items: center
        height: 56px
        line-height: 14px
        font-size: $font-size-small
        background: $color-background-sssss
        .text {
          flex: 1
          position: relative
        }
        .num {
          position: absolute
          right: -8px
          top: -10px
        }
        .support-ico {
          display: inline-block
          vertical-align: top
          margin-right: 4px
        }
        &.cube-scroll-nav-bar-item_active{
          background: $color-bar-active
        }
      }
      >>> .cube-sticky-content{
        .cube-scroll-nav-panel-title{
          padding-left: 14px;
          height: 26px
          line-height: 26px
          border-left: 2px solid $color-col-line
          background-color: $color-background-sssss
          color: $color-test-cc
        }
      }
      .food-item{
        display: flex
        margin: 18px
        padding-bottom: 18px
        position: relative
        &:last-child{
          border-none()
          margin-bottom: 0
        }
        .icon{
          flex: 0 0 57px
          margin-right: 10px
          img {
            height: auto
          }
        }
        .content{
          flex: 1
          .name{
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: $font-size-large
            color: $color-test-d
          }
          .desc{
            margin-bottom: 8px
            height: 10px
            line-height: 10px
            font-size: $font-size-small
            color: $color-test-c
          }
          .extra{
            margin: 8px 0 8px 0
            height: 10px
            line-height: 10px
            font-size: $font-size-small
            color: $color-test-c
            span:last-child{
              margin-left: 12px
            }
          }
          .price{
            width: 15%
            font-weight: 24px
            .now{
              margin-left: 8px
              font-size: $font-size-large
              height: 24px
              line-height: 24px
              color: $color-red
            }
            .old{
              text-decoration: line-through
              font-size: $font-size-small
              height: 24px
              line-height: 24px
              color: $color-test-c
            }
          }
        }
        .cart-control-wrapper{
          position: absolute
          right: 0
          bottom: 12px
        }
      }
    }
  }
  .shop-cart-wrapper{
    position: absolute
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
  }
</style>
