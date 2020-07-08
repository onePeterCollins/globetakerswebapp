<template>
  <div class="awaiting-verification g-white">
    <v-row class="yellow">
      <v-col align="center">
        <h2>Welcome {{$User.getFirstName()}}</h2>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br/>

    <v-card class="col-11 col-lg-10 px-0 pt-0 center no-overflow g-deepblue--text" align="center">
      <v-row>
        <v-col class="g-blue">
          <h2 class="g-blue">
            <v-icon class="g-deepblue--text mr-3">mdi-account-question</v-icon>
            Your account is being verified
          </h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-10" align="center">
          <p>
            This is part of our registration process. After verification, you will have full access to use the platform.
          </p>
          <p>
            It usually takes 1 to 3 business days.
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-10" align="center">
          <h3>Find out more about us;</h3>
          <v-btn link to="about">About us</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-10" align="center">
          <h3>Follow us on social media;</h3>

          <v-btn class="mr-3" href="https://facebook.com" target="_blank">
            <v-icon class="blue--text lighten-4">mdi-facebook</v-icon>
          </v-btn>

          <v-btn light class="mr-3" href="https://youtube.com" target="_blank">
            <v-icon class="red--text lighten-1">mdi-youtube</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-10" align="center">
          <h3>Contact Admin;</h3>
          <v-btn link to="contact">Contact</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <br/>
    <br/>
    <br/>
    <br v-if='!mobile' />
    <br v-if='!mobile' />
    <br v-if='!mobile' />
    <br v-if='!mobile' />
    <br v-if='!mobile' />

  </div>
</template>

<script>
export default {
  name: 'g-awaiting-verification',

  data: () => ({

  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData ? this.$store.getters.getUserData : JSON.parse(localStorage.getItem('userPayload'))},
    isOnline() {return this.user ? this.user._isOnline : false}
  },

  mounted() {
    this.$Download(this.user).then((result) => {
      if (!result._isOnline) {
        this.$router.push('/not-found')
      } else if (result.getFirstName() === '') {
        this.$router.push('/not-found')
      } else {
        this.$User = result
        this.showContent = true
        this.$forceUpdate()
      }
    })
  }
}
</script>
