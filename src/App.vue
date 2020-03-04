<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
import { _getSeller } from './api/index'
import Tab from './components/tab/tab'

export default {
  name: 'App',
  components: {
    Tab,
    VHeader
  },
  data () {
    return {
      seller: {},
      tabs: [{
        label: '商品'
      }, {
        label: '评价'
      }, {
        label: '商家'
      }]
    }
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      _getSeller().then((res) => {
        this.seller = res.data
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
