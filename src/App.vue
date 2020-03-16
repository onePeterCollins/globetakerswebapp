<template>
  <v-app>
    <g-navigation :showNav="showNav" @retract="retractNav"/>

    <v-app-bar
      app
      color="cyan"
      dark
    >      
      <v-toolbar-items>
        <v-img
        :src="require('./assets/images/logo.svg')"
        contain
        width="50"
        height="50"
        class="mr-3 mt-2"
        transition="scale-transition" />
      </v-toolbar-items>
      
      <v-toolbar-title class="display-1">Globetakers</v-toolbar-title>

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

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    showNav: true
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
