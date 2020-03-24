//global styles and components
//all global styles, components and mixins are injected into 'main.js' from the 'globetakers' plugin

/**
 * @author -- Peter Collins cpnzereogu@gmail
 */

import globalStyles from "../layout/globalStyles"
import globalComponents from "../components/globalComponents"
import globalMixins from "../mixins/globalMixins"
import Popover  from 'vue-js-popover'

export default {
/* eslint-disable-next-line */
    install(Vue,options) {
        Vue.use(globalStyles)
        Vue.use(globalComponents)
        Vue.use(globalMixins)
        Vue.use(Popover)
    }
}