// Add animation properties for page load transitions across all components

export default {
    install (Vue) {
      Vue.prototype.$keys = [] // available as $keys in all templates

      Vue.mixin({
        data: () => ({
            // animation features can be configured within each component
            anim: {
                on: false,
                count: 0,
                delay: 150,
                limit: 10,
            }
        }),

        computed: {
            animationTrigger() {
                return this.anim.on
            }
        },

        watch: {
            animationTrigger() {
                let ROOT = this

                this.$keys = []
                this.$forceUpdate();
          
                (function anim() {
                    let count = ROOT.anim.count
                    let delay = ROOT.anim.delay
                    let limit = ROOT.anim.limit

                  if(count === limit) {
                    clearTimeout(anim, delay)
                  } else {
                    ROOT.anim.count++
                    ROOT.$keys.push(true)
                    ROOT.$forceUpdate()
                    setTimeout(anim, delay)
                  }
                })()
            }
        },

        mounted() {
          if (this.$options.hasAnim) {
            this.anim.on = ''
            this.anim.on = true
          } else {
            this.anim.on = ''
            this.anim.on = false
          }
        }
      })
    }
  }
