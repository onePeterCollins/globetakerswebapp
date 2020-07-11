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

        <v-btn link to="/terms">
          <v-icon small class="mr-1">mdi-information</v-icon>

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
    showLogoutButton: false,
    loggedIn: sessionStorage.getItem('loginState'),
    persistence: localStorage.getItem('loginState')
  }),

  firestore: {
    users: db.collection('users')
  },

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},
    persistUser() {return this.user ? this.user._persist : false},
    cookieDate() {return this.$store.getters.getState.cookieDate()}
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

    hideaApp() {
      let html = document.getElementsByTagName('html')[0]

      if(this.getComputedStyles(html, 'visibility') === 'hidden') {
        html.style.visibility = 'visible'
      }
    },

    loadUser() {
      let sessionToken = sessionStorage.getItem('userToken'),
      persistentToken = localStorage.getItem('userToken'),
      matchFound,
      userData

      if (this.loggedIn === 'true' && sessionToken) {
        this.users = db.collection('users').get().then((querySnapshot) => {

          querySnapshot.forEach((item) => {
            if (!matchFound) {
              if (this.$GetDataWithToken(item.data(), sessionToken)) {
                matchFound = true

                userData = this.$Decrypt(item.data().data)

                this.$Download(JSON.parse(userData.token)).then((result) => {
                  this.$User = result

                  // set online status
                  this.$User.setOnlineStatus(true)
                  
                  //send user object to store
                  this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})

                  if (this.$User._typeIndex === 0 && window.location.pathname === '/') {
                    this.$router.push('/student-dashboard')
                  } else if (this.$User._typeIndex === 1 && window.location.pathname === '/') {
                    this.$router.push('/trainer-dashboard')
                  }
                })
              }
            }
          })
        })
      } else if (this.persistence === 'true' && persistentToken) {
        this.users = db.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            if (!matchFound) {
              if (this.$GetDataWithToken(item.data(), persistentToken)) {
                matchFound = true

                userData = this.$Decrypt(item.data().data)

                this.$User = this.$Download(JSON.parse(userData.token)).then((result) => {
                  this.$User = result

                  // set online status
                  this.$User.setOnlineStatus(true)

                  //send user object to store
                  this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})

                  if (this.$User._typeIndex === 0 && window.location.pathname === '/') {
                    this.$router.push('/student-dashboard')
                  } else if (this.$User._typeIndex === 1 && window.location.pathname === '/') {
                    this.$router.push('/trainer-dashboard')
                  }
                })
              }
            }
          })
        })
      }
    },

    logout() {
      let encryptedData, encryptedToken

      //modify the user object to reflect logged out state
      this.$User = this.user

      //cancel persistence
      this.$User.setPersistence(false)

      // set online status
      this.$User.setOnlineStatus(false)

      //encrypt the modified user object
      encryptedData = this.$Encrypt(JSON.stringify(this.$User))
      encryptedToken = {data: encryptedData.token}

      // upload the encrypted object with offline status
      this.$Upload('users', `${this.$User._id}`, encryptedToken).then(() => {
        //delete user object from the store
        this.$store.dispatch('setValue', {name: 'user', newVal: {}})
        
        //clear session storage
        sessionStorage.clear()

        //clear local storage
        localStorage.clear()

        //redirect to home route
        this.$router.push('/')
      })
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

    // hide the app when some keys are pressed on mobile
    // if(this.mobile) {
    //   window.addEventListener('keydown' , (e) => {
    //     let html = document.getElementsByTagName('html')

    //     switch (e.keyCode) {
    //       case 25:
    //         html[0].style.visibility = 'hidden';
    //         break;

    //       case 26:
    //         html[0].style.visibility = 'hidden';
    //         break;
    //     }
    //   })
    // }

    // make interface visible when the key is no longer pressed
    window.addEventListener('keyup' , () => {
      setTimeout(ROOT.hideaApp, 2000)
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
