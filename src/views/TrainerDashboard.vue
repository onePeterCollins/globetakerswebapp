<template>
  <div class="GT-S-dashboard">
    <v-row>
      <v-col align="center">
        <h3>Welcome <span>{Username}</span></h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <h2>What would you like to do?</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-card class="col-10 col-lg-4 mb-5 center gray">
        <v-row class="blue lighten-2">
          <v-col align="center">
            <h4>Take a Course</h4>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="col-lg-11 col-12" align="center">
            <ul>
              <span><i class="green--text">Explore the lectures section;</i></span>
              <li align="left">View a new or existing course</li>
              <li align="left">Redo any course of your choice</li>
              <li align="left">Gain access to advanced courses</li>
            </ul>
          </v-col>
          <v-col class="col-12" align="center">
            <v-btn class="success" href="student-dashboard">Continue</v-btn>
          </v-col>
        </v-row>
      </v-card>

      <br/>

      <v-card class="col-10 col-lg-4 mb-5 center gray">
        <v-row class="pink lighten-2">
          <v-col align="center">
            <h4>Teach a Course</h4>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col class="col-lg-11 col-12" align="center">
            <ul>
              <span><i class="green--text">Provide study material for students;</i></span>
              <li align="left">Create and modify lecture content</li>
              <li align="left">Upload and link a lecture video</li>
              <li align="left">Answer questions asked by students</li>
            </ul>
          </v-col>

          <v-col class="col-12" align="center">
            <v-btn class="success" href="student-dashboard/course-access-denied">Continue</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

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
  name: 'Trainer-dashboard',

  computed: {

  }
}
</script>
