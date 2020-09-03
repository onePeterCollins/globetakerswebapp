// Download objects from firestore and attach methods to them before use
import User from '../classes/User'

export default {
    install(Vue) {
        Vue.prototype.$Download = {}

        Vue.mixin ({
            mounted () {
                this.$Download = async function (payload) {
                    let mergedObject = new User()

                    // download user object from network and merge it with local user object methods
                    if (payload._typeof === 'user') {
                        Object.assign(mergedObject, payload)

                        return mergedObject
                    }
                }
            }
        })
    }
}