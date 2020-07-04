<template>
  <div class="home">
    <v-row>
      <v-col v-if="!mobile" class="col-11 ml-5">
        <h2 class="g-darkblue--text">Globe Takers Business School <span class="g-blue--text">International</span></h2>
      </v-col>

      <v-col v-else-if="mobile" align="center">
        <h2 class="g-darkblue--text">Globe Takers Business School</h2>
        <h3 class="g-blue--text">International</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-img v-if="!mobile"
        :src="require('../assets/images/logo.jpg')"
        contain
        width="400"
        height="400"
        class="faint-4"
        transition="scale-transition" />

      

      <v-col class="col-lg-4 mt-10 mt-lg-0">
        <h3 v-if="!mobile" class="pl-10">
          To {{this.registerOrLogin}} click
          <a @click="formFlip()">here</a>
        </h3>

        <h3 v-else-if="mobile" align="center">
          To {{this.registerOrLogin}} click
          <a @click="formFlip()">here</a>
        </h3>

        <v-col :class="this.flipForm + ' flipper'">
          <v-row class="rear-form-container" justify="center">
            <v-col class="rear-form">
              <g-registration-form />
            </v-col>
          </v-row>

          <v-row class="front-form-container">
            <v-col class="front-form">
              <g-student-login-form />
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br v-if="!mobile"/>

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
    registerOrLogin: 'register'
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
    flipForm () {
      this.flipForm === ''
      ? this.registerOrLogin = 'register'
      : this.registerOrLogin = 'login'
    }
  },

  methods: {
    formFlip() {
      this.flipForm === 'flip-form' ? this.flipForm = "" : this.flipForm = 'flip-form'
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