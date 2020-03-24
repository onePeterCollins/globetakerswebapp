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

      <v-app-bar-nav-icon
      v-if="mobile"
      @click.stop="toggleNav" />

      
    </v-app-bar>

    <v-content id="GT-content">
      <router-view/>
    </v-content>

    <v-bottom-navigation>
      <v-row justify="center">
        <v-col align="center" class="col-12">
          <v-btn class="mr-3">
            <v-icon large class="blue--text lighten-4">mdi-facebook</v-icon>
          </v-btn>

          <v-btn light class="mr-3">
            <v-icon large class="pink--text lighten-1">mdi-instagram</v-icon>
          </v-btn>

          <v-btn light class="mr-3">
            <v-icon large class="cyan--text lighten-2">mdi-twitter</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-bottom-navigation>

    <v-footer class="gray">
      <v-row>
        <v-col align="center">
          <p>&copy; Globetakers 2020 all rights reserved.</p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    showNav: false
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
  }
};
</script>

<style>
@media screen and (max-width: 1023px) {
  body {overflow: auto !important;}

  #GT {overflow: hidden !important;}
}

html {overflow-Y: auto !important;}
</style>
