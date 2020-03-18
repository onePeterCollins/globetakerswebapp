//global mixins include all custom mixins built specially for this project
//all global mixins are imported into the 'globetakers' plugin

/**
 * @author -- Peter Collins cpnzereogu@gmail
 */

import Emojis from "./EmojisMixin.js"

export default {
    install(Vue) {
        Vue.use(Emojis)
    }
}
