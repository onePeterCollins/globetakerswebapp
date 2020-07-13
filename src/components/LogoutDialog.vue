<template>
  <div v-if='loggingOut' class="logout-dialog">
    <v-dialog persistent v-model="loggingOut">
        <v-card>
            <v-card-title class="alert">Logging out</v-card-title>
            <v-card-text>Are you sure you want to logout?</v-card-text>
            <v-row>
              <v-col align="center">
                <v-btn @click="cancelLogout()">No</v-btn>
              </v-col>

              <v-col align="center">
                <v-btn @click="logout()">Yes</v-btn>
              </v-col>
            </v-row>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'g-logout-dialog',

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},
    loggingOut() {return this.$store.getters.getState.loggingOut}
  },

   methods: {
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

        //hide logout dialog
        this.$store.dispatch('setValue', {name: 'loggingOut', newVal: false})
      })
    },

    cancelLogout() {
      this.$store.dispatch('setValue', {name: 'loggingOut', newVal: false})
    }
  }
}
</script>