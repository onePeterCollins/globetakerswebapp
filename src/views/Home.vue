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
    <br v-if="mobile" />
    <br v-if="mobile" />
    <br v-if="mobile" />

    <g-social-media-links-bottom />
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
