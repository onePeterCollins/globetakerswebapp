<template>
  <div class='g-create-admin g-deepblue'>
    <v-row class="yellow">
      <v-col align="center">
        <h1 class="g-deepblue--text">Create New Admin Profile</h1>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

    <v-row justify="center">
      <v-carousel-transition>
        <v-form v-if="$keys[1]" class="col-lg-4 col-11 g-white">

          <transition name="slideYneg">
            <v-row v-if="$keys[1]" justify="center">
              <h2 class="form-title">-- CREATE ADMIN --</h2>
            </v-row>
          </transition>

          <transition name="slideYneg">
            <v-row v-if="$keys[2]">
              <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" :hint='errorMessages.username'  height="30" v-model='username' :value='$Admin.getName()' @input="update('name', username)" />
            </v-row>
          </transition>

          <br />

          <transition name="slideYneg">
            <v-row v-if="$keys[3]">
              <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="********" :hint="errorMessages.password"  height="30" v-model='password' :value="$Admin.getPassword()" />
            </v-row>
          </transition>

          <br />

          <transition name="slideYneg">
            <v-row v-if="$keys[3]">
              <span>
                <b id="createAdmin"></b>
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
            <v-row v-if="$keys[5]" justify="center">
              <v-btn @click="createAdmin()" class="g-cream g-darkblue--text">Create</v-btn>
            </v-row>
          </v-scale-transition>
        </v-form>
      </v-carousel-transition>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br v-if="!mobile" />
    <br v-if="!mobile" />
    <br v-if="!mobile" />
    <br v-if="!mobile" />

  </div>
</template>

<script>
import firebase from 'firebase'
import validator from '../form_validation/.globalFormValidation'
import {db} from '../firebase'

export default {
  name: 'g-create-admin',

  data: () => ({
    username: '',
    password: '',
    verificationCode: '',
    recaptchaVerifierRendered: false,

    errorMessages: {
      username: 'Name and surname max 30 characters',
      password: 'At least 8 characters long',
      generalErrorMessage: null
    },

    errorFields: null,
    networkMessage: null,
    admins: [],
  }),

  computed: {
    mobile() {return this.$store.getters.getLocalData.device.mobile()},
    date() {return this.$store.getters.getState.dateString()},
    time() {return this.$store.getters.getState.timeString()},
    timeZone() {return this.$store.getters.getState.timeZone()}
  },

  firestore: {
    admins: db.collection('admins')
  },

  methods: {
    update(field, value) {
      validator.newEntry(this, field, value)

      if (this.errorFields) {
        this.errorFields = validator.scanEntries(this)
      }
    },

    createAdmin() {
      if (!this.recaptchaVerifierRendered && this.verificationCode === '') {
        // display recaptcha challenge
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('createAdmin', {
          'callback': (response) => {
            this.verificationCode = response
            this.createAdmin()
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
        let matchFound, userData, token

        // Compare data on all fields to what exists on database
        for (let item in this.admins) {
          // decrypt existing user data and check for a match

          userData = this.admins[item].data

          // if(matchFound) add login history, update admin details to store, and upload
          if (userData._name.toUpperCase() === this.username.toUpperCase()) {
            matchFound = true

            this.errorMessages.generalErrorMessage
            ? this.errorMessages.generalErrorMessage.push('An admin with the same name already exists')
            : this.errorMessages.generalErrorMessage = []; this.errorMessages.generalErrorMessage.push('An admin with the same name already exists')
          }
        }

        if (!matchFound) {
          // set username
          this.$Admin.setName(this.username)

          // set password
          this.$Admin.setPassword(this.password)

          // set user id
          this.$Admin._id = this.$Admin.getName() + this.generateId()

          // set date
          this.$Admin._dateCreated = `${this.date} ${this.time} ${this.timeZone}`

          token = {data: JSON.parse(JSON.stringify(this.$Admin))}

          // Upload user information
          this.$Upload('admins', `${this.$Admin._id}`, token).then(() => {
            // update network message and redirect to 'awaiting verification' page
            this.networkMessage = {success: 'Registered successfully'}
          })
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
  },

  hasAnim: true
}
</script>
