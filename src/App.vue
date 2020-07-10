<template>
  <v-app id="GT">
    <div id="top-conceal" class="fixed z4"></div>
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
export default {
  name: 'App',

  data: () => ({
    showNav: false,
    animate: '',
    loggedIn: false,
    homeLink: '/',
    userIsLoggedIn: ''
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},
    persistUser() {return this.user ? this.user._persist : false},
    cookieDate() {return this.$store.getters.getState.cookieDate()}
  },

  firebase: {
    userIsLoggedIn: ''
  },

  watch: {
    user() {
      if (this.user) {
        if (this.user._isOnline) {
          this.loggedIn = true
        }
      } else {
        this.loggedIn = false
      }
    },

    loggedIn() {
      if (this.loggedIn) {
        this.homeLink = this.user._typeIndex === 0 ? '/student-dashboard' : '/trainers-dashboard'
      } else {
        this.homeLink = '/'
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

    encrypt(object) {
      let objString = JSON.stringify(object), result = '', key = keyGen(), keyTracker = 0

      for (let i=0; i<objString.length; i++) {
        result += String.fromCharCode(key[i % (key.length % (i ^ 7))]^objString.charCodeAt(i));
      }

      function keyGen() {
        let base = Math.random().toString().split('').reverse(),
        keyLength = 0,
        charCode,
        key = ''

        // set key length to 20 characters max
        base.forEach ((item) => {
          if (item != '0' && item != '.') {
            if (keyLength < 10 && keyLength < 20) {
              keyLength += (1 * item)
            }

            // limit the keyLength to 20
            if (keyLength > 20) {
              keyLength = 20
            }
          }
        })

        for (let i=0; i<keyLength; i++) {
          charCode = Math.floor(Math.random() * 10)
          key += charCode.toString()
        }

        alert('encrypt: encryption key = ' + key)
        return key
      }

      function embedKey (key, code) {
        let matrix = String.fromCharCode(key.length), chunk, firstStop = 0

        for (let i in code) {
          if (i > 0 && i % key.length === 0) {
            keyTracker === key.length ? keyTracker = 0 : null
            chunk = code.slice(i - key.length, i) + key[keyTracker]
            matrix += chunk
            keyTracker++
            firstStop = i
          }
        }

        for (let i = firstStop; i<code.length; i++) {
          matrix += code[i]
          alert('encrypt: remainder = ' + i + ' character = ' + code[i])
        }

        alert('encrypt: matrix length = ' + matrix.length)
        return matrix
      }

      alert(objString)
      return embedKey(key, result);
    },

    decrypt(token) {
      let keyLength = token.charCodeAt(0),
      pureToken = getPureToken(token),
      extractedKey = extractKey(pureToken),
      extractedToken = extractToken(pureToken),
      result = ''

      for (let i=0; i<extractedToken.length; i++) {
        result += String.fromCharCode(extractedKey[i % (extractedKey.length % (i ^ 7))]^extractedToken.charCodeAt(i));
      }

      function getPureToken (token) {
        let pureToken = ''
        for (let i in token) {
          if (i > 0) {
            pureToken += token[i]
          }
        }
        return pureToken
      }

      function extractKey (token) {
        let extractedKey = '', chunk
        for (let i in token) {
          if (i > 0 && i % (keyLength + 1) === 0) {
            chunk = token.slice(i - (keyLength + 1), i)

            if (extractedKey.length < keyLength) {
              extractedKey += chunk.split('').pop()
            }
          }
        }

        alert(extractedKey + '  key length = ' + keyLength)
        return extractedKey
      }

      function extractToken (token) {
        let extractedToken = '', chunk = '', key = '', firstStop = 0

        for (let i in token) {
          if (i > 0 && i % (keyLength + 1) === 0) {
            chunk = token.slice(i - (keyLength + 1), i).split('')
            
            if (key.length < keyLength) {
              key += chunk.pop()
              extractedToken += chunk.join('')
              key.length === keyLength ? key = '' : null
              firstStop = i
            }
            // alert('chunk = ' + chunk + ' ' + 'extrcted token = ' + extractedToken)
          }
        }

        // push remainder after stripping encryption key
        for (let i = firstStop; i<token.length; i++) {
          alert(token[i])
          extractedToken += token[i]
        }
        return extractedToken
      }

      alert('key = ' + extractedKey + ' token = ' + extractedToken.length + ' result = ' + result)
    }
  },

  mounted() {
    this.animate = true
    
    let ROOT = this, 
    userPayload = JSON.parse(localStorage.getItem('userPayload'))

    this.decrypt(this.encrypt(userPayload))

    if (!this.loggedIn && userPayload) {
      this.$store.dispatch('setValue',{name: 'user', newVal: userPayload})

      if(userPayload._persist && userPayload._typeIndex === 0 && window.location.pathname === '/') {
        this.$router.push('/student-dashboard')
      } else if (userPayload._persist && userPayload._typeIndex === 1 && window.location.pathname === '/') {
        this.$router.push('/trainer-dashboard')
      }
    }

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

    window.addEventListener('unload', () => {
      
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
</style>
