<template>
  <div id="app">
    <v-header></v-header>
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header'
import { ERR_OK } from './api/config'

export default {
  name: 'App',
  components: {
    VHeader
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.code === ERR_OK) {
          console.log(response)
          this.seller = response
        }
      })
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
