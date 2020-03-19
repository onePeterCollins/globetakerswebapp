<template>
  <div class="GT-S-dashboard">
    <v-row>
      <v-col align="center">
        <span class="display-1">Welcome </span>
        <span class="display-1">{Username}</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <p>What would you like to do?</p>
      </v-col>
    </v-row>

    <v-row v-if="!mobile">
    <v-card class="col-10 col-lg-4 center gray">
      <v-row class="yellow">
        <v-col align="center">
          <h4>Beginner Course</h4>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <p>Get to know the basics;</p>
          <p>* How the business works</p>
          <p>* How you can grow with us</p>
          <p>* How you can make profit</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <v-btn class="success">Continue</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <br/>

    <v-card class="col-10 col-lg-4 center gray">
      <v-row class="purple lighten-2">
        <v-col align="center">
          <h4>Advanced Course</h4>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <p>Get to know the basics;</p>
          <p>* How the business works</p>
          <p>* How you can grow with us</p>
          <p>* How you can make profit</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <v-btn class="success">Continue</v-btn>
        </v-col>
      </v-row>
    </v-card>
    </v-row>

    <v-card v-if="mobile" class="col-10 col-lg-4 center gray">
      <v-row class="yellow">
        <v-col align="center">
          <h4>Beginner Course</h4>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <p>Get to know the basics;</p>
          <p>* How the business works</p>
          <p>* How you can grow with us</p>
          <p>* How you can make profit</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <v-btn class="success">Continue</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <br/>

    <v-card v-if="mobile" class="col-10 col-lg-4 center gray">
      <v-row class="purple lighten-2">
        <v-col align="center">
          <h4>Advanced Course</h4>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <p>Get to know the basics;</p>
          <p>* How the business works</p>
          <p>* How you can grow with us</p>
          <p>* How you can make profit</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="center">
          <v-btn class="success">Continue</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <br/>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'Student-dashboard',

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

<style>

</style>