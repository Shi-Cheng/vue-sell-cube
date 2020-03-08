/**
* project: vue-sell-cube
* @author panshicheng
* @date 3/5/20
* description:
*/

<template>
  <!--<div class="cartcontrol" @click.stop>-->
    <!--<transition name="move">-->
      <!--<div v-show="food.count>0" class="cart-decrease" @click.stop="decreaseCart">-->
        <!--<span class="inner icon-remove_circle_outline"></span>-->
      <!--</div>-->
    <!--</transition>-->
    <!--<div  v-show="food.count>0" class="cart-count">-->
      <!--<bubble :num="food.count"></bubble>-->
    <!--</div>-->
    <!--<div class="cart-add icon-add_circle" @click.stop="addCart"/>-->
  <!--</div>-->
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script>
const EVENT_ADD = 'add'
export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    add (event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit(EVENT_ADD, event.target)
    },
    decrease () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
  // methods: {
  //   addCart (event) {
  //     if (!event._constructed) {
  //       return
  //     }
  //     if (!this.food.count) {
  //       // 如果没有这个属性，通过set进行添加
  //       this.$set(this.food, 'count', 1)
  //     } else {
  //       this.$nextTick(() => {
  //         this.food.count++
  //       })
  //     }
  //     this.$emit(EVENT_ADD, event.target)
  //   },
  //   decreaseCart (event) {
  //     if (!event._constructed) {
  //       return
  //     }
  //     if (this.food.count) {
  //       this.food.count--
  //     }
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol{
    font-size: 0
    .cart-decrease{
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      &.move-enter-leave, &.move-leave-active{
        transition: all 0.4s linear
      }
      &.move-active, &.move-leave-to{
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner{
          transform: rotate(180deg)
        }
      }
      .inner {
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
      }
    }
    .cart-count{
      display: inline-block
      vertical-align: top
      font-size: 10px
      line-height: 24px
      padding-top: 6px
      padding-right: 5px
      width: 12px
      text-align: center
      color: rgb(147, 153, 159)
    }
    .cart-add{
      display: inline-block
      font-size: 24px
      line-height: 24px
      padding: 6px
      color: rgb(0, 160, 220)
    }
  }
</style>
