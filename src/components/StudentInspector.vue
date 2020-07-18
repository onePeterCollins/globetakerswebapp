<template>
  <div class="g-student-inspector">
    <v-row class="yellow">
      <v-col align="center">
        <h1 class="g-deepblue--text">Student Information Manager</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <br/>
        <br/>
        <br/>
        <v-card>
          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Name: </b>
              <span class="g-rose--text">{{$User.getName()}}</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editStringValue('username')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editStringValue('username')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Longrich Code: </b>
              <span class="g-rose--text">{{$User.getLongrichCode()}}</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editStringValue('longrichCode')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editStringValue('longrichCode')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <h2 class="g-deepblue--text">Upline</h2>
              <br/>
              <b class="g-deepblue--text">Team lead: </b>
              <span class="g-rose--text">{{$User.getTeamLeadsName()}}</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3 mb-lg-5">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>

              <br/>

              <b class="g-deepblue--text">Team leaders rank: </b>
              <span class="g-rose--text">{{$User.getTeamLeadsRank()}}</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3  mb-lg-5">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>

              <br/>

              <b class="g-deepblue--text">Subteam Name: </b>
              <span class="g-rose--text">{{$User.getSubTeam()}}</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3 mb-lg-5">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Email: </b>
              <span class="g-rose--text">{{$User.getEmail()}}</span>
              <span v-if="$User.getEmail().length === 0 && this.$User._id" class="red--text">Pending</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Country: </b>
              <span class="g-rose--text">{{$User.getCountry()}}</span>
              <span v-if="$User.getCountry().length === 0 && this.$User._id" class="red--text">Pending</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Verification Status: </b>
              <span v-if="$User.verified() && this.$User._id" class="green--text">Verified</span>
              <span v-else-if="!$User.verified() && this.$User._id" class="red--text">Pending</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="ml-lg-4 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Online Status: </b>
              <span v-if="$User.getOnlineStatus() && this.$User._id" class="green--text">Online</span>
              <span v-else-if="!$User.getOnlineStatus() && this.$User._id" class="red--text">Offline</span>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Login History: </b>
              <span v-if="$User.getLoginHistory().length === 0 && this.$User._id">None yet</span>

              <v-card v-for="(item, sn) in $User.getLoginHistory()" :key="sn" class="mb-2">
                <p>{{item.date}}</p>
                <p>{{item.time}}</p>
                <p>{{item.timeZone}}</p>
                <p>{{item.platform}}</p>
                <p>{{item.userAgent}}</p>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Questions: </b>
              <span v-if="$User.getQuestions().length === 0 && this.$User._id">None yet</span>

              <v-card v-for="(item, sn) in $User.getQuestions()" :key="sn" class="mb-2">
                <span>{{item.question}}</span>
                <span>{{item.date}}</span>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Violations: </b>
              <span v-if="$User.getViolations().length === 0 && this.$User._id">None yet</span>

              <v-card v-for="(item, sn) in $User.getViolations()" :key="sn" class="mb-2">
                <span>{{item.violation}}</span>
                <span>{{item.date}}</span>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Date Of Birth: </b>
              <span class="g-rose--text">{{$User.getDateOfBirth()}}</span>
              <span v-if="$User.getDateOfBirth().length === 0 && this.$User._id" class="red--text">Pending</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Registration Date: </b>
              <span class="g-rose--text">{{$User.getRegistrationDate()}}</span>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Complaints: </b>
              <span v-if="$User.getComplaints().length === 0 && this.$User._id">None yet</span>

              <v-card v-for="(item, sn) in $User.getComplaints()" :key="sn" class="mb-2">
                <span>{{item.complaint}}</span>
                <span>{{item.date}}</span>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Blocked: </b>
              <span v-if="$User.blocked() && this.$User._id" class="red--text">Blocked</span>
              <span v-else-if="!$User.blocked() && this.$User._id" class="green--text">Not blocked</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Disabled: </b>
              <span v-if="$User.disabled() && this.$User._id" class="red--text">Disabled</span>
              <span v-else-if="!$User.disabled() && this.$User._id" class="green--text">Not Disabled</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn>
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-dialog persistent v-model="editString" :width="dialogWidth">
            <v-card class="px-3 py-3 ">
              <h3 class="px-3 py-3 g-deepblue--text">Edit {{editField}}</h3>

              <v-text-field prepend-icon="mdi-pen" :label="inputLabel" :hint="inputHint" height="30" v-model="newString"/>
            
              <v-row justify="center">
                <v-col align="left">
                  <v-btn class="g-rose" @click="cancelEdit()">Cancel</v-btn>
                </v-col>

                <v-col align="right">
                  <v-btn class="green accent-3">Save</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>

          <br/>
          <br/>
          <br/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'g-student-inspector',

  data: () => ({
    personOfInterest: sessionStorage.getItem('inspectStudent'),
    editString: false,
    editBoolean: false,
    editDate: false,
    editField: '',

    newString: '',
    persons: [],
    users: []
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    personId() {return this.$store.getters.getState.inspectStudent},
    dialogWidth() {
      let value

      if (window.innerWidth >= 1264) {
        value = '30vw'
      } else if (window.innerWidth < 1264 &&  window.innerWidth >= 960) {
        value = '50vw'
      } else {
        value = '90vw'
      }

      return value
    },
    inputLabel() {return `Change ${this.editField}`},
    inputHint() {return `Enter new ${this.editField}`}
  },
  
  firestore: {
    users: db.collection('users')
  },

  methods: {
    loadUserData() {
      this.persons = db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
            if (result._id === this.personOfInterest) {
              this.$User = result
              this.$forceUpdate()
            }
          })
        })
      })
    },

    editStringValue(field) {
      switch (field !== '') {
        case field === 'username':
          this.editString = true
          this.editField = 'Username';
        break

        case field === 'longrichCode':
          this.editString = true
          this.editField = 'Longrich Code';
        break

      }
    },

    cancelEdit() {
      this.editString = false
      this.editBoolean = false
      this.editDate = false
      this.editField = ''
    }
  },

  mounted() {
    if (this.personId) {
      this.sessionStorage.setItem('inspectStudent', this.personId)
      this.loadUserData()
    } else if (this.personOfInterest) {
      this.loadUserData()
    } else if (!this.person && this.inspectStudent) {
      this.$router.push('not-found')
    }
  }
}
</script>
