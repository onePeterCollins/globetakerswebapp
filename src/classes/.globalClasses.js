
import User from "./User.js"
import Admin from './Admin.js'

export default {
    install(Vue) {
        Vue.prototype.$User = new User()
        Vue.prototype.$Admin = new Admin()
    }
}
