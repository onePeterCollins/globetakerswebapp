// Quickly and easily upload data to firestore within components
import {db} from '../firebase'

export default {
    install (Vue) {
        Vue.prototype.$Upload = {}

        Vue.mixin({
            mounted() {
                this.$Upload = async function (collection, document, token) {
                    let object = {}

                    for (let item in token) {
                        object[item] = token[item]
                    }

                    return db.collection(collection).doc(document).set(object)
                }
            }
        })
    }
}