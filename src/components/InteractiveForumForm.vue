<template>
  <v-row>
    <v-col>
      <v-form class="col-lg-5 col-11 g-white">
        <transition name="slideYneg">
            <v-row v-if="$keys[1]" justify="center">
            <h2 class="form-title g-deepblue--text">-- START LIVE SESSION --</h2>
            </v-row>
        </transition>

        <transition name="slideYneg">
            <v-row v-if="$keys[2]">
            <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-text" label="Title" hint="Enter session title"  height="30" v-model="title" @input="update('title', title)" />
            </v-row>
        </transition>

        <br />

        <transition name="slideYneg">
            <v-row v-if="$keys[3]">
            <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-video" label="Live stream URL" hint="https://live-stream-link"  height="30" v-model="url" @input="update('url', url)" />
            </v-row>
        </transition>

        <br />

        <v-row v-if="errorMessage" class="mb-5">
            <v-col class="col-12">
              <p v-if='errorMessage'><span class='red'>{{emoji.emojify(':x:')}}</span> {{errorMessage}}</p>
            </v-col>
        </v-row>

        <br/>

        <transition name="slideYneg">
            <v-row v-if="$keys[4]">
            <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Host name" hint="Enter your name"  height="30" v-model="host" @input="update('host', host)" />
            </v-row>
        </transition>

        <br />

        <transition name="slideYneg">
            <v-row v-if="$keys[3]">
              <span>
                  <b id="broadcastVerification"></b>
              </span>
            </v-row>
        </transition>

        <br />

        <v-row v-if="networkMessage" class="mb-5">
            <v-col class="col-12">
              <p v-if='networkMessage.success'><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
              <p v-if='networkMessage.error'><span class='red'>{{emoji.emojify(':x:')}}</span> {{`${ networkMessage.error}`}}</p>
            </v-col>
        </v-row>

        <v-scale-transition>
            <v-row v-if="$keys[5]" justify="center">
              <v-btn @click='goLive()' class="white g-darkblue--text">Launch</v-btn>
            </v-row>
        </v-scale-transition>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import InteractiveSession from '../classes/InteractiveSession'
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  name: 'g-interactive-forum-form',

  data: () => ({
    title: '',
    url: '',
    host: '',
    InteractiveSession: new InteractiveSession(),
    networkMessage: null,
    errorMessage: null,
    recaptchaVerifierRendered: false,
    verificationCode: '',
    users: [],
    videoSource: ''
  }),

  watch: {
    url(urlString) {
      if (urlString.includes('https://') || urlString.includes('http://')) {
        if (urlString.includes('youtu')) {
          this.videoSource = 'youtube'
        } else if (urlString.includes('facebook')) {
          this.videoSource = 'facebook'
        } else if (urlString.includes('insta')) {
          this.videoSource = 'instagram'
        } else if (this.url === '') {
          this.videoSource = ''
        } else {
          this.videoSource = 'unsupported'
        }
      } else {
        this.InteractiveSession.setSource('');
        this.errorMessage = null;
      }
    },

    videoSource() {
      if (this.url.includes('https://') || this.url.includes('http://')) {
        switch (this.videoSource) {
          case 'youtube':
            this.InteractiveSession.setSource('youtube');
            this.errorMessage = null;
            break;

          case 'facebook':
            this.InteractiveSession.setSource('facebook');
            this.errorMessage = null;
            break;

          case 'instagram':
            this.InteractiveSession.setSource('instagram');
            this.errorMessage = null;
            break;

          case 'unsupported':
            this.InteractiveSession.setSource('unsupported');
            this.errorMessage = 'Unsupported video source, use only youtube facebook or instagram';
            break;

          case '':
            this.InteractiveSession.setSource('');
            this.errorMessage = null;
            break;
        }
      } else {
        this.InteractiveSession.setSource('');
        this.errorMessage = null;
      }
    }
  },

  firestore: {
    users: db.collection('users')
  },

  methods: {
    update(field, value) {
      switch(field){
        case 'title':
          this.InteractiveSession.setTitle(value)
          break;

        case 'url':
          this.InteractiveSession.setURL(this.stripUrl(value))
          break;

        case 'host':
          this.InteractiveSession.setHost(value)
          break;
      }
    },

    goLive() {
      // recaptcha verification
      if (!this.recaptchaVerifierRendered && this.verificationCode === '') {
        // display recaptcha challenge
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('broadcastVerification', {
          'callback': (response) => {
            this.verificationCode = response
            this.goLive()
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

      if (this.verificationCode !== '' && this.title !== '' && this.url !== '' && this.host !== '' && this.videoSource !== 'unsupported') {
        let interactiveSessionId

        // set session ID
        this.InteractiveSession._id = this.generateId()
        interactiveSessionId = this.InteractiveSession._id

        // ensure session URL is set
        this.InteractiveSession.setURL(this.stripUrl(this.url))

        // set date
        this.InteractiveSession.setDate()

        // activate the session
        this.InteractiveSession.setState(true)

        // upload the interactive session (NO encryption)
        this.$Upload('forum', `${this.InteractiveSession._title}${this.InteractiveSession._id}`, JSON.parse(JSON.stringify(this.InteractiveSession))).then(() => {
          // save forum id in the store and session storage
          this.$store.dispatch('setValue', {name: 'forumId', newVal: interactiveSessionId})
          sessionStorage.removeItem('forumId')
          sessionStorage.setItem('forumId', interactiveSessionId)

          // route to the monitoring screen
          this.$router.push('session-monitor')
        })
      } else if (this.videoSource === 'unsupported') {
        alert("can't continue, unsupported video source")
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

    stripUrl(url) {

      if (this.videoSource === 'youtube') {
        let urlString = url.split('').reverse(), strippedUrl = '', stop = false

        urlString.forEach((item, index, array) => {

          //break the loop at the backslash
          if (item === '/' && array[index + 1] === 'e') {
            stop = true
          }

          //
          if (!stop) {
            strippedUrl += item
          }
        })

        return strippedUrl.split('').reverse().join('')
      } else if (this.videoSource === 'facebook') {
        // facebook live video link stripper
        let urlString = url.split(''), modifiedUrl = ''

        urlString.forEach((item, index) => {
          if (item === '/') {
            modifiedUrl += '%2F'
          }

          if (item === ':') {
            modifiedUrl += '%3A'
          }

          if (item !== '/' && item !== ':') {
            modifiedUrl += item
          }

          if (index === (urlString.length - 1) && item !== '/') {
            modifiedUrl += '%2F'
          }
        })

        return modifiedUrl
      } else if (this.videoSource === 'instagram') {
        // instagram live video link stripper

      }
    }
  },

  hasAnim: true
}
</script>

<style>

</style>