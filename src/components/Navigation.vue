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
        <h4 class="g-darkblue--text">Menu</h4>
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

        <v-list-item v-if="loggedIn">
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <v-list class="mt-12">
        <v-list-item v-for="(link, sn) in restrictedLinks" :key="sn" link :to="link.route" >
            <v-list-item-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{link.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'g-navigation',

  props: {showNav: Boolean},

  data: () => ({
    slide: null,
    loggedIn: false,
    homeLink: '/',

    navLinks: [
      {sn: 1, title: 'Home', route: '/', icon: 'mdi-home'},
      {sn: 2, title: 'About', route: '/about', icon: 'mdi-help'},
      {sn: 3, title: 'Contact', route: '/contact', icon: 'mdi-phone'},
      {sn: 4, title: 'Terms', route: '/terms', icon: 'mdi-information'},
    ],

    restrictedLinks: [
      {sn: 1, title: 'Trainer', route: '/trainer', icon: 'mdi-account-box-outline'},
      {sn: 2, title: 'Proprietor', route: '/proprietor', icon: 'mdi-account'},
    ]
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},

    trainer() {
      return false
    },

    proprietor() {
      return false
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
    },

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
  }
}
</script>

<style scoped>
.v-navigation-drawer {border-radius: 0px 1.5rem 1.5rem 0px;}
.v-list-item--active {background: var(--cream);}
</style>