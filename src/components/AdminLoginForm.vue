<template>
  <v-carousel-transition>
    <v-form v-if="$keys[1]" class="col-lg-4 col-11 reg-form g-white">
      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
          <h2 class="form-title g-deepblue--text">-- LOGIN --</h2>
        </v-row>
      </transition>

      <br/>

      <transition name="slideYneg">
        <v-row v-if="$keys[2]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" :hint='errorMessages.username'  height="30" v-model='username' @input="update('name', username)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="**** ****" :hint="errorMessages.password"  height="30" v-model='password' />
        </v-row>
      </transition>

      <br/>

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <span>
            <b id="adminLoginVerification"></b>
          </span>
        </v-row>
      </transition>

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
          <v-btn @click="login()" class="white g-darkblue--text">Login</v-btn>
        </v-row>
      </v-scale-transition>
    </v-form>
  </v-carousel-transition>
</template>

<script>
import firebase from 'firebase'
import validator from '../form_validation/.globalFormValidation'
import {db} from '../firebase'

export default {
  name: 'g-admin-login-form',

  data: () => ({
    username: '',
    password: '',
    verificationCode: '',
    recaptchaVerifierRendered: false,

    errorMessages: {
      username: 'Administrator username',
      password: 'Enter your password',
      generalErrorMessage: null
    },

    errorFields: null,
    networkMessage: null,
    admins: [],
  }),

  computed: {
    modile() {return this.$store.getters.getLocalData.device.mobile()}
  },

  firestore: {
    admins: db.collection('admins')
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
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('adminLoginVerification', {
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
        if (this.admins.length === 0) {
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
        let matchFound, userData

        // Compare data on all fields to what exists on database
        for (let item in this.admins) {
          userData = this.admins[item].data

          // if(matchFound) add login history, update user details to store, and upload
          if (userData._name.toUpperCase() === this.username.toUpperCase() && userData._password === this.password) {
            matchFound = true

            Object.assign(this.$Admin, userData)

            // set the global user object in the store
            this.$store.dispatch('setValue', {name: 'admin', newVal: this.$Admin})
            this.$store.dispatch('setValue', {name: 'adminAccess', newVal: true})
            
            // send to session storage
            sessionStorage.removeItem('adminId')
            sessionStorage.removeItem('adminAccess')

            sessionStorage.setItem('adminId', this.$Admin._id)
            sessionStorage.setItem('adminAccess', 'true')

            //clear local storage
            localStorage.clear()

            // update network message and redirect to 'dashboard' page
            this.networkMessage = {success: 'logged in'}

            this.$router.push('admin-dashboard')
          }
        }

        if (!matchFound) {
          // if(noMatchFound) update network message
          this.networkMessage = {error: 'Incorrect username or password'}
        }
      }
    },

    usernameHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.username = 'Name and surname max 30 characters'
      : this.errorMessages.username = errorMessage
    }
  },

  mounted() {
    
  },

  hasAnim: true
}
</script>

<style>

</style>