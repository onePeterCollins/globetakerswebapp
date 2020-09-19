<template>
  <v-carousel-transition>
    <v-form v-if="$keys[1]" class="col-lg-10 col-11 student-login-form g-white">
      
      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
          <h2 class="form-title g-deepblue--text">-- LOGIN --</h2>
        </v-row>
      </transition>
      
      <transition name="slideYneg">
        <v-row v-if="$keys[2]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" :hint="errorMessages.username"  height="30" v-model="username" :value="$User.getName()" @input="update('name', username)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="NG **** ****" :hint="errorMessages.longrichCode"  height="30" v-model="longrichCode"  :value="$User.getLongrichCode()" @input="update('longrichCode', longrichCode)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <span>
            <b id="loginVerification"></b>
          </span>
        </v-row>
      </transition>

      <br />
      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[4]">
          <v-checkbox class="mt-0 ml-8" color="rgb(255, 127, 165)" label="stay logged in on this device"  height="0" v-model="persistUser" @change="remember(persistUser)" />
        </v-row>
      </transition>

      <br />

      <v-row v-if="errorMessages.generalErrorMessage" class="mb-5">
        <v-col v-for="(errorMessage, sn) in errorMessages.generalErrorMessage" :key="sn" class="g-deepblue g-cream--text col-12 px-2 mb-2">
          {{errorMessages.generalErrorMessage[sn]}}
        </v-col>
      </v-row>

      <v-row v-if="networkMessage" class="mb-5">
        <v-col class="col-12">
          <p v-if='networkMessage.success'><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
          <p v-if='networkMessage.error'><span class='red'>{{emoji.emojify(':x:')}}</span> {{`${ networkMessage.error}`}}</p>
        </v-col>
      </v-row>

      <v-row v-if="networkMessage" class="mb-5">
        <v-col v-if='networkMessage.error' class="col-12">
          <span><b>To register click </b></span>
          <span><b class="pink--text register-link" @click="showRegistrationForm()">here</b></span>
        </v-col>
      </v-row>

      <v-scale-transition>
        <v-row v-if="$keys[5]" justify="center">
          <v-btn @click='login()' class="white g-darkblue--text">Login</v-btn>
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
  name: 'g-student-login-form',

  data: () => ({
    username: '',
    longrichCode: '',
    verificationCode: '',
    recaptchaVerifierRendered: false,
    persistUser: false,

    errorMessages: {
      username: 'Name and surname max 30 characters',
      longrichCode: 'Your Longrich code',
      generalErrorMessage: null
    },

    errorFields: null,
    networkMessage: null,
    users: []
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    date() {return this.$store.getters.getState.dateString()},
    time() {return this.$store.getters.getState.timeString()},
    timeZone() {return this.$store.getters.getState.timeZone()},
    user() {return this.$store.getters.getUserData},
    device() {return this.$store.getters.getLocalData.device},
    loginHistory() {return {date: this.date, time: this.time, timeZone: this.timeZone, platform: this.device.platform, userAgent: this.device.userAgent}}
  },

  firestore: {
    users: db.collection('users')
  },

  watch: {
    networkMessage () {
      if (this.networkMessage) {
        if (this.networkMessage.success) {
          setTimeout(this.access, 1000)
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

    login() {
      if (!this.recaptchaVerifierRendered && this.verificationCode === '') {
        // display recaptcha challenge
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('loginVerification', {
          'callback': (response) => {
            this.verificationCode = response
            this.login()
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            window.location.reload()
          }
        })

        // if (no network) then alert the user
        if (this.users.length === 0) {
          this.networkMessage = {error: 'Poor network'}
          return
        } else {
          window.recaptchaVerifier.render()
          this.recaptchaVerifierRendered = true
        }
      }

      // Check for error fields
      this.errorFields = validator.scanEntries(this)

      if (!this.errorFields && this.verificationCode.length !== 0) {
        let matchFound, userData, encryptedData, encryptedToken, encryptedKey

        // Compare data on all fields to what exists on database
        for (let item in this.users) {
          // decrypt existing user data and check for a match

          userData = JSON.parse(this.$Decrypt(this.users[item].data).token)

          // if(matchFound) add login history, update user details to store, and upload
          if (userData._name.toUpperCase() === this.$User.getName().toUpperCase() && userData._longrichCode === this.$User.getLongrichCode()) {
            let index = item, encryptionKey
            matchFound = true

            this.$Download(JSON.parse(this.$Decrypt(this.users[index].data).token)).then((response) => {
              this.$User = response

              //set persistence
              this.$User.setPersistence(this.persistUser)

              // add login history
              this.$User.addLoginHistory(this.loginHistory)

              // set online status
              this.$User.setOnlineStatus(true)

              // encrypt the updated data
              encryptedData = this.persistUser ? this.$Encrypt(JSON.stringify(this.$User), encryptionKey) : this.$Encrypt(JSON.stringify(this.$User))
              encryptedToken = {data: encryptedData.token}
              encryptedKey = encryptedData.key

              // upload the new online status
              this.$Upload('users', `${this.$User._id}`, encryptedToken).then(() => {
                // set the global user object in the store
                this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})

                // send to local or session storage
                if (this.$User._persist) {
                  localStorage.clear()
                  localStorage.setItem('userId', this.$User._id)
                  localStorage.setItem('userToken', encryptedKey)
                  localStorage.setItem('loginState', 'true')
                } else {
                  sessionStorage.clear()
                  sessionStorage.setItem('userId', this.$User._id)
                  sessionStorage.setItem('userToken', encryptedKey)
                  sessionStorage.setItem('loginState', 'true')
                }

                // update network message and redirect to 'dashboard' page
                this.networkMessage = {success: 'logged in'}
              })
            })
          }
        }

        if (!matchFound) {
          // if(noMatchFound) update network message
          this.networkMessage = {error: 'Incorrect username or longrich code'}
        }
      }
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

    access() {
      this.$User._typeIndex === 0
      ? this.$router.push('student-dashboard')
      : this.$router.push('trainer-dashboard')
    },

    remember(token) {
      this.$User.setPersistence(token)
    },

    showRegistrationForm() {
      this.$emit('showRegistrationForm')
    }
  },

  mounted() {

  },

  hasAnim: true
}
</script>

<style scoped>
.student-login-form {
  padding: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5rem;
  box-shadow: -0.5px 1.5px 0.25rem 0.5px rgba(0,0,0,0.25)
}

.register-link {
  cursor: pointer;
  text-decoration: underline;
}
</style>
