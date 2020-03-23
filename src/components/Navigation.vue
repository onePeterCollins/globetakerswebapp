<template>
  <v-navigation-drawer
  v-if="showNav && mobile"
  v-model="slide"
  app
  right>
    <v-container
      align="center"
      justify="center"
    >
      <v-row justify="center">
        <p class="cyan--text">Menu</p>
      </v-row>

      <v-list dense>
        <v-list-item v-for="(link, sn) in navLinks" :key="sn" link :to="link.route" >
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-bottom-navigation>
        <router-link to="/trainer">Trainers Login</router-link>
      </v-bottom-navigation>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'g-navigation',

  props: {showNav: Boolean},

  data: () => ({
    slide: null,

    navLinks: [
      {sn: 1, title: 'Home', route: '/', icon: 'mdi-home'},
      {sn: 2, title: 'About', route: '/about', icon: 'mdi-help'},
      {sn: 3, title: 'Contact', route: '/contact', icon: 'mdi-phone'},
      {sn: 4, title: 'Terms', route: '/terms', icon: 'mdi-information'},
    ]
  }),

  computed: {
    mobile() {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    }
  },

  watch: {
    showNav() {
      this.slide = this.showNav
    },

    slide () {
      !this.slide
      ? this.$emit("retract")
      : this.slide = this.showNav
    }
  }
}
</script>

<style>

</style>