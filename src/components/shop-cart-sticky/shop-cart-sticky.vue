/**
* project: vue-sell-cube
* @author panshicheng
* @date 2020/3/7
* description:
*/
<template>
  <div class="shop-cart-sticky" v-show="visible">
    <shop-cart
      ref="shopcart"
      :selectFoods="selectFoods"
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
      :fold="fold"
      :sticky=true
    >
    </shop-cart>
  </div>
</template>

<script>
import ShopCart from 'components/shop-cart/shop-cart'
const EVENT_SHOW = 'show'
const EVENT_HIDE = 'hide'

export default {
  name: 'shop-cart-sticky',
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
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
    list: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    drop (el) {
      this.$refs.shopcart.drop(el)
    },
    show () {
      this.visible = true
      this.$emit(EVENT_SHOW)
    },
    hide () {
      this.visible = false
      this.$emit(EVENT_HIDE)
    }
  },
  components: {
    ShopCart
  }
}
</script>

<style lang="stylus" scoped>
  .shop-cart-sticky
    position: absolute
    left: 0
    bottom: 0
    z-index: 999
    width: 100%
    height: 48px
</style>
