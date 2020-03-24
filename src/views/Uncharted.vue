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
      <v-col align="center">
        <h4><span class="display-1">{{emoji.emojify(':confused:')}} </span> Oops, this page is currently unavailable</h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <p v-if="pageName !== ''">
          <span>Return to </span>
          <v-btn @click="stepBack" class="info">previous</v-btn>
          <span> page</span>
        </p>

        <p>
          <span>Go to </span>
          <v-btn href="/" class="info">Home</v-btn>
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
    pageName: ''
  }),

  methods: {
    stepBack() {
      window.history.go(-1)
    }
  },

  mounted() {
    let url

    let routerPath = this.$route.path.split('')
    routerPath.shift()
    routerPath = routerPath.join('')
    document.referrer === routerPath ? url = '/' : url = document.referrer

    let string = url.split('').reverse()
    let resolved = []

    for(let i=0; i<string.length; i++) {
      if(string[i].toUpperCase() === string[i].toLowerCase()) {
        this.pageName = resolved.reverse().join('')
        return
      } else {
        resolved.push(string[i])
      }
    }
  }
}
</script>

<style>

</style>