//global mixins include all custom mixins built specially for this project
//all global mixins are imported into the 'globetakers' plugin

/**
 * @author -- Peter Collins cpnzereogu@gmail
 */

import AnimationMixin from "./AnimationMixin.js"
import Emojis from "./EmojisMixin.js"
import GetComputedStyles from "./GetComputedStyles.js"

export default {
    install(Vue) {
        Vue.use(AnimationMixin)
        Vue.use(Emojis)
        Vue.use(GetComputedStyles)
    }
}
