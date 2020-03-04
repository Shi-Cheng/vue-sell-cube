/**
* project: vue-sell-cube
* @author panshicheng
* @date 3/4/20
* description:
*/

<template>
    <div class="tab">
      <cube-tab-bar
        ref="tabBar"
        showSlider=true
        v-model="selectedLabel"
        :data="tabs"
        class="border-bottom-1px">
      </cube-tab-bar>
      <div class="slide-wrapper">
        <cube-slide>
          <cube-slide-item v-for="(tab, index) in tabs" :key="index">
            <component :is="tab.component" :data="tab.data" ></component>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      selectedLabel: ''
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
  >>> .cube-tab
    padding: 10px 0
    display: flex
    flex-direction: column
    height: 100%
    .slide-wrapper
      flex: 1;
      overflow: hidden
</style>
