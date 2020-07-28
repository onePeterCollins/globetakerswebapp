<template>
  <div class="g-student-inspector">
    <v-row class="yellow">
      <v-col align="center">
        <h1 class="g-deepblue--text">Student Information Manager</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Name: </b>
              <span class="g-rose--text">{{$User.getName()}}</span>
              <span v-if="this.$User._id === ''">Loading...</span>

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
              <span v-if="this.$User._id === ''">Loading...</span>

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
              <span v-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3 mb-lg-5" @click="editStringValue('teamLeadsName')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editStringValue('teamLeadsName')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>

              <br/>

              <b class="g-deepblue--text">Team leaders rank: </b>
              <span class="g-rose--text">{{$User.getTeamLeadsRank()}}</span>
              <span v-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3  mb-lg-5" @click="editStringValue('teamLeadsRank')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editStringValue('teamLeadsRank')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>

              <br/>

              <b class="g-deepblue--text">Subteam Name: </b>
              <span class="g-rose--text">{{$User.getSubTeam()}}</span>
              <span v-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3 mb-lg-5" @click="editStringValue('subTeamName')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editStringValue('subTeamName')">
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
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editStringValue('email')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editStringValue('email')">
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
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editStringValue('country')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editStringValue('country')">
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
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editBooleanValue('verification')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editBooleanValue('verification')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="ml-lg-4 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Is Tutor: </b>
              <span v-if="$User.getUserType() === 'tutor' && this.$User._id" class="green--text">Yes</span>
              <span v-else-if="$User.getUserType() === 'student' && this.$User._id" class="red--text">No</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editBooleanValue('tutor')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editBooleanValue('tutor')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Online Status: </b>
              <span v-if="$User.getOnlineStatus() && this.$User._id" class="green--text">Online</span>
              <span v-else-if="!$User.getOnlineStatus() && this.$User._id" class="red--text">Offline</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Login History: </b>
              <span v-if="$User.getLoginHistory().length === 0 && this.$User._id">None yet</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-col class="g-white max-height-50">
                <v-card v-for="(item, sn) in $User.getLoginHistory()" :key="sn" class="mb-2">
                  <p>{{item.date}}</p>
                  <p>{{item.time}}</p>
                  <p>{{item.timeZone}}</p>
                  <p>{{item.platform}}</p>
                  <p>{{item.userAgent}}</p>
                </v-card>
              </v-col>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Questions: </b>
              <span v-if="$User.getQuestions().length === 0 && this.$User._id">None yet</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-col class="g-white max-height-50">
                <v-card v-for="(item, sn) in $User.getQuestions()" :key="sn" class="mb-2">
                  <span>{{item.question}}</span>
                  <span>{{item.date}}</span>
                </v-card>
              </v-col>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Violations: </b>
              <span v-if="$User.getViolations().length === 0 && this.$User._id">None yet</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-col class="g-white max-height-50">
                <v-card v-for="(item, sn) in $User.getViolations()" :key="sn" class="mb-2">
                  <span>{{item.violation}}</span>
                  <span>{{item.date}}</span>
                </v-card>
              </v-col>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Date Of Birth: </b>
              <span class="g-rose--text">{{$User.getDateOfBirth()}}</span>
              <span v-if="$User.getDateOfBirth().length === 0 && this.$User._id" class="red--text">Pending</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editDateValue('dateOfBirth')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editDateValue('dateOfBirth')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Registration Date: </b>
              <span v-if="$User.getRegistrationDate() && this.$User._id !== ''" class="g-rose--text">{{$User.getRegistrationDate()}}</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Complaints: </b>
              <span v-if="$User.getComplaints().length === 0 && this.$User._id">None yet</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-col class="g-white max-height-50">
                <v-card v-for="(item, sn) in $User.getComplaints()" :key="sn" class="mb-2">
                  <span>{{item.complaint}}</span>
                  <span>{{item.date}}</span>
                </v-card>
              </v-col>
            </v-col>
          </v-row>

          <v-row class="ml-lg-5 ml-3 mb-3">
            <v-col class="g-white">
              <b class="g-deepblue--text">Blocked: </b>
              <span v-if="$User.blocked() && this.$User._id" class="red--text">Blocked</span>
              <span v-else-if="!$User.blocked() && this.$User._id" class="green--text">Not blocked</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editBooleanValue('blocked')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editBooleanValue('blocked')">
                    <v-icon class="mr-3">mdi-pen</v-icon>
                    <span>Edit</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mr-lg-4 mr-3 mb-3">
            <v-col class="pl-lg-11 pl-9 g-white">
              <b class="g-deepblue--text">Disabled: </b>
              <span v-if="$User.disabled() && this.$User._id" class="red--text">Disabled</span>
              <span v-else-if="!$User.disabled() && this.$User._id" class="green--text">Not Disabled</span>
              <span v-else-if="this.$User._id === ''">Loading...</span>

              <v-btn v-if="!mobile && this.$User._id" class="ml-lg-5 ml-3" @click="editBooleanValue('disabled')">
                <v-icon class="mr-3">mdi-pen</v-icon>
                <span>Edit</span>
              </v-btn>

              <v-row v-else-if="mobile && this.$User._id">
                <v-col>
                  <v-btn @click="editBooleanValue('disabled')">
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

              <v-text-field prepend-icon="mdi-pen" :label="inputLabel" :hint="inputHint" height="30" v-model="newValue"/>
            
              <v-row justify="center">
                <v-col align="left">
                  <v-btn class="g-rose" @click="cancelEdit()">Cancel</v-btn>
                </v-col>

                <v-col align="right">
                  <v-btn class="green accent-3" @click="uploadEditedProfile()">Save</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>

          <v-dialog persistent v-model="editBoolean" :width="dialogWidth">
            <v-card class="px-3 py-3 ">
              <h3 class="px-3 py-3 g-deepblue--text">Edit {{editField}}</h3>

              <v-row>
                <v-col class="col-6">
                  <v-btn fab class="ml-10" @click="newValue = false">
                    <v-icon class="red--text">mdi-cancel</v-icon>
                  </v-btn>
                </v-col>

                <v-col class="col-6" align="right">
                  <v-btn fab class="mr-10" @click="newValue = true">
                    <v-icon class="green--text accent-3">mdi-check</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

              <v-row justify="center">
                <p>{{inputLabel}}</p>
              </v-row>
            
              <v-row justify="center">
                <v-col align="left">
                  <v-btn class="g-rose" @click="cancelEdit()">Cancel</v-btn>
                </v-col>

                <v-col align="right">
                  <v-btn class="green accent-3" @click="uploadEditedProfile()">Save</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>

          <v-dialog persistent v-model="editDate" :width="dialogWidth">
            <v-card class="px-3 py-3 ">
              <h3 class="px-3 py-3 g-deepblue--text">Edit {{editField}}</h3>

              <v-row justify="center">
                <v-date-picker dark :reactive="true" :show-current="true" type='date' v-model="newValue">
                </v-date-picker>
              </v-row>
            
              <v-row justify="center">
                <v-col align="left">
                  <v-btn class="g-rose" @click="cancelEdit()">Cancel</v-btn>
                </v-col>

                <v-col align="right">
                  <v-btn class="green accent-3" @click="uploadEditedProfile()">Save</v-btn>
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

    newValue: '',
    persons: [],
    users: [],
    encryptionKey: ''
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

  watch: {
    newValue() {
      switch(this.editField !== '') {
        case this.editField === 'Username':
          this.$User.setName(this.newValue)
        break

        case this.editField === 'Longrich Code':
          this.$User.setLongrichCode(this.newValue)
        break

        case this.editField === 'Team Leaders Name':
          this.$User.setTeamLeadsName(this.newValue)
        break

        case this.editField === 'Team Leaders Rank':
          this.$User.setTeamLeadsRank(this.newValue)
        break

        case this.editField === 'Sub Team Name':
          this.$User.setSubTeam(this.newValue)
        break

        case this.editField === 'Email':
          this.$User.setEmail(this.newValue)
        break

        case this.editField === 'Country':
          this.$User.setCountry(this.newValue)
        break

        case this.editField === 'Verification Status':
          this.$User.setVerificationStatus(this.newValue)
        break

        case this.editField === 'Tutor Status':
          !this.newValue ? this.$User.setUserType(0) : this.$User.setUserType(1)
        break

        case this.editField === 'Blocked Status':
          this.newValue ? this.$User.block() : this.$User.unblock()
        break

        case this.editField === 'Disabled Status':
          this.newValue ? this.$User.disable() : this.$User.enable()
        break

        case this.editField === 'Date of Birth':
          this.$User.setDateOfBirth(this.newValue)
        break
      }
    }
  },

  methods: {
    loadUserData() {
      this.persons = db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          this.$Download(JSON.parse(this.$Decrypt(item.data().data).token)).then((result) => {
            if (result._id === this.personOfInterest) {
              this.$User = result
              this.encryptionKey = this.$Decrypt(item.data().data).key
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

        case field === 'teamLeadsName':
          this.editString = true
          this.editField = 'Team Leaders Name';
        break

        case field === 'teamLeadsRank':
          this.editString = true
          this.editField = 'Team Leaders Rank';
        break

        case field === 'subTeamName':
          this.editString = true
          this.editField = 'Sub Team Name';
        break

        case field === 'email':
          this.editString = true
          this.editField = 'Email';
        break

        case field === 'country':
          this.editString = true
          this.editField = 'Country';
        break
      }
    },

    editBooleanValue(field) {
      switch(field !== '') {
        case field === 'verification':
          this.editBoolean = true
          this.editField = 'Verification Status'
        break

        case field === 'tutor':
          this.editBoolean = true
          this.editField = 'Tutor Status'
        break

        case field === 'blocked':
          this.editBoolean = true
          this.editField = 'Blocked Status'
        break

        case field === 'disabled':
          this.editBoolean = true
          this.editField = 'Disabled Status'
        break
      }
    },

    editDateValue(field) {
      switch(field !== '') {
        case field === 'dateOfBirth':
          this.editDate = true
          this.editField = 'Date of Birth'
        break
      }
    },

    cancelEdit() {
      this.editField = ''
      this.newValue = ''
      this.editString = false
      this.editBoolean = false
      this.editDate = false
      this.loadUserData()
    },

    uploadEditedProfile() {
      this.editField = ''
      this.newValue = ''
      this.editString = false
      this.editBoolean = false
      this.editDate = false

      let editedProfile = {data: this.$Encrypt(JSON.stringify(this.$User), this.encryptionKey).token},
      key

      for(let i in this.users) {
        key = this.$Decrypt(this.users[i].data).key

        if (key === this.encryptionKey) {
          this.$Upload('users', `${this.$User._id}`, editedProfile).then(() => {
            this.loadUserData()
          })
        }
      }

      
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

<style scoped>
.max-height-50 {
  max-height: 50vh !important;
  overflow: auto !important;
}
</style>
