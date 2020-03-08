/**
 * project: vue-sell-cube
 * @author panshicheng
 * @date 2020/3/8
 * description:
 */

const EVENT_SHOW = 'show'
const EVENT_HIDE = 'hide'
const ALL = 2

export const popupMixin = {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$emit(EVENT_SHOW)
    },
    hide () {
      this.visible = false
      this.$emit(EVENT_HIDE)
    }
  }
}

export const ratingMixin = {
  data () {
    return {
      selectType: ALL,
      onlyContent: true
    }
  },
  computed: {
    computedRatings () {
      const ret = []
      this.ratings.forEach((rating) => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || rating.rateType === this.selectType) {
          ret.push(rating)
        }
      })
      return ret
    }
  },
  methods: {
    onToggle () {
      this.onlyContent = !this.onlyContent
    },
    onSelect (num) {
      this.selectType = num
    }
  }
}
