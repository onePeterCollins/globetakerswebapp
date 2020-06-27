//global styles and components
//all global styles, components and mixins are injected into 'main.js' from the 'globetakers' plugin

/**
 * @author -- Peter Collins onepetercollins@gmail.com
 */

import globalClasses from "../classes/.globalClasses"
import globalStyles from "../layout/.globalStyles"
import globalComponents from "../components/.globalComponents"
import globalMixins from "../mixins/.globalMixins"
import Popover  from 'vue-js-popover'

export default {
/* eslint-disable-next-line */
    install(Vue,options) {
        Vue.use(globalClasses)
        Vue.use(globalStyles)
        Vue.use(globalComponents)
        Vue.use(globalMixins)
        Vue.use(Popover)
    }
}