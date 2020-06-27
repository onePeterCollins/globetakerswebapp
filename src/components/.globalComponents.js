//global components include all custom components built specially for this project
//all global components are imported into the 'globetakers' plugin

/**
 * @author -- Peter Collins onepetercollins@gmail.com
 */

import ContactForm from "./ContactForm.vue"
import Navigation from "./Navigation.vue"
import RegForm from "./RegistrationForm.vue"
import SocialMediaLinksBottom from "./SocialMediaLinksBottom.vue"
import StudentCounter from "./StudentCounter.vue"
import StudentLoginForm from "./StudentLoginForm.vue"
import TrainerLoginForm from "./TrainerLoginForm.vue"


export default {
    install(Vue) {
        Vue.component(ContactForm.name, ContactForm)
        Vue.component(Navigation.name, Navigation)
        Vue.component(RegForm.name, RegForm)
        Vue.component(SocialMediaLinksBottom.name, SocialMediaLinksBottom)
        Vue.component(StudentCounter.name, StudentCounter)
        Vue.component(StudentLoginForm.name, StudentLoginForm)
        Vue.component(TrainerLoginForm.name, TrainerLoginForm)
    }
}