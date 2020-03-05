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
                <div class="cartcontrol-wrapper">
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
  </div>
</template>

<script>
import { getGoods } from '../../api'

export default {
  name: 'goods',
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
      scrollOptions: {
        listenScroll: true,
        directionLockThreshold: 0
      }
    }
  },
  created () {
    this._getGoods()
  },
  methods: {
    _getGoods () {
      getGoods().then((res) => {
        this.goods = res
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
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
        border-1px($color-row-line)
        font-size: $font-size-small
        background: $color-background-sssss
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
        border-1px($color-row-line)
        &:last-child{
          border-none()
          margin-bottom: 0
        }
        .icon{
          flex: 0 0 57px
          margin-right: 10px
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
          .cartcontrol-wrapper{
            position: absolute
            right: 0
            bottom: 12px
          }
        }
      }
    }
  }
</style>
