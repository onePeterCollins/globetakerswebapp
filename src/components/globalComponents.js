//global components include all custom components built specially for this project
//all global components are imported into the 'globetakers' plugin

/**
 * @author -- Peter Collins cpnzereogu@gmail
 */

import ContactForm from "./ContactForm.vue"
import Navigation from "./Navigation.vue"
import StudentLoginForm from "./StudentLoginForm.vue"
import TrainerLoginForm from "./TrainerLoginForm.vue"


export default {
    install(Vue) {
        Vue.component(ContactForm.name, ContactForm)
        Vue.component(Navigation.name, Navigation)
        Vue.component(StudentLoginForm.name, StudentLoginForm)
        Vue.component(TrainerLoginForm.name, TrainerLoginForm)
    }
}