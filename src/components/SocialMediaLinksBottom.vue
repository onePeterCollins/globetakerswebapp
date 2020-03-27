<template>
  <v-bottom-navigation>
    <v-row justify="center">
      <v-col align="center" class="col-12">
        <v-btn class="mr-3" href="https://facebook.com" target="_blank">
          <v-icon class="blue--text lighten-4">mdi-facebook</v-icon>
        </v-btn>

        <v-btn light class="mr-3" href="https://instagram.com" target="_blank">
          <v-icon class="pink--text lighten-1">mdi-instagram</v-icon>
        </v-btn>

        <v-btn light class="mr-3" href="https://twitter.com" target="_blank">
          <v-icon class="cyan--text lighten-2">mdi-twitter</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'g-social-media-links-bottom',

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

<style>

</style>
