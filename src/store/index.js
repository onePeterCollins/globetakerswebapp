import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  user: {
    name: '',
    id: '',
    token: '',
    type: '',
    email: ''
  },

  local: {
    device: {},
    analytics: {}
  },

  network: {
    lectures: {}
  }
}

let mutations = {
  // SET ANY GIVEN FIELD IN THE STATE TO A GIVEN NEW VALUE
  SETVALUE (state, payload) {
    // THIS BLOCK IS FOR SETTING NESTED OBJECT VALUES DYNAMICALLY
    // payload.child is an array containing the roadmap to the field to be set
    // EG; TO SET foo.bar.baz.zed, PAYLOAD.CHILD WILL BE PASSED AS FOLLOWS;
    // payload.child = ['foo', 'bar', 'baz', 'zed']

    if (payload.child) {
      for (let i = 0; i < payload.child.length; i++) {
        if (payload.child.length === 1) {
          state[payload.name][payload.child[i]] = payload.newVal
        } else if (payload.child.length === 2) {
          state[payload.name][payload.child[0]][payload.child[i]] = payload.newVal
        } else if (payload.child.length === 3) {
          state[payload.name][payload.child[0]][payload.child[1]][payload.child[i]] = payload.newVal
        } else if (payload.child.length === 4) {
          state[payload.name][payload.child[0]][payload.child[1]][payload.child[2]][payload.child[i]] = payload.newVal
        } else if (payload.child.length === 5) {
          state[payload.name][payload.child[0]][payload.child[1]][payload.child[2]][payload.child[3]][payload.child[i]] = payload.newVal
        } else if (payload.child.length === 6) {
          state[payload.name][payload.child[0]][payload.child[1]][payload.child[2]][payload.child[3]][payload.child[4]][payload.child[i]] = payload.newVal
        } else if (payload.child.length > 6) {
          alert("value has exceeded setter's nesting limit @ store.js")
        }
      }
    } else {
      state[payload.name] = payload.newVal
    }
  }
}

let actions = {
  // HANDLER FOR setValue -- TO SET ANY VALUE IN THE STATE, GIVEN THE VALUE NAME, AND THE NEW VALUE
  setValue (context, value) {
    context.commit('SETVALUE', value)
  }
}

let getters = {
  getUserData (state) { return state.user },
  getLocalData (state) { return state.local },
  getNetworkData (state) { return state.network }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {}
})
