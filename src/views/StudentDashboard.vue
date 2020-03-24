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
          <v-col class="col-lg-11" align="center">
            <ul>
              <p>Get to know the basics;</p>
              <li>Mindset paradigm shift (PT 1)</li>
              <li>Mindset paradigm shift (PT 2)</li>
              <li>Basic orientation uplines need to give downlines</li>
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
          <v-col class="col-lg-11" align="center">
            <ul>
              <p>Get to know the basics;</p>
              <li>Teamwork, the right strategy for MLM</li>
              <li>Cotinual improvement, the leaders favourite</li>
              <li>The 21st century business: pros &amp; cons</li>
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
    <br/>
    <br/>
    <br/>
        
    <v-row justify="center">
      <v-col align="center" class="col-4 col-lg-2 green--text accent-4">
        <b>active: </b>
        <span>50</span>
      </v-col>

      <v-col align="center" class="col-4 col-lg-2 pink--text lighten-4">
        <b>inactive: </b>
        <span>70</span>
      </v-col>

      <v-col align="center" class="col-4 col-lg-2 cyan--text">
        <b>total: </b>
        <span>120</span>
      </v-col>
    </v-row>
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