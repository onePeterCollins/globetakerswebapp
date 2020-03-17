<template>
  <div class="home">
    <v-row>
      <v-col class="col-11 ml-2">
        <h2 class="cyan--text">Globetakers business school</h2>
        <h3>International</h3>
      </v-col>
    </v-row>

    <v-form class="col-lg-3 col-10 login-form cyan lighten-5" transition="scale-transition">
      <v-row justify="center">
        <h2 class="form-title">LOGIN</h2>
      </v-row>
      <v-row>
        <v-text-field prepend-icon="mdi-account" label="NG***" hint="max 30 characters"  height="30" :value="username"/>
      </v-row>

      <v-row>
        <v-text-field prepend-icon="mdi-lock" label="Token" hint="Valid for 14 days only"  height="30" :value="password"/>
      </v-row>

      <span class="verification">Code: {verification code}</span>

      <v-row>
        <v-text-field prepend-icon="mdi-tag" label="Enter code" hint="enter the code above"  height="30" :value="code"/>
      </v-row>

      <v-row justify="center">
        <v-btn>Submit</v-btn>
      </v-row>
    </v-form>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>

<style scoped>

@media screen and (max-width: 1023px) {
  .login-form {
    padding: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.5rem;
    box-shadow: -0.5px 1.5px 0.25rem 0.5px rgba(0,0,0,0.25)
  }
}

.login-form {
  padding: 1.5rem;
  margin-left: auto;
  margin-right: 7.5vw;
  border-radius: 0.5rem;
  box-shadow: -0.5px 1.5px 0.25rem 0.5px rgba(0,0,0,0.25)
}

</style>
