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
        <v-btn link to="/">
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
          <p>&copy; Globetakers 2020 all rights reserved.</p>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    showNav: false,
    animate: ''
  }),

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    }
  },

  watch: {

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
    }
  },

  mounted() {
    let ROOT = this

    this.animate = true

    window.addEventListener('selectstart', (e) => { e.preventDefault() }) // prevent selection
    window.addEventListener('contextmenu', (e) => { e.preventDefault() }) // prevent context menu display
    window.addEventListener('print', (e) => { alert ('action prohibited'); e.preventDefault() }) // prevent printing

    // hide the app when some keys are pressed
    window.addEventListener('keydown' , (e) => {
      let html = document.getElementsByTagName('html')

      switch (e.keyCode) {
        case 17:
          html[0].style.visibility = 'hidden';
          e.preventDefault()
          break;

        case 42:
          html[0].style.visibility = 'hidden';
          break;

        case 44:
          html[0].style.visibility = 'hidden';
          break;

        case 91:
          html[0].style.visibility = 'hidden';
          break;

        case 92:
          html[0].style.visibility = 'hidden';
          break;

        case 93:
          html[0].style.visibility = 'hidden';
          e.preventDefault()
          break;
      }
      return;
    })

    // hide the app when some keys are pressed on mobile
    if(this.mobile) {
      window.addEventListener('keydown' , (e) => {
        let html = document.getElementsByTagName('html')

        switch (e.keyCode) {
          case 25:
            html[0].style.visibility = 'hidden';
            break;

          case 26:
            html[0].style.visibility = 'hidden';
            break;
        }
      })
    }

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
</style>
