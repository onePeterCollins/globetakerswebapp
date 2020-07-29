<template>
  <div class="about g-white">
    <v-row class="yellow">
      <v-col align="center">
        <h2>Profile Setup</h2>
      </v-col>
    </v-row>

    <br/>

    <v-card v-if="!$User._id" class="col-lg-10 col-11 px-0 py-0 center g-deepblue--text" align="center">
      <v-card-title class="g-blue" align="center">
        <v-row>
        <v-col align="center">
          <h3>Hi {{$User.getFirstName}}</h3>
          <p>Please provide the <br/>
              following information</p>
        </v-col>
        </v-row>
      </v-card-title>

      <br/>

      <v-row justify="center">
        <v-carousel-transition>
          <v-form v-if="$keys[1]" class="col-lg-5 col-11 mx-0" align="center">

            <transition name="slideYneg">
              <v-row v-if="$keys[2]">
                <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-email" :hint="errorMessages.email" label='Email' v-model="email" :value="$User.getEmail()" @input="update('email', email)"/>
              </v-row>
            </transition>

            <transition name="slideYneg">
              <v-row v-if="$keys[3]">
                <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-mapbox" :hint="errorMessages.country" label='Country of residence' v-model="country" />
              </v-row>
            </transition>

            <transition name="slideYneg">
              <v-row v-if="$keys[4]" justify="center" class="mb-5">
                <v-col class="col-12 g-rose--text pb-0">
                  <b>Date of birth</b>
                </v-col>
                <v-date-picker dark :reactive="true" :show-current="true" type='date' v-model="newDate" />
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

            <transition name="slideYneg">
              <v-row v-if="$keys[5]" justify="center">
                <p v-if="email.length > 0 && country.length > 0 && newDate.length > 0" class="g-deepblue warning--text">Ensure that the information you have provided is correct before you proceed.</p>
                <v-btn class="g-white">Submit</v-btn>
              </v-row>
            </transition>
          </v-form>
        </v-carousel-transition>
      </v-row>
    </v-card>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

  </div>
</template>

<script>
import validator from '../form_validation/.globalFormValidation'
import {db} from '../firebase'

export default {
  name: 'g-profile-setup',

  data: () => ({
    anim: {
      delay: 100,
      limit: 6
    },

    email: '',
    country: '',
    newDate: '',
    users: [],
    errorMessages: {
      email: 'youremail@domain.com Max 30 characters',
      country: 'Country of resdence',

      generalErrorMessage: null
    },

    errorFields: null,
    networkMessage: null,
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData}
  },

  firestore: {
    users: db.collection('users')
  },

  watch: {
    user() {
      this.$User = this.user
      this.$forceUpdate()
    }
  },

  mounted() {
    this.$User = this.user
    this.$forceUpdate()
  },

  methods: {
    update(field, value) {
      // Validate and update input
      validator.newEntry(this, field, value)

      if (this.errorFields) {
        this.errorFields = validator.scanEntries(this)
      }
    },

    submit() {
      
    }
  },

  hasAnim: true
}
</script>
