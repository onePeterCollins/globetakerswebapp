<template>
  <v-bottom-navigation class="z1 mt-12 bottom-nav">
    <v-row justify="center">
      <v-col align="center" class="col-12">
        <v-btn class="mr-3">
          <a class="no-underline" href="https://facebook.com/pg/globetakersteam/posts/?ref=page_internal&mt_nav=0" target="_blank">
            <v-icon class="blue--text lighten-4">mdi-facebook</v-icon>
          </a>
        </v-btn>

        <v-btn class="mr-3">
          <a class="no-underline" href="https://youtube.com/channel/UClm_UAtPM-B3CxX7TqvGVZw" target="_blank">
            <v-icon class="red--text lighten-1">mdi-youtube</v-icon>
          </a>
        </v-btn>
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'g-social-media-links-bottom',

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()}
  }
}
</script>

<style>
  .bottom-nav {
    position: relative;
    bottom: 0rem !important;
    z-index: 200
  }
</style>
