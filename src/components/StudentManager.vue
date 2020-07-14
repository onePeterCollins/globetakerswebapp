<template>
  <div class="student-manager">
    <v-row class="yellow">
      <v-col align="center">
        <h1 class="g-deepblue--text">Student Manager</h1>
      </v-col>
    </v-row>

    <br/>

    <v-row justify="center">
      <v-col class="col-lg-5 px-lg-0 px-8">
        <p><b class="g-deepblue--text">Total students: </b> {{totalStudents}}</p>
        <p><b class="green--text">Verified: </b> {{verified}}</p>
        <p><b class="red--text">Pending: </b> {{pending}}</p>
      </v-col>
      
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

    <br/>
    <br/>
    
    <v-row>
      <v-col align="center">
        <h2 class="g-deepblue--text">Sub teams</h2>

        <v-row justify-lg="start" justify="center">
          <v-col v-for="(team, sn) in teams" :key="sn" align="center" class="col-lg-6 px-lg-10 col-11">
            <v-row>
              <v-list-item class="g-white">
                <v-list-item-action>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    <v-row justify="center">
                      <v-col class="col-6">
                        <h3 class="g-deepblue--text px-4">{{team.name}}</h3>
                      </v-col>
                      
                      <v-col class="col-6">
                        <span v-if="!mobile" class="px-4" align="right">members: {{team.population}}</span>
                        <p v-else-if="mobile" class="px-2" align="right">members: {{team.population}}</p>
                        <v-btn v-if="dropDown !== team.name" @click="showTeamMemebrs(team.name)">show all</v-btn>
                        <v-btn v-else-if="dropDown === team.name" @click="showTeamMemebrs(team.name)">hide</v-btn>
                      </v-col>
                    </v-row>

                    <v-row justify="center">
                      <v-col class="col-6">
                        <h4 class="pl-2 green--text">Verified: {{team.verified}}</h4>
                        <v-btn>show</v-btn>
                      </v-col>

                      <v-col class="col-6">
                        <h4 class="pl-2 red--text">Pending: {{team.pending}}</h4>
                        <v-btn>show</v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-row>

            <v-row>
              <v-card v-if="dropDown === team.name" class="col-12 px-1">
                <v-card-title class="px-0 py-0">
                  <v-col align="center" class="col-5 px-1 py-0">
                    <p class="g-cream g-deepblue--text">Name</p>
                  </v-col>

                  <v-col align="center" class="col-3 px-1 py-0">
                    <p class="g-cream g-deepblue--text">Status</p>
                  </v-col>

                  <v-col align="center" class="col-4 px-1 py-0">
                    <p class="g-cream g-deepblue--text">Details</p>
                  </v-col>
                </v-card-title>

                <v-card-text class="px-0 py-0 my-0">
                  <v-row v-for="(member, sn) in members" :key="sn" class="px-3">
                    <v-col align="center" class="col-5 px-1 py-0 my-0">
                      <p class="g-white g-deepblue--text py-2">{{member.name}}</p>
                    </v-col>

                    <v-col align="center" class="col-3 px-1 py-0">
                      <p v-if="member.status" class="green accent-2 g-deepblue--text py-2"><b>Verified</b></p>
                      <v-checkbox v-else-if="!member.status" class="ml-5 mr-10 my-0" label="verify" />
                    </v-col>

                    <v-col align="center" class="col-4 px-1 py-0">
                      <v-btn class="g-deepblue--text" @click="inspectStudent(member.id)">more</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>

  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'g-student-manager',

  data: () => ({
    totalStudents: 0,
    verified: 0,
    pending: 0,
    teamNames: [],
    teams: [],
    members: [],
    users: [],
    dropDown: ''
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()}
  },

  firestore: {
    users: db.collection('users')
  },

  methods: {
    loadTeamNames() {
      let userTeam

      this.users = db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
            let matchFound

            userTeam = result.getSubTeam()

            if (this.teamNames.length === 0) {
              this.teamNames.push(userTeam)
            }

            for (let team in this.teamNames) {
              if (userTeam.toUpperCase().replace(/ /g, '') === this.teamNames[team].toUpperCase().replace(/ /g, '')) {
                matchFound = true
              }
            }

            if (!matchFound) {
              this.teamNames.push(userTeam)
            }
          })
        })
      }).then(() => {this.loadTeamData()})
    },

    loadTeamData() {
      let userTeam,
      verified

      for (let i in this.teamNames) {
        this.teams.push({sn: (i+1), name: this.teamNames[i], population: 0, verified: 0, pending: 0})
      }

      this.users = db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
            userTeam = result.getSubTeam()
            verified = result.verified()

            this.totalStudents++

            for (let i in this.teamNames) {
              // search for matching team names
              if (userTeam.toUpperCase().replace(/ /g, '') === this.teamNames[i].toUpperCase().replace(/ /g, '')) {
                for (let index in this.teams) {
                  if (this.teams[index].name.toUpperCase().replace(/ /g, '') === userTeam.toUpperCase().replace(/ /g, '')) {
                    this.teams[index].population++

                    if (verified) {
                      this.teams[index].verified++
                      this.verified++
                    } else {
                      this.teams[index].pending++
                      this.pending++
                    }
                  }
                }
              }
            }
          })
        })
      })
    },

    showTeamMemebrs (teamName) {
      if (teamName !== this.dropDown) {
        this.dropDown = teamName
        this.members = []

        this.users = db.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
              if (result.getSubTeam().toUpperCase().replace(/ /g, '') === teamName.toUpperCase().replace(/ /g, '')) {
                this.members.push({
                  name: result.getName(),
                  status: result.verified(),
                  id: result._id
                })
              }
            })
          })
        })
      } else {
        this.dropDown = ''
        this.members = []
      }
    },

    inspectStudent(id) {
      alert(id)
    }
  },

  mounted() {
    this.loadTeamNames()
  }
}
</script>
