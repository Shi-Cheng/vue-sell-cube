/**
* project: vue-sell-cube
* @author panshicheng
* @date 3/3/20 12:44 AM
* description:
*/

/**
* project: vue-sell-cube
* @author panshicheng
* @date ${DATE}
* description:
*/
<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }} 分钟送达
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
