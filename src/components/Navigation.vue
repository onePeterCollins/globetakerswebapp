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
        <v-list-item v-for="link in navLinks" :key="link.sn" link :to="link.route" >
          <v-list-item-action >
            <v-icon v-if="!link.alertCount">{{link.icon}}</v-icon>
            
            <v-badge v-if="link.alertCount" :content="link.alertCount">
              <v-icon>{{link.icon}}</v-icon>
            </v-badge>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="btn in navButtons" :key="btn.sn" @click="btn.action">
          <v-list-item-action >
            <v-icon>{{btn.icon}}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{btn.title}}</v-list-item-title>
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
    homeLink: '/'
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},

    navLinks() {
      let value, loggedIn = this.loggedIn && this.user.getProfile()

      value = [
        {sn: 1, title: 'Home', route: this.homeLink, icon: 'mdi-home', if: true},
        {sn: 2, title: 'About', route: '/about', icon: 'mdi-help', if: true},
        {sn: 3, title: 'Contact', route: '/contact', icon: 'mdi-phone', if: true},
        {sn: 4, title: 'notifications', route: '/notifications', icon: 'mdi-message', if: loggedIn, alertCount: 0},
        {sn: 5, title: 'Terms', route: '/terms', icon: 'mdi-file', if: true}
      ]

      function vIf (item) {
        if (item.if) {
          return item
        }
      }

      return value.filter(vIf)
    },

    navButtons() {
      let value, loggedIn = this.loggedIn, logout = this.logout

      value = [
        {sn: 6, title: 'Logout', icon: 'mdi-lock', action: logout, if: loggedIn}
      ]

      function vIf (item) {
        if (item.if) {
          return item
        }
      }

      return value.filter(vIf)
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
        } else {
          this.loggedIn = false
        }
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
    logout() {
      this.$store.dispatch('setValue', {name: 'loggingOut', newVal: true})
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer {border-radius: 0px 1.5rem 1.5rem 0px;}
.v-list-item--active {background: var(--cream);}
</style>