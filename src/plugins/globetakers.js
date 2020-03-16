//global styles and components
//all global styles and components are injected into 'main.js' from the 'globetakers' plugin

/**
 * @author -- Peter Collins cpnzereogu@gmail
 */

import globalComponents from "../components/globalComponents"

export default {
/* eslint-disable-next-line */
    install(Vue,options) {
    Vue.use(globalComponents)
    }
}