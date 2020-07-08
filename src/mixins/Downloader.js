// Download objects from firestore and attach methods to them before use
import User from '../classes/User'

export default {
    install(Vue) {
        Vue.prototype.$Download = {}

        Vue.mixin ({
            mounted () {
                this.$Download = async function (payload) {
                    let mergedObject

                    // download user object from network and merge it with local user object methods
                    if (payload._typeof === 'user') {
                        mergedObject = new User()

                        for (let item in payload) {
                            mergedObject[item] = payload[item]
                        }

                        return mergedObject
                    }
                }
            }
        })
    }
}