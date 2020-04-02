<template>
  <v-app id="GT">
    <div id="top-conceal" class="fixed z4"></div>
    <div id="bottom-conceal" class="fixed z4"></div>

    <g-navigation :showNav="showNav" @retract="retractNav"/>

    <v-app-bar
      app
      color="cyan lighten-2"
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
    }
  },

  mounted() {
    this.animate = true
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
