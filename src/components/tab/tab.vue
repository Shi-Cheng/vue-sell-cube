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
        :show-slider="true"
        v-model="selectedLabel"
        :data="tabs"
        class="border-bottom-1px"
        @change="changeTab"
      >
      </cube-tab-bar>
      <div class="slide-wrapper">
        <cube-slide
          ref="slide"
          :loop= false
          :auto-play= false
          :show-dots= false
          :initial-index="index"
          @change="onChange"
          @scroll="onScroll"
          :options="slideOptions"
        >
          <cube-slide-item v-for="(item, index) in tabs" :key="index">
            <component :is="item.component" :data="item.data"></component>
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
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    selectedLabel: {
      get () {
        return this.tabs[this.index].label
      },
      set (newVal) {
        this.index = this.tabs.findIndex((value) => {
          return value.label === newVal
        })
      }
    }
  },
  data () {
    return {
      index: 0,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  methods: {
    changeTab (value) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].label === value) {
          this.index = i
          return this.index
        }
      }
    },
    onChange (current) {
      this.index = current
    },
    onScroll (pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = -pos.x / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.tab{
  display: flex
  flex-direction: column
  height: 100%
  >>> .cube-tab {
    padding: 10px 0
  }
  .slide-wrapper {
    flex: 1
    overflow: hidden
  }
}

</style>
