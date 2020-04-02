import emojis from "node-emoji"

export default {
    install (Vue) {
      Vue.mixin({
        data: () => ({
            emoji: ''
        }),

        mounted() {
          this.emoji = emojis
        }
      })
    }
  }
