<template>
  <v-form class="col-lg-3 col-10 center pink lighten-5">
    <v-row justify="center">
        <h2 class="form-title">LOGIN</h2>
    </v-row>

    <v-row>
        <v-text-field prepend-icon="mdi-account" label="NG **** ****" hint="your longrich code"  height="30" :value="username"/>
    </v-row>

    <br />

    <v-row>
        <v-text-field prepend-icon="mdi-lock" label="Password" hint="min 8 characters"  height="30" :value="password"/>
    </v-row>

    <br />

    <v-row justify="center">
        <v-btn class="green--text" link to="/trainer-dashboard">Login</v-btn>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'g-trainer-login-form',

  data: () => ({
    username: '',
    password: ''
  })
}
</script>

<style>

</style>