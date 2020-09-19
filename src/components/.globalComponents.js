//global components include all custom components built specially for this project
//all global components are imported into the 'globetakers' plugin

/**
 * @author -- Peter Collins onepetercollins@gmail.com
 */

import AdminLoginForm from "./AdminLoginForm.vue"
import AwaitingVerification from "./AwaitingVerification.vue"
import ContactForm from "./ContactForm.vue"
import InteractiveForumForm from "./InteractiveForumForm.vue"
import InteractiveSessionMenu from "./InteractiveSessionMenu.vue"
import LogoutDialog from "./LogoutDialog.vue"
import Navigation from "./Navigation.vue"
import NetworkMessage from "./NetworkMessage.vue"
import ProfileSetup from "./ProfileSetup.vue"
import RegForm from "./RegistrationForm.vue"
import SessionMonitor from "./SessionMonitor.vue"
import SocialMediaLinksBottom from "./SocialMediaLinksBottom.vue"
import StudentCounter from "./StudentCounter.vue"
import StudentDashboardContent from "./StudentDashboardContent.vue"
import StudentLoginForm from "./StudentLoginForm.vue"
import TrainerDashboardContent from "./TrainerDashboardContent.vue"
import TrainerLoginForm from "./TrainerLoginForm.vue"


export default {
    install(Vue) {
        Vue.component(AdminLoginForm.name, AdminLoginForm)
        Vue.component(AwaitingVerification.name, AwaitingVerification)
        Vue.component(ContactForm.name, ContactForm)
        Vue.component(InteractiveForumForm.name, InteractiveForumForm)
        Vue.component(InteractiveSessionMenu.name, InteractiveSessionMenu)
        Vue.component(LogoutDialog.name, LogoutDialog)
        Vue.component(Navigation.name, Navigation)
        Vue.component(NetworkMessage.name, NetworkMessage)
        Vue.component(ProfileSetup.name, ProfileSetup)
        Vue.component(RegForm.name, RegForm)
        Vue.component(SessionMonitor.name, SessionMonitor)
        Vue.component(SocialMediaLinksBottom.name, SocialMediaLinksBottom)
        Vue.component(StudentCounter.name, StudentCounter)
        Vue.component(StudentDashboardContent.name, StudentDashboardContent)
        Vue.component(StudentLoginForm.name, StudentLoginForm)
        Vue.component(TrainerDashboardContent.name, TrainerDashboardContent)
        Vue.component(TrainerLoginForm.name, TrainerLoginForm)
    }
}