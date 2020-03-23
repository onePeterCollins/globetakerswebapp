<template>
  <div class="home">
    <v-row>
      <v-col v-if="!mobile" class="col-11 ml-5">
        <h2 class="cyan--text">Globetakers Business School</h2>
        <h3>International</h3>
      </v-col>

      <v-col v-else-if="mobile" align="center">
        <h2 class="cyan--text">Globetakers Business School</h2>
        <h3>International</h3>
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

      <g-student-login-form />
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    <v-row>
      <v-col align="center" class="col-4 green--text accent-4">
        <span>active: </span>
        <span>50</span>
      </v-col>

      <v-col align="center" class="col-4 pink--text lighten-4">
        <span>inactive: </span>
        <span>70</span>
      </v-col>

      <v-col align="center" class="col-4 cyan">
        <span>total: </span>
        <span>120</span>
      </v-col>
    </v-row>

    <br/>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

  data: () => ({

  }),

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    }
  }
}
</script>
