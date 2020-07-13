<template>
  <div class="student-manager">
    <v-row class="yellow">
      <v-col align="center">
        <h1 class="g-deepblue--text">Student Manager</h1>
      </v-col>
    </v-row>

    <br/>

    <v-row justify="center">
      <v-col align="center" class="col-lg-6 col-11 g-deepblue--shadow">
        <v-row justify="center">
          <v-col class="col-5">
            <h3 class="g-darkblue--text dosis">Message all students</h3>
          </v-col>

          <v-col class="col-5">
            <v-btn class="g-white">compose</v-btn>
          </v-col>
        </v-row>
        
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <h2 class="g-deepblue--text">Sub teams</h2>

        <v-row justify="center">
          <v-col v-for="(team, sn) in teams" :key="sn" align="center" @click="showTeamMemebrs(team.name)" class="col-lg-6 px-lg-10 col-11">
            <v-list-item link :to="team.route" class="g-white">
              <v-list-item-action>
                <v-icon>{{team.icon}}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  <v-row justify="center">
                    <v-col class="col-9">
                      <h3 class="px-4">{{team.name}}</h3>
                    </v-col>
                    
                    <v-col class="col-2">
                      <span class="px-4" align="right">{{team.population}}</span>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import {db} from '../firebase'

export default {
  name: 'g-student-manager',

  data: () => ({
    teams: [
      {sn: 1, name: 'soaring eagles', population: 200, route: '/', icon: 'mdi-account-group'},
      {sn: 2, name: 'towering giants', population: 180, route: '/', icon: 'mdi-account-group'}
    ]
  }),

  firestore: {
    // teams: db.collection('teams')
  },

  methods: {
    showTeamMemebrs (teamName) {
      if (teamName) {
        // do something
      }
    }
  }
}
</script>

<style>

</style>