<template>
  <div class="home social-media-sketch-pattern">
    <v-row>
      <v-col v-if="!mobile" class="col-5 ml-5 white">
        <h2 class="g-deepblue--text">Globe Takers Business School International</h2>
      </v-col>

      <v-col v-else-if="mobile" class="white" align="center">
        <h2 class="g-deepblue--text">Globe Takers Business School</h2>
        <h3 class="g-deepblue--text">International</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-img v-if="!mobile"
        :src="require('../assets/images/logo.jpg')"
        contain
        width="400"
        height="400"
        class="faint-7"
        transition="scale-transition" />

      

      <v-col class="col-lg-4 mt-10 mt-lg-0">
        <h3 v-if="!mobile" class="white g-rose--text pl-10 py-4">
          To {{this.registerOrLogin}} click
          <v-btn class="ml-3 g-darkblue--text" @click="formFlip()">
            <v-icon v-if="this.registerOrLogin !== 'register'" class="mr-2">mdi-lock</v-icon>
            <v-icon  v-if="this.registerOrLogin === 'register'" class="mr-2">mdi-account-edit</v-icon>
            here
          </v-btn>
        </h3>

        <h3 v-else-if="mobile" class="white g-rose--text" align="center">
          To {{this.registerOrLogin}} click
          <v-btn class="ml-3 g-darkblue--text" @click="formFlip()">
            <v-icon v-if="this.registerOrLogin !== 'register'" class="mr-2">mdi-lock</v-icon>
            <v-icon  v-if="this.registerOrLogin === 'register'" class="mr-2">mdi-account-edit</v-icon>
            here
          </v-btn>
        </h3>

        <v-col :class="this.flipForm + ' flipper'">
          <v-row class="rear-form-container" justify="center">
            <v-col class="rear-form">
              <g-registration-form />
            </v-col>
          </v-row>

          <v-row class="front-form-container">
            <v-col class="front-form">
              <g-student-login-form @showRegistrationForm="showRegistrationForm()" />
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br v-if="!mobile" />
    <br v-if="!mobile" />
    <br v-if="!mobile" />

    <g-social-media-links-bottom />
    
    <br/>
    <br/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  data: () => ({
    flipForm: '',
    registerOrLogin: 'register',
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()}
  },

  watch: {
    flipForm () {
      this.flipForm === ''
      ? this.registerOrLogin = 'register'
      : this.registerOrLogin = 'login'
    }
  },

  methods: {
    formFlip() {
      this.flipForm === 'flip-form' ? this.flipForm = "" : this.flipForm = 'flip-form'
    },

    showRegistrationForm() {
      this.flipForm = 'flip-form'
    }
  },

  mounted() {
    
  }
}
</script>

<style scoped>
.flip-form {
  transform: rotateY(180deg);
}

.flipper {
  transition-duration: 0.5s;
}

.front-form {
  backface-visibility: hidden;
}

.flip-form .front-form-container {
  display: none;
}

.rear-form {
  transform: rotateY(180deg);
}

.flipper .rear-form-container {
  display: none;
}

.flipper.flip-form .rear-form-container {
  display: block;
}
</style>