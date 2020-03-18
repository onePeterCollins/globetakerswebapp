import emojis from "node-emoji"

export default {
    install (Vue) {
      Vue.mixin({
        data: () => ({
            emoji: ''
        }),

        mounted() {
          // alert(emojis.emojify(':heart:'))
          this.emoji = emojis
        }
      })
    }
  }