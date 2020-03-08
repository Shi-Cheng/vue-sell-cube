<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :initial-index="initialIndex"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import { getSeller } from './api/index'
import Tab from './components/tab/tab'
import qs from 'query-string'

export default {
  name: 'App',
  components: {
    Tab,
    VHeader
  },
  data () {
    return {
      seller: {
        id: qs.parse(location.search).id
      },
      initialIndex: 0
    }
  },
  created () {
    this._getSeller()
  },
  computed: {
    tabs () {
      return [{
        label: '商品',
        component: Goods,
        data: this.seller
      }, {
        label: '评价',
        component: Ratings,
        data: this.seller
      }, {
        label: '商家',
        component: Seller,
        data: this.seller
      }]
    }
  },
  methods: {
    _getSeller () {
      getSeller({
        id: this.seller.id
      }).then((res) => {
        this.seller = res
      })
    }
  }
}
</script>

<style lang="stylus">
#app
  .tab-wrapper
    position: fixed
    top: 136px
    left: 0
    right: 0
    bottom: 0
</style>
