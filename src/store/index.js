import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  user: {},

  local: {
    device: {
      mobile: () => {
        let value

        window.innerWidth < 1024
        ? value = true
        : value = false

        return value
      },

      platform: navigator.platform,
      userAgent: navigator.userAgent
    }
  },

  network: {
    online: true,
    showNetworkMessage: false,
    networkMessage: ''
  },
  
  analytics: {},
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  dateString() {
    let date = new Date()

    return `${this.days[date.getDay()]}:  ${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
  },

  timeString() {
    let date = new Date()

    return ` -- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },

  timeZone() {
    let date = new Date()

    return ` -- ${date.getTimezoneOffset()}`
  },

  cookieDate() {
    let date = new Date(),
    weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekDay = weekDays[date.getDay()],
    monthDay = date.getDate(),
    month = months[date.getMonth() + 1],
    year = date.getFullYear(),
    value = `${weekDay} ${monthDay} ${month} ${year} 12:00:00 UTC`

    return value
  },

  loggingOut: false,
  refreshUser: false,
  adminAccess: false,
  inspectStudent: ''
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
          alert("nesting depth has exceeded setter's nesting limit @ store.js")
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
  getState (state) { return state },
  getUserData (state) { return state.user },
  getLocalData (state) { return state.local },
  getNetworkData (state) { return state.network },
  getAnalyticsData (state) { return state.analytics }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {}
})
