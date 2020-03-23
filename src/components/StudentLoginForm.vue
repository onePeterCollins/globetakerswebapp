<template>
  <v-form class="col-lg-3 col-10 student-login-form cyan lighten-5" transition="scale-transition">
    <v-row justify="center">
        <h2 class="form-title">LOGIN</h2>
    </v-row>

    <v-row>
        <v-text-field prepend-icon="mdi-account" label="NG **** ****" hint="your longrich code"  height="30" :value="username"/>
    </v-row>

    <br />

    <v-row>
        <v-text-field prepend-icon="mdi-lock" label="Token" hint="Valid for 14 days only"  height="30" :value="password"/>
    </v-row>

    <br />

    <span>Code: </span>
    <span class="verification">0123</span>

    <br />

    <v-row>
        <v-text-field prepend-icon="mdi-tag" label="Enter code" hint="enter the code above"  height="30" :value="code"/>
    </v-row>

    <br />

    <v-row justify="center">
        <v-btn href="student-dashboard" class="green--text accent-3">Login</v-btn>
    </v-row>
  </v-form>
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
  }
}
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  .student-login-form {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

.student-login-form {
  padding: 1.5rem;
  margin-left: auto;
  margin-right: 7.5vw;
  border-radius: 0.5rem;
  box-shadow: -0.5px 1.5px 0.25rem 0.5px rgba(0,0,0,0.25)
}
</style>