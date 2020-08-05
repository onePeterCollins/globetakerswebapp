<template>
  <v-app id="GT">
    <div id="top-conceal" class="fixed z4 lg-white"></div>
    <div id="bottom-conceal" class="fixed z4"></div>

    <g-navigation :showNav="showNav" @retract="retractNav"/>

    <v-app-bar
      app
      color="g-blue"
      dark
      fixed
    >      
      <v-toolbar-items>
        <v-avatar class="mt-1 mr-3">
          <v-img
          :src="require('./assets/images/logo.jpg')"
          contain
          width="50"
          height="50"
          transition="scale-transition" />
        </v-avatar>
      </v-toolbar-items>
      
      <v-toolbar-title class="display-1 app-toolbar-title">GBSi</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items v-if="!mobile">
        <v-btn link :to="homeLink">
          <v-icon small  class="mr-1">mdi-home</v-icon>
         
          <span>home</span>
        </v-btn>

        <v-btn link to="/about">
          <v-icon small class="mr-1">mdi-help</v-icon>
          
          <span>about</span>
        </v-btn>

        <v-btn link to="/contact">
          <v-icon small class="mr-1">mdi-phone</v-icon>

          <span>contact</span>
        </v-btn>

        <v-btn v-if="showLogoutButton" link to="/notifications">
          <v-icon small class="mr-1">mdi-message</v-icon>

          <span>notifications</span>
        </v-btn>

        <v-btn link to="/terms">
          <v-icon small class="mr-1">mdi-file</v-icon>

          <span>terms</span>
        </v-btn>

        <v-btn v-if="showLogoutButton" @click="logout()">
          <v-icon small class="mr-1">mdi-lock</v-icon>

          <span>logout</span>
        </v-btn>
      </v-toolbar-items>      

      <v-scale-transition>
        <v-app-bar-nav-icon
          v-if="mobile && animate"
          @click.stop="toggleNav" />
      </v-scale-transition>
    </v-app-bar>

    <g-logout-dialog />
    <g-network-message />

    <v-content id="GT-content">
      <router-view/>
    </v-content>

    <v-footer class="gray z5" fixed>
      <v-row justify="center">
          <p>&copy; Globe Takers 2020 all rights reserved.</p>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import {db} from './firebase'

export default {
  name: 'App',

  data: () => ({
    showNav: false,
    animate: '',
    homeLink: '/',
    users: [],
    admins: [],
    activeDump: [],
    activeToken: '',
    showLogoutButton: false,
    loggedIn: sessionStorage.getItem('loginState'),
    persistence: localStorage.getItem('loginState'),
    userId: '',
    adminToken: sessionStorage.getItem('adminToken')
  }),

  firestore: {
    users: db.collection('users'),
    admins: db.collection('admins'),
    activeDump: db.collection('activeDump'),
    activeToken: db.collection('activeDump').doc('token')
  },

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},
    persistUser() {return this.user ? this.user._persist : false},
    cookieDate() {return this.$store.getters.getState.cookieDate()},
    date() {return this.$store.getters.getState.dateString()},
    time() {return this.$store.getters.getState.timeString()},
    timeZone() {return this.$store.getters.getState.timeZone()},
    device() {return this.$store.getters.getLocalData.device},
    loginHistory() {return {date: this.date, time: this.time, timeZone: this.timeZone, platform: this.device.platform, userAgent: this.device.userAgent}},
    network() {return this.$store.getters.getNetworkData.online}  
  },

  watch: {
    user() {
      if (this.user) {
        if (this.user._isOnline) {
          this.showLogoutButton = true
          this.homeLink = this.user._typeIndex === 0 ? '/student-dashboard' : '/trainer-dashboard'
        } else {
          this.showLogoutButton = false
          this.homeLink = '/'
        }
      }
    },

    network() {
      if(this.network) {
        // notify user of network presence
        this.$store.dispatch('setValue', {name: 'network', newVal: 'yayy! you are back online', child: ['networkMessage']})
        this.$store.dispatch('setValue', {name: 'network', newVal: true, child: ['showNetworkMessage']})
      } else {
        // notify user of offline state
        this.$store.dispatch('setValue', {name: 'network', newVal: 'you are currently offline', child: ['networkMessage']})
        this.$store.dispatch('setValue', {name: 'network', newVal: true, child: ['showNetworkMessage']})
      }
    },

    activeDump() {
      if (this.$User._id) {
        this.updateActiveStatus()
      }
    },

    activeToken() {
      if (this.$User._id) {
        this.updateActiveStatus()
      }
    }
  },

  methods: {
    toggleNav() {
      this.showNav
      ? this.showNav = false
      : this.showNav = true
    },

    retractNav() {
      this.showNav
      ? this.showNav = false
      : this.showNav = false
    },

    showApp() {
      let html = document.getElementsByTagName('html')[0]

      if(this.getComputedStyles(html, 'visibility') === 'hidden') {
        html.style.visibility = 'visible'
      }
    },

    loadAdmin() {
      let adminToken = this.adminToken,
      matchFound

      this.admin = db.collection('admin').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          if (!matchFound) {
            if (item.data().token === adminToken) {
              matchFound = true
              this.$store.dispatch('setValue', {name: 'adminAccess', newVal: true})
              this.$router.push('admin-dashboard')
            }
          }
        })
      })
    },

    loadUser() {
      let sessionToken = sessionStorage.getItem('userToken'),
      persistentToken = localStorage.getItem('userToken'),
      matchFound,
      userData

      if (this.loggedIn === 'true' && sessionToken) {
        this.userId = sessionStorage.getItem('userId')

        this.users = db.collection('users').get().then((querySnapshot) => {

          querySnapshot.forEach((item) => {
            if (!matchFound) {
              if (this.$GetDataWithToken(item.data(), sessionToken)) {

                userData = this.$Decrypt(item.data().data)

                this.$Download(JSON.parse(userData.token)).then((result) => {
                  if(result._id === this.userId) {
                    matchFound = true
                    this.$User = result

                    // set online status
                    this.$User.setOnlineStatus(true)
                    
                    //send user object to store
                    this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})

                    if (this.$User._typeIndex === 0 && window.location.pathname === '/') {
                      this.$router.push('student-dashboard')
                    } else if (this.$User._typeIndex === 1 && window.location.pathname === '/') {
                      this.$router.push('trainer-dashboard')
                    }
                  }                  
                })
              }
            }
          })
        })
      }

      if (this.persistence === 'true' && persistentToken) {
        let encryptedData, encryptedToken

        this.userId = localStorage.getItem('userId')

        this.users = db.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            if (!matchFound) {
              if (this.$GetDataWithToken(item.data(), persistentToken)) {

                userData = this.$Decrypt(item.data().data)

                this.$User = this.$Download(JSON.parse(userData.token)).then((result) => {
                  if (result._id === this.userId) {
                    matchFound = true
                    this.$User = result

                    // add login history
                    this.$User.addLoginHistory(this.loginHistory)

                    // set online status
                    this.$User.setOnlineStatus(true)

                    // encrypt the updated data
                    encryptedData = this.$Encrypt(JSON.stringify(this.$User), persistentToken)
                    encryptedToken = {data: encryptedData.token}

                    // upload the new online status
                    this.$Upload('users', `${this.$User._id}`, encryptedToken).then(() => {
                      // set the global user object in the store
                      this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})

                      // send to session storage
                      sessionStorage.setItem('userId', this.$User._id)
                      sessionStorage.setItem('userToken', persistentToken)
                      sessionStorage.setItem('loginState', 'true')
                      
                      if (this.$User._typeIndex === 0 && window.location.pathname === '/') {
                        this.$router.push('student-dashboard')
                      } else if (this.$User._typeIndex === 1 && window.location.pathname === '/') {
                        this.$router.push('trainer-dashboard')
                      }
                    })
                  }
                })
              }
            }
          })
        })
      }
    },

    logout() {
      this.$store.dispatch('setValue', {name: 'loggingOut', newVal: true})
    },

    offlineNotification () {
      this.$store.dispatch('setValue', {name: 'network', newVal: false, child: ['online']})
    },

    onlineNotification () {
      this.$store.dispatch('setValue', {name: 'network', newVal: true, child: ['online']})
    },

    updateActiveStatus() {
      let sessionToken = sessionStorage.getItem('userToken'),
      persistentToken = localStorage.getItem('userToken'),
      encryptedData,
      encryptedToken

      // update active status
      this.$User.setActiveStatus(this.activeToken.data)

      encryptedData = persistentToken ? this.$Encrypt(JSON.stringify(this.$User), persistentToken) : this.$Encrypt(JSON.stringify(this.$User), sessionToken)
      encryptedToken = {data: encryptedData.token}

      // upload the new active status
      this.$Upload('users', `${this.$User._id}`, encryptedToken)
    }
  },

  mounted() {
    this.loadUser()

    this.animate = true
    
    let ROOT = this

    window.addEventListener('selectstart', (e) => { e.preventDefault() }) // prevent selection
    // window.addEventListener('contextmenu', (e) => { e.preventDefault() }) // prevent context menu display
    window.addEventListener('print', (e) => { alert ('action prohibited'); e.preventDefault() }) // prevent printing

    // hide the app when some keys are pressed
    window.addEventListener('keydown' , (e) => {
      let html = document.querySelector('html')

      switch (e.keyCode) {
        case 17:
          html.style.visibility = 'hidden';
          e.preventDefault()
          break;

        case 42:
          html.style.visibility = 'hidden';
          break;

        case 44:
          html.style.visibility = 'hidden';
          break;

        case 91:
          html.style.visibility = 'hidden';
          break;

        case 92:
          html[0].style.visibility = 'hidden';
          break;

        case 93:
          html.style.visibility = 'hidden';
          e.preventDefault()
          break;
      }
      return;
    })

    // make interface visible when the key is no longer pressed
    window.addEventListener('keyup' , () => {
      setTimeout(ROOT.showApp, 2000)
    })

    window.addEventListener('offline' , () => {
      ROOT.offlineNotification()
    })

    window.addEventListener('online' , () => {
      ROOT.onlineNotification()
    })
  }
};
</script>

<style>

#GT {overflow: hidden !important;
  background: white !important}
html {overflow-Y: auto !important;}

header.v-sheet {border-radius: 1.5rem 1.5rem 0px 0px;}
footer.v-sheet {border-radius: 0px 0px 1.5rem 1.5rem;
  box-shadow: 0.5px -0.5px 2.5px 1px rgba(0, 0, 0, 0.5)}

#top-conceal {width: 100vw;
  height: 1.5rem;
  top: 0px;
  background: black}

#bottom-conceal {width: 100vw;
  height: 1.5rem;
  bottom: 0px;
  background: black}

  @media screen and (min-width: 1264px) {
    #top-conceal, #bottom-conceal {
      background: white;
    }
  }
</style>
