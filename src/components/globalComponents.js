//global components include all custom components built specially for this project
//all global components are imported into the 'globetakers' plugin

/**
 * @author -- Peter Collins cpnzereogu@gmail
 */

import Navigation from "./Navigation.vue"

export default {
    install(Vue) {
    Vue.component(Navigation.name, Navigation)
    }
}