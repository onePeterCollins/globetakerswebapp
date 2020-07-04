<template>
  <div class="uncharted">
    <br/>
    <v-row>
      <v-col align="center">
        <v-img 
          :src="require('../assets/images/logo.jpg')"
          contain
          width="200"
          height="200"
          class="faint-4"
          transition="scale-transition" />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="mounted" align="center">
        <h4><span class="display-1">{{emoji.emojify(':confused:')}} </span> Oops, this page is currently unavailable</h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <p>
          <span>Return to </span>
          <v-btn @click="stepBack" class="info">previous</v-btn>
          <span> page</span>
        </p>

        <p>
          <span>Go to </span>
          <v-btn link to="/" class="info">Home</v-btn>
          <span> page</span>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Uncharted',

  data: () => ({
    mounted: false
  }),

  methods: {
    stepBack() {
      window.history.go(-1)
    }
  },

  mounted() {
    this.mounted = true
  }
}
</script>
