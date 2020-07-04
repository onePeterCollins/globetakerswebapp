<template>
  <div class="awaiting-verification g-white">
    <v-row class="yellow">
      <v-col align="center">
        <h2>Welcome {{$User.getFirstName()}}</h2>
      </v-col>
    </v-row>

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
        <v-col class="px-10" align="left">
          <p>
            Verification is part of our registration process. When you are verified, you will have full access to use the platform.
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
          <p>Facebook...etc</p>
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

  </div>
</template>

<script>
export default {
  name: 'g-awaiting-verification',

  data: () => ({

  }),

  computed: {
    user() {return this.$store.getters.getUserData}
  },

  mounted() {
    this.$User = this.user
  }
}
</script>
