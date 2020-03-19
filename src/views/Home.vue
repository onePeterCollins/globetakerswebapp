<template>
  <div class="home">
    <v-row>
      <v-col v-if="!mobile" class="col-11 ml-2">
        <h2 class="cyan--text">Globetakers Business School</h2>
        <h3>International</h3>
      </v-col>

      <v-col v-else-if="mobile" align="center">
        <h2 class="cyan--text">Globetakers business school</h2>
        <h3>International</h3>
      </v-col>
    </v-row>

    <g-student-login-form />

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
