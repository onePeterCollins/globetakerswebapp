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
              <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" :hint='errorMessages.username'  height="30" v-model='username' :value='superUser.getName()' @input="update('name', username)" />
            </v-row>
          </transition>

          <br />

          <transition name="slideYneg">
            <v-row v-if="$keys[3]">
              <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="**** ****" :hint="errorMessages.password"  height="30" v-model='password' :value="superUser.getPassword()" @input="update('password', password)" />
            </v-row>
          </transition>

          <br />

          <transition name="slideYneg">
            <v-row v-if="$keys[3]">
              <span>
                <b id="createAdminVerification"></b>
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
import validator from '../form_validation/.globalFormValidation'
import Admin from '../classes/Admin'
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
    superUser: new Admin()
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

    }
  },

  hasAnim: true
}
</script>
