<template>
  <v-carousel-transition>
    <v-form v-if="$keys[1]" class="col-lg-10 col-11 student-login-form g-white">
      
      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
          <h2 class="form-title">-- LOGIN --</h2>
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
        <v-row v-if="$keys[4]">
          <span class='g-cream px-2 mr-2'>Verification code:</span>

          <span class="verification">
            <b>0xV9Yp2k</b>
          </span>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[5]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-tag" label="Enter verification code" :hint="errorMessages.verificationCode"  height="30" v-model="verificationCode" @input="update('verificationCode', verificationCode)"  />
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
          <p><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
          <p><span class='red'>{{emoji.emojify(':x:')}}</span> {{`${ networkMessage.error}`}}</p>
        </v-col>
      </v-row>

      <v-scale-transition>
        <v-row v-if="$keys[6]" justify="center">
          <v-btn @click='login()' class="g-cream g-darkblue--text">Login</v-btn>
        </v-row>
      </v-scale-transition>
    </v-form>
  </v-carousel-transition>
</template>

<script>
import validator from '../form_validation/.globalFormValidation'

export default {
  name: 'g-student-login-form',

  data: () => ({
    username: '',
    longrichCode: '',
    verificationCode: '',
    generatedCode: '0xV9Yp2k',

    errorMessages: {
      username: 'Name and surname max 30 characters',
      longrichCode: 'Your Longrich code',
      verificationCode: 'Enter the code above',
      generalErrorMessage: null
    },

    errorFields: null,
    networkMessage: null,
  }),

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    },

    date() {return this.$store.getters.getState.dateString()},
    time() {return this.$store.getters.getState.timeString()},
    timeZone() {return this.$store.getters.getState.timeZone()}
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
      // Check for error fields
      this.errorFields = validator.scanEntries(this)

      if (!this.errorFields) {
        // Compare data on all fields to what exists on database
        // if(matchFound) add login history, then load user details to store
        // redirect to student dashboard
        // if(noMatchFound) update network message
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

    verificationCodeHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.verificationCode = 'Enter the code above'
      : this.errorMessages.verificationCode = errorMessage
    },
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
</style>