<template>
  <div class="about social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Profile Setup</h2>
      </v-col>
    </v-row>

    <br/>

    <v-card v-if="$User._id" class="col-lg-10 col-11 px-0 py-0 pb-lg-10 center g-deepblue--text" align="center">
      <v-col class="g-blue" align="center">
        <h4 class="g-deepblue--text">Hi {{$User.getFirstName()}},</h4>
        <h3 class="g-deepblue--text">Please provide the following information</h3>
      </v-col>

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
                <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-mapbox" :hint="errorMessages.country" label='Country of residence' v-model="country" :value="$User.getCountry()" @input="update('country', country)"/>
              </v-row>
            </transition>

            <transition name="slideYneg">
              <v-row v-if="$keys[4]" justify="center" class="mb-5">
                <v-col class="col-12 g-rose--text pb-0">
                  <b>Enter your date of birth</b>
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
                <p v-if="email.length > 0 && country.length > 0 && newDate.length > 0" class="g-deepblue warning--text">Confirm that the information you have provided is correct before you proceed.</p>
                <v-btn class="g-white" @click='submit()'>Submit</v-btn>
              </v-row>
            </transition>
          </v-form>
        </v-carousel-transition>
      </v-row>
    </v-card>

    <br v-if="mobile"/>
    <br v-if="mobile"/>
    <br v-if="mobile"/>
    <br/>
    <br/>
    <br/>

  </div>
</template>

<script>
import validator from '../form_validation/.globalFormValidation'

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
    errorMessages: {
      email: 'youremail@domain.com max 30 characters',
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

  watch: {
    user() {
      this.$User = this.user
      this.$forceUpdate()
    },

    newDate() {
      this.$User.setDateOfBirth(this.newDate)
      this.update('date', this.newDate)
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

        if (this.newDate === '') {
          this.errorMessages.generalErrorMessage.push("'Date of birth' field is empty")
        }
      }
    },

    submit() {
      // Check for error fields
      this.errorFields = validator.scanEntries(this)
      
      if (this.newDate === '') {
        this.errorFields = true
        
        if (!this.errorMessages.generalErrorMessage) {
          this.errorMessages.generalErrorMessage = []
          this.errorMessages.generalErrorMessage.push("'Date of birth' field is empty")
        } else {
          this.errorMessages.generalErrorMessage.push("'Date of birth' field is empty")
        }
      }

      if (!this.errorFields) {
        let encryptedData, encryptedToken, encryptedKey, persistentToken = localStorage.getItem('userToken')

        // set profile upload status
        this.$User.setProfile(true)

        // encrypt the updated data
        persistentToken ? encryptedData = this.$Encrypt(JSON.stringify(this.$User), persistentToken) : encryptedData = this.$Encrypt(JSON.stringify(this.$User))
        encryptedToken = {data: encryptedData.token}
        encryptedKey = encryptedData.key

        // upload the new online status
        this.$Upload('users', `${this.$User._id}`, encryptedToken).then(() => {
          // set the global user object in the store
          this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})

          if (this.$User._persist) {
            // update user token in local storage
            localStorage.setItem('userToken', encryptedKey)
          } else {
            // update user token in session storage
            sessionStorage.setItem('userToken', encryptedKey)
          }
          

          this.networkMessage = {success: 'Done'}
        })
      }
    },

    emailHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.email = 'youremail@domain.com max 30 characters'
      : this.errorMessages.email = errorMessage
    },

    countryHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.country = 'Country of resdence'
      : this.errorMessages.country = errorMessage
    }
  },

  hasAnim: true
}
</script>
