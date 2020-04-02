<template>
  <v-carousel-transition>
    <v-form v-if="$keys[0]" class="col-lg-3 col-10 center pink lighten-5">

      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
            <h2 class="form-title">LOGIN</h2>
        </v-row>
      </transition>

      <transition name="slideYneg">
        <v-row v-if="$keys[2]">
            <v-text-field prepend-icon="mdi-account" label="NG **** ****" hint="your longrich code"  height="30" :value="username"/>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <v-text-field prepend-icon="mdi-lock" label="Password" hint="min 8 characters"  height="30" :value="password"/>
        </v-row>
      </transition>


      <br />

      <v-scale-transition>
        <v-row v-if="$keys[4]" justify="center">
          <v-btn class="green--text" link to="/trainer-dashboard">Login</v-btn>
        </v-row>
      </v-scale-transition>
    </v-form>
  </v-carousel-transition>
</template>

<script>
export default {
  name: 'g-trainer-login-form',

  data: () => ({
    password: '',
    username: ''
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

<style>

</style>