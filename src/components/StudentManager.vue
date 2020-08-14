<template>
  <div class="student-manager">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Student Manager</h2>
      </v-col>
    </v-row>

    <br/>

    <v-row justify="center">
      <v-card class="col-lg-3 col-11 px-lg-5 px-8 pb-0 mx-2 my-3">
        <v-row>
          <v-col>
            <span><b class="g-deepblue--text">Total students: </b> {{totalStudents}}</span><br/>
            <span><b class="green--text">Verified: </b> {{verified}}</span><br/>
            <span><b class="red--text">Pending: </b> {{pending}}</span>
          </v-col>
        </v-row>
      </v-card>

      <v-card align="center" class="col-lg-3 col-11 px-0 pb-0 mx-2 my-3">
        <h3 class="g-deepblue--text dosis">Attendance History</h3>
        <br/>

        <v-card-text class="px-3 pb-0 mb-0 g-deepblue">
          <v-row>
            <v-col>
              <v-btn class="g-deepblue--text" @click="attendanceHistory()">
                <v-icon>mdi-history</v-icon>
                view history
              </v-btn> 
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <v-card align="center" class="col-lg-3 col-11 px-0 pb-0 mx-2 my-3">
        <h3 class="g-deepblue--text dosis">Message all students</h3>
        <br/>
        
        <v-card-text class="px-3 pb-0 mb-0 g-deepblue">
          <v-row>
            <v-col>
              <v-btn class="g-deepblue--text" @click="generalMessage()">
                <v-icon>mdi-message</v-icon>
                compose
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row justify="center">
      <v-card class="col-11 col-lg-4 px-0 pb-0 mx-0 my-5">
        <v-row>
          <v-col class="col-lg-8 px-10">
            <v-text-field height="30" persistent-hint hint="Enter student name" label="Search" />
          </v-col>
          
          <v-col v-if="!mobile" class="col-lg-4">
            <v-btn class="g-deepblue--text">
              <v-icon>mdi-magnify</v-icon>
              Search
            </v-btn>
          </v-col>
        </v-row>

        <v-card-text v-if="mobile" class="px-3 pb-0 mb-0 g-deepblue">
          <v-row justify="center">
            <v-col class="" align="center">
              <v-btn class="g-deepblue--text">
                <v-icon>mdi-magnify</v-icon>
                Search
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
                        <v-btn v-if="verifiedUsers !== team.name" @click="showVerified(team.name)">show</v-btn>
                        <v-btn v-if="verifiedUsers === team.name" @click="showVerified(team.name)">hide</v-btn>
                      </v-col>

                      <v-col class="col-6">
                        <h4 class="pl-2 red--text">Pending: {{team.pending}}</h4>
                        <v-btn v-if="pendingUsers !== team.name" @click="showPending(team.name)">show</v-btn>
                        <v-btn v-if="pendingUsers === team.name" @click="showPending(team.name)">hide</v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-row>
                      <v-col align="left">
                        <p class="g-rose--text"><b class="g-deepblue--text">Team Lead: </b> {{team.teamLead}}</p>
                        <p class="g-rose--text"><b class="g-deepblue--text">Team Lead's rank: </b> {{team.teamLeadsRank}}</p>
                      </v-col>
                    </v-row>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-row>

            <v-row>
              <v-card v-if="dropDown === team.name || pendingUsers === team.name || verifiedUsers === team.name" class="col-12 px-1">
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
                    <v-col align="left" class="col-5 px-1 py-0 my-0">
                      <p class="g-white g-deepblue--text py-2 pl-3">{{member.name}}</p>
                    </v-col>

                    <v-col align="center" class="col-3 px-1 py-0">
                      <p v-if="member.status" class="green accent-2 g-deepblue--text py-2"><b>Verified</b></p>
                      <v-checkbox v-else-if="!member.status" class="ml-5 mr-10 my-0" label="verify" @change="verify(member.id)" />
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
    dropDown: '',
    pendingUsers: '',
    verifiedUsers: '',
    refreshTeam: ''
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    userPopulation() {return this.users.length}
  },

  firestore: {
    users: db.collection('users')
  },

  methods: {
    loadTeamNames() {
      let userTeam

      this.teamNames = []
      this.teams = []
      this.totalStudents = 0
      this.verified = 0
      this.pending = 0

      this.users = db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
            let matchFound

            userTeam = result.getSubTeam()

            if (this.teamNames.length === 0) {
              this.teamNames.push(
                {name: userTeam, teamLead: result.getTeamLeadsName(), teamLeadsRank: result.getTeamLeadsRank()}
              )
            }

            for (let team in this.teamNames) {
              if (userTeam.toUpperCase().replace(/ /g, '') === this.teamNames[team].name.toUpperCase().replace(/ /g, '')) {
                matchFound = true
              }
            }

            if (!matchFound) {
              this.teamNames.push(
                {name: userTeam, teamLead: result.getTeamLeadsName(), teamLeadsRank: result.getTeamLeadsRank()}
              )
            }
          })
        })
      }).then(() => {this.loadTeamData()})
    },

    loadTeamData() {
      let userTeam,
      verified

      for (let i in this.teamNames) {
        this.teams.push({sn: (i+1), name: this.teamNames[i].name, population: 0, verified: 0, pending: 0, teamLead: this.teamNames[i].teamLead, teamLeadsRank: this.teamNames[i].teamLeadsRank})
      }

      this.users = db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
            userTeam = result.getSubTeam()
            verified = result.verified()

            if (result.getUserType() === 'student') {
              this.totalStudents++

              for (let i in this.teamNames) {
                // search for matching team names
                if (userTeam.toUpperCase().replace(/ /g, '') === this.teamNames[i].name.toUpperCase().replace(/ /g, '')) {
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
            }
          })
        })
      }).then(() => {
        if (this.dropDown && this.refreshTeam) {
          this.dropDown = ''
          this.showTeamMemebrs(this.refreshTeam)
        }
      })
    },

    showTeamMemebrs (teamName) {
      this.pendingUsers = ''
      this.verifiedUsers = ''
      this.members = []

      if (teamName !== this.dropDown) {
        this.dropDown = teamName

        this.users = db.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
              if (result.getSubTeam().toUpperCase().replace(/ /g, '') === teamName.toUpperCase().replace(/ /g, '') && result.getUserType() === 'student') {
                this.members.push({
                  name: result.getName(),
                  status: result.verified(),
                  id: result._id,
                  teamName: result.getSubTeam()
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

    showPending(teamName) {
      this.dropDown = ''
      this.verifiedUsers = ''
      this.members = []

      if (teamName !== this.pendingUsers) {
        this.pendingUsers = teamName

        this.users = db.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
              if (result.getSubTeam().toUpperCase().replace(/ /g, '') === teamName.toUpperCase().replace(/ /g, '') && !result.verified() && result.getUserType() === 'student') {
                this.members.push({
                  name: result.getName(),
                  status: result.verified(),
                  id: result._id,
                  teamName: result.getSubTeam()
                })
              }
            })
          })
        })
      } else {
        this.pendingUsers = ''
        this.members = []
      }
    },

    showVerified(teamName) {
      this.dropDown = ''
      this.pendingUsers = ''
      this.members = []

      if (teamName !== this.verifiedUsers) {
        this.verifiedUsers = teamName

        this.users = db.collection('users').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
              if (result.getSubTeam().toUpperCase().replace(/ /g, '') === teamName.toUpperCase().replace(/ /g, '') && result.verified() && result.getUserType() === 'student') {
                this.members.push({
                  name: result.getName(),
                  status: result.verified(),
                  id: result._id,
                  teamName: result.getSubTeam()
                })
              }
            })
          })
        })
      } else {
        this.verifiedUsers = ''
        this.members = []
      }
    },

    verify(id) {
      let encryptionKey,
      verifiedUser

      this.users = db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {

          this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
            if (id === result._id) {
              encryptionKey = this.$Decrypt(item.data().data).key
              result.setVerificationStatus(true)
              this.refreshTeam = result.getSubTeam()

              verifiedUser = {data: this.$Encrypt(JSON.stringify(result), encryptionKey).token}

              this.$Upload('users', `${id}`,verifiedUser).then(() => {
                this.loadTeamNames()
              })
            }
          })
        })
      })
    },

    attendanceHistory() {

    },

    generalMessage() {
      this.$router.push('student-manager/messenger')
    },

    inspectStudent(id) {
      this.$store.dispatch('setValue', {name: 'inspectSudent', newVal: id})
      sessionStorage.setItem('inspectStudent', '')
      sessionStorage.setItem('inspectStudent', id)
      this.$router.push('student-manager/student-inspector')
    }
  },

  mounted() {
    this.loadTeamNames()
  }
}
</script>
