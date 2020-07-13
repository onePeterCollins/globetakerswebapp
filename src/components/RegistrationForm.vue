<template>
  <v-carousel-transition>
    <v-form v-if="$keys[1]" class="col-lg-10 col-11 reg-form g-white">
      
      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
          <h2 class="form-title">-- REGISTER --</h2>
        </v-row>
      </transition>
      
      <transition name="slideYneg">
        <v-row v-if="$keys[2]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" :hint='errorMessages.username'  height="30" v-model='username' :value='$User.getName()' @input="update('name', username)"/>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="NG **** ****" :hint="errorMessages.longrichCode"  height="30" v-model='longrichCode' :value="$User.getLongrichCode()" @input="update('longrichCode', longrichCode)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[4]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-star" label="Team leaders rank" :hint="errorMessages.teamLeadsRank"  height="30" v-model='teamLeadsRank' :value="$User.getTeamLeadsRank()" @input="update('teamLeadsRank', teamLeadsRank)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[5]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account-outline" label="Team leaders name" :hint="errorMessages.teamLeadsName"  height="30" v-model='teamLeadsName' :value="$User.getTeamLeadsName()" @input="update('teamLeadsName', teamLeadsName)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[6]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account-group" label="sub-team name" :hint="errorMessages.subTeam"  height="30" v-model='subTeam' :value="$User.getSubTeam()" @input="update('subTeam', subTeam)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <span>
            <b id="signupVerification"></b>
          </span>
        </v-row>
      </transition>

      <br/>
      <br/>

      <v-row v-if="errorMessages.generalErrorMessage" class="mb-5">
        <v-col v-for="(errorMessage, sn) in errorMessages.generalErrorMessage" :key="sn" class="g-deepblue g-cream--text col-12 px-2 mb-2">
          {{errorMessages.generalErrorMessage[sn]}}
        </v-col>
      </v-row>

      <v-row v-if="networkMessage" class="mb-5">
        <v-col class="col-12">
          <p v-if="networkMessage.success"><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
          <p v-if="networkMessage.error"><span class='red'>{{emoji.emojify(':x:')}}</span> {{`${ networkMessage.error}`}}</p>
        </v-col>
      </v-row>

      <v-scale-transition>
        <v-row v-if="$keys[6]" justify="center">
          <v-btn @click="register()" class="g-cream g-darkblue--text">Register</v-btn>
        </v-row>
      </v-scale-transition>
    </v-form>
  </v-carousel-transition>
</template>

<script>
import validator from '../form_validation/.globalFormValidation'
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  name: 'g-registration-form',

  data: () => ({
    username: '',
    longrichCode: '',
    teamLeadsRank: '',
    teamLeadsName: '',
    subTeam: '',
    verificationCode: '',
    recaptchaVerifierRendered: false,

    errorMessages: {
      username: 'Name and surname max 30 characters',
      longrichCode: 'Your Longrich code',
      teamLeadsRank: 'Example: D5, D6, D7 ...',
      teamLeadsName: 'Fullname of your team leader',
      subTeam: 'The name of your sub-team',
      generalErrorMessage: null
    },

    errorFields: null,
    networkMessage: null,
    users: []
  }),

  firestore: {
    users: db.collection('users')
  },

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    date() {return this.$store.getters.getState.dateString()},
    time() {return this.$store.getters.getState.timeString()},
    timeZone() {return this.$store.getters.getState.timeZone()},
    device() {return this.$store.getters.getLocalData.device},
    loginHistory() {return {date: this.date, time: this.time, timeZone: this.timeZone, platform: this.device.platform, userAgent: this.device.userAgent}}
  },

  watch: {
    networkMessage () {
      if (this.networkMessage) {
        if (this.networkMessage.success) {
          setTimeout(this.login, 3000)
        }

        if (this.networkMessage.error === 'You have already registered') {
          setTimeout(this.login, 3000)
        }
      }
    }
  },

  methods: {
    update(field, value) {
      // Validate and update input
      validator.newEntry(this, field, value)

      if (this.errorFields) {
        this.errorFields = validator.scanEntries(this)
      }
    },

    register() {
      // Check for error fields
      this.errorFields = validator.scanEntries(this)

      if (!this.errorFields) {
        let matchFound, userData, userKey, encryptedData, encryptedToken, encryptedKey

        // Continue registration, set registration date
        this.$User.setRegistrationDate(`${this.date} ${this.time} ${this.timeZone}`)

        // Compare data on 'fullname' and 'longrich code' fields to what exists on database
        for (let item in this.users) {
          // if (no network) then alert the user
          if (this.users.length === 0) {
            this.networkMessage = {error: 'Bad network'}
          }

          // decrypt existing user data and check for a match
          userData = JSON.parse(this.$Decrypt(this.users[item].data).token)
          userKey = this.$Decrypt(this.users[item].data).key

          // if(matchFound) then block duplicate registration
          if (userData._name === this.$User.getName() && userData._longrichCode === this.$User.getLongrichCode()) {
            matchFound = true

            this.$Download(userData).then((response) => {
              this.$User = response

              // add login history
              this.$User.addLoginHistory(this.loginHistory)

              // set online status
              this.$User.setOnlineStatus(true)

              // encrypt the updated data
              encryptedData = (this.$User._persist || this.$User._isOnline) ? this.$Encrypt(JSON.stringify(userData), userKey) : this.$Encrypt(JSON.stringify(userData))
              encryptedToken = {data: encryptedData.token}
              encryptedKey = encryptedData.key

              // upload the new online status
              this.$Upload('users', `${this.$User._id}`, encryptedToken).then(() => {
                // set the global user object in the store
                this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})

                // send to session storage
                sessionStorage.clear()
                sessionStorage.setItem('userToken', encryptedKey)
                sessionStorage.setItem('loginState', 'true')

                // update network message and redirect to 'dashboard' page
                this.networkMessage = {error: 'You have already registered'}
              })
            })

          } else if (userData._longrichCode === this.$User.getLongrichCode()) {
            this.networkMessage = {error: 'This Longrich code has already been used'}
            matchFound = true
          }
        }

        if (!matchFound) {
          // else initialize and upload this.$User and send it to the $store
          let token, key

          if (!this.recaptchaVerifierRendered && this.verificationCode === '') {
            // display recaptcha challenge
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signupVerification', {
              'callback': (response) => {
                this.verificationCode = response
                this.register()
              },
              'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                window.location.reload()
              }
            })

            window.recaptchaVerifier.render()
            this.recaptchaVerifierRendered = true
          }

          if (this.verificationCode.length !== 0) {
            // set user id
            this.$User.setId(`${this.username.replace(/ /g, "")}${this.generateId()}`)

            // add login history
            this.$User.addLoginHistory(this.loginHistory)

            // set online status
            this.$User.setOnlineStatus(true)

            // encrypt user data
            encryptedData = this.$Encrypt(JSON.stringify(this.$User))
            token = {data: encryptedData.token}
            key = encryptedData.key

            this.$Upload('users', `${this.$User._id}`, token).then(() => {
              // set the global user object in the store
              this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})
              
              // send to session storage
              sessionStorage.clear()
              sessionStorage.setItem('userToken', key)
              sessionStorage.setItem('loginState', 'true')

              // update network message and redirect to 'awaiting verification' page
              this.networkMessage = {success: 'Registered successfully'}
            })
          }
        }
      }
    },

    generateId() {
      let charCode,
      value = ''

      for (let i=0; i<12; i++) {
        charCode = Math.floor(Math.random() * 10)
        value += charCode.toString()
      }

      return value
    },

    usernameHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.username = 'Name and surname max 30 characters'
      : this.errorMessages.username = errorMessage
    },

    longrichCodeHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.longrichCode = 'Your Longrich code'
      : this.errorMessages.longrichCode = errorMessage
    },

    teamLeadsRankHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.teamLeadsRank = 'Example: D5, D6, D7 ...'
      : this.errorMessages.teamLeadsRank = errorMessage
    },

    teamLeadsNameHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.teamLeadsName = 'Fullname of your team leader'
      : this.errorMessages.teamLeadsName = errorMessage
    },

    subTeamHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.subTeam = 'The name of your sub-team'
      : this.errorMessages.subTeam = errorMessage
    },

    login() {
      // go to user dashboard
      this.$router.push('/student-dashboard')
    }
  },

  mounted() {
    
  },

  hasAnim: true
}
</script>

<style scoped>
.reg-form {
  padding: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5rem;
  box-shadow: -0.5px 1.5px 0.25rem 0.5px rgba(0,0,0,0.25)
}
</style>
