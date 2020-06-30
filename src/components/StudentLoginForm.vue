<template>
  <v-carousel-transition>
    <v-form v-if="$keys[1]" class="col-lg-10 col-11 student-login-form g-white">
      
      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
          <h2 class="form-title">-- LOGIN --</h2>
        </v-row>
      </transition>
      
      <transition name="slideYneg">
        <v-row v-if="$keys[2]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" hint="Name and surname max 30 characters"  height="30" :value="password"/>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="NG **** ****" hint="your longrich code"  height="30" :value="username"/>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[4]">
          <span>Code: <span class="verification"><b>0xV9Yp2k</b></span></span>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[5]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-tag" label="Enter code" hint="enter the code above"  height="30" :value="code"/>
        </v-row>
      </transition>

      <br />

      <v-scale-transition>
        <v-row v-if="$keys[6]" justify="center">
          <v-btn link to="student-dashboard" class="g-cream g-darkblue--text">Login</v-btn>
        </v-row>
      </v-scale-transition>
    </v-form>
  </v-carousel-transition>
</template>

<script>
export default {
  name: 'g-student-login-form',

  data: () => ({
    username: '',
    password: '',
    code: ''
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
    login() {
      // Validate input for all fields
      // Compare data on all fields to what exists on database
      // if(matchFound) then load student dashboard
    }
  },

  hasAnim: true
}
</script>

<style scoped>
.student-login-form {
  padding: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5rem;
  box-shadow: -0.5px 1.5px 0.25rem 0.5px rgba(0,0,0,0.25)
}
</style>