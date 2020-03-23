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

    <v-row>
      <v-card class="col-10 col-lg-4 mb-5 center gray">
        <v-row class="yellow">
          <v-col align="center">
            <h4><span class="green--text">(free)</span> Beginner Course</h4>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="col-lg-8" align="center">
            <ul>
              <p>Get to know the basics;</p>
              <li>How the business works</li>
              <li>How you can grow with us</li>
              <li>How you can make profit</li>
            </ul>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="center">
            <v-btn class="success" href="student-dashboard/beginner">Continue</v-btn>
          </v-col>
        </v-row>
      </v-card>

      <br/>

      <v-card class="col-10 col-lg-4 mb-5 center gray">
        <v-row class="purple lighten-2">
          <v-col align="center">
            <h4><span class="yellow--text">(paid)</span> Advanced Course</h4>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="col-lg-8" align="center">
            <ul>
              <p>Get to know the basics;</p>
              <li>How the business works</li>
              <li>How you can grow with us</li>
              <li>How you can make profit</li>
            </ul>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="center">
            <v-btn class="success" href="student-dashboard/course-access-denied">Continue</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

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