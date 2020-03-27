<template>
  <v-app id="GT">
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
        <v-btn href="/">
          <v-icon small  class="mr-1">mdi-home</v-icon>
         
          <span>home</span>
        </v-btn>

        <v-btn href="/about">
          <v-icon small class="mr-1">mdi-help</v-icon>
          
          <span>about</span>
        </v-btn>

        <v-btn href="/contact">
          <v-icon small class="mr-1">mdi-phone</v-icon>

          <span>contact</span>
        </v-btn>

        <v-btn href="/terms">
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

    <v-footer class="gray">
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

#GT {overflow: hidden !important;}
html {overflow-Y: auto !important;}
</style>
