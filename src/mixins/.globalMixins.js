//global mixins include all custom mixins built specially for this project
//all global mixins are imported into the 'globetakers' plugin

/**
 * @author -- Peter Collins onepetercollins@gmail.com
 */

import AnimationMixin from "./AnimationMixin.js"
import Downloader from "./Downloader.js"
import Emojis from "./EmojisMixin.js"
import GetComputedStyles from "./GetComputedStyles.js"
import Tokenizer from "./Tokenizer.js"
import Uploader from "./Uploader.js"

export default {
    install(Vue) {
        Vue.use(AnimationMixin)
        Vue.use(Downloader)
        Vue.use(Emojis)
        Vue.use(GetComputedStyles)
        Vue.use(Tokenizer)
        Vue.use(Uploader)
    }
}
