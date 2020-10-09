<template>
  <v-form v-if="display" class="col-lg-5 col-11 contact-form center cyan lighten-5">
    <v-row justify="center">
        <h2 class="form-title g-deepblue--text">-- CONTACT US--</h2>
    </v-row>

    <br/>

    <transition name="slideYneg">
      <v-row v-if="$keys[1]">
        <v-text-field color="g-rose" prepend-icon="mdi-account" label="Full name" height="30" :hint="errorMessages.username" v-model="username" :value="$User.getName()" @input="update('name', username)" />
      </v-row>
    </transition>

    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[2]">
        <v-text-field color="g-rose" prepend-icon="mdi-email" label="Email" height="30" :hint="errorMessages.email" v-model="email" :value="$User.getEmail()" @input="update('email', email)" />
      </v-row>
    </transition>

    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[3]">
        <v-text-field color="g-rose" prepend-icon="mdi-pen" label="Subject" height="30" :hint="errorMessages.subject" v-model="subject" :value="contactMessage.getSubject()" @input="update('subject', subject)" />
      </v-row>
    </transition>

    <br />
    <br />
    <br />
    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[4]">
        <v-textarea color="g-rose" prepend-icon="mdi-pencil" label="Type your message here" height="30" :hint="errorMessages.message" v-model="message" :value="contactMessage.getMessage()" @input="update('message', message)" />
      </v-row>
    </transition>

    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[5]">
        <span>
          <b id="contactVerification"></b>
        </span>
      </v-row>
    </transition>

    <br />

    <v-row v-if="errorMessages.generalErrorMessage" class="mb-5">
      <v-col v-for="(errorMessage, sn) in errorMessages.generalErrorMessage" :key="sn" class="g-deepblue g-cream--text col-12 px-2 mb-2">
        {{errorMessages.generalErrorMessage[sn]}}
      </v-col>
    </v-row>

    <br />

    <v-row>
      <v-col align="center">
        <p v-if='networkMessage.error'><span class='red'>{{emoji.emojify(':x:')}}</span> {{`${ networkMessage.error}`}}</p>
        <p v-if='networkMessage.success'><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
        <p v-if='networkMessage.processing' class='g-deepblue--text'>
          <v-progress-circular indeterminate />

          Sending...
        </p>
      </v-col>
    </v-row>

    <v-scale-transition>
      <v-row v-if="$keys[6]" justify="center">
        <v-btn class="white g-darkblue--text" @click="send()">Submit</v-btn>
      </v-row>
    </v-scale-transition>
  </v-form>
</template>

<script>
import validator from '../form_validation/.globalFormValidation'
import ContactMessage from '../classes/ContactMessage'
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  name: 'g-contact-form',

  data: () => ({
    display: false,
    username: '',
    email: '',
    subject: '',
    message: '',
    contactMessage: new ContactMessage(),
    recaptchaVerifierRendered: false,
    verificationCode: '',

    errorMessages: {
      username: 'Name and surname max 30 characters',
      email: 'youremail@domain.com max 30 characters',
      subject: 'Enter subject max 30 characters',
      message: 'Write your message max 200 characters',
      generalErrorMessage: null
    },

    errorFields: null,
    networkMessage: {
      error: null,
      processing: null,
      success: null
    },

    msgs: []
  }),

  computed: {
    date() {return this.$store.getters.getState.dateString()},
    user() {return this.$store.getters.getUserData},
    serialNumber() {
      let value, date = new Date(), year, month, day

      year = date.getUTCFullYear()
      month = date.getUTCMonth()
      day = date.getUTCDate()

      value = parseInt(`${year}${month}${day}`)

      return value
    }
  },

  firestore: {
    msgs: db.collection('inbox')
  },

  watch: {
    user() {
      if (this.user._id) {
        this.$User = this.user

        this.username = this.$User.getName()
        
        if (this.$User.getProfile()) {
          this.email = this.$User.getEmail()
        }

        this.$forceUpdate()
        this.display = false
        this.display = true
      }
    },
    
    networkMessage () {
      if (this.networkMessage) {
        if (this.networkMessage.success) {
          setTimeout(this.clear, 1000)
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

    send() {
      let message

      if (!this.recaptchaVerifierRendered && this.verificationCode === '') {
        // display recaptcha challenge
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('contactVerification', {
          'callback': (response) => {
            this.verificationCode = response
            this.send()
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            window.location.reload()
          }
        })

        // if (no network) then alert the user
        if (this.msgs.length === 0) {
          this.networkMessage.error = 'Poor network'
          return
        } else {
          window.recaptchaVerifier.render()
          this.recaptchaVerifierRendered = true
        }
      }

      // Check for error fields
      this.errorFields = validator.scanEntries(this)

      if (!this.errorFields && this.verificationCode.length !== 0) {
        this.networkMessage.processing = true

        // set sender name
        this.contactMessage.setName(this.$User.getName())

        // set sender email
        this.contactMessage.setEmail(this.$User.getEmail())

        // set message id
        this.contactMessage._id = `${this.subject}${this.generateId()}`

        // set message date
        this.contactMessage.setDate(this.date)

        // set serial number (for sorting)
        this.contactMessage.setSn(this.serialNumber)

        // encrypt message
        message = {data: this.$Encrypt(JSON.stringify(this.contactMessage)).token}


        // upload message
        this.$Upload('inbox', `${this.contactMessage._id}`, message).then(() => {
          this.networkMessage.success = 'Message sent'
          this.networkMessage.processing = false
          this.clear()
        })
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

    emailHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.email = 'youremail@domain.com max 30 characters'
      : this.errorMessages.email = errorMessage
    },

    subjectHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.subject = 'Enter subject max 30 characters'
      : this.errorMessages.subject = errorMessage
    },

    messageHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.message = 'Write your message max 200 characters'
      : this.errorMessages.message = errorMessage
    },

    clear() {
      this.username = ''
      this.email = ''
      this.subject = ''
      this.message = ''
      this.contactMessage = new ContactMessage()
    }
  },

  mounted() {
    if (this.user._id) {
      this.$User = this.user

      this.username = this.$User.getName()

      if (this.$User.getProfile()) {
        this.email = this.$User.getEmail()
      }
      
      this.$forceUpdate()
      this.display = false
      this.display = true
    } else {
      this.display = true
    }
  },

  hasAnim: true
}
</script>
