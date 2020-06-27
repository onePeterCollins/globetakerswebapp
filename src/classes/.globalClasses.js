
import User from "./User.js"

export default {
    install(Vue) {
        Vue.prototype.$User = new User()
    }
}
