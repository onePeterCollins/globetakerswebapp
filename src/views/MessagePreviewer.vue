<template>
  <div v-if="display" class="message-viewer social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Notification</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-card class="col-11 g-white">
          <v-row v-if="!mobile">
            <v-col class="g-blue col-6 px-5" align="left">
              <h2 v-if="notification._title !== ''" class="g-deepblue--text">Title: {{notification.getTitle()}}</h2>
              <h3 v-if="notification._subHead !== ''" class="g-deepblue--text">Sub head: {{notification.getSubHead()}} </h3>
              <h3 v-if="notification._sender !== ''" class="g-deepblue--text">From: {{notification.getSender()}}</h3>
            </v-col>

            <v-col class="g-blue col-6 px-5" align="right">
              <h4 v-if="notification._date !== ''" class="g-deepblue--text">Date: {{notification.getDate()}}</h4>
            </v-col>
          </v-row>

          <v-row v-if="mobile">
            <v-col class="g-blue px-3" align="left">
              <h2 v-if="notification._title !== ''" class="g-deepblue--text">Title: {{notification.getTitle()}}</h2>
              <h3 v-if="notification._subHead !== ''" class="g-deepblue--text">Sub head: {{notification.getSubHead()}} </h3>
              <h3 v-if="notification._sender !== ''" class="g-deepblue--text">From: {{notification.getSender()}}</h3>
              <h4 v-if="notification._date !== ''" class="g-deepblue--text">Date: {{notification.getDate()}}</h4>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="col-12" align="center">
              <v-card class="col-11">
                <v-row>
                  <v-col v-for="(item, sn) in notification.getContent()" :key="sn" class="col-12">
                    <p v-if="item.type === 'paragraph'" class="g-deepblue--text dosis px-5" align="left">{{item.content}}</p>
                    
                    <v-tooltip top>
                      <template v-slot:activator="{on, attr}">
                        <v-img v-on="on" v-bind="attr" v-if="item.type === 'image' && !mobile" class="mt-12 g-white"
                          height="500"
                          width="500"
                          contain
                          :src="item.content"
                          :alt="item.alt" />

                        <v-img v-on="on" v-bind="attr" v-if="item.type === 'image' && mobile" class="mt-12 g-white"
                          height="300"
                          width="300"
                          contain
                          :src="item.content"
                          :alt="item.alt" />

                      </template>

                      <span>{{item.alt}}</span>
                    </v-tooltip>

                    <p v-if="item.type === 'image'" class="g-deepblue--text dosis">Image title: {{item.title}}</p>
                    
                    <b v-if="item.type === 'bold'" class="g-deepblue--text">{{item.content}}</b>

                    <i v-else-if="item.type === 'italic'">{{item.content}}</i>

                    <a v-else-if="item.type === 'link'" :href="item.href" target="_blank">{{item.title}}</a>
                  
                    <v-btn v-else-if="item.type === 'button'" :href="item.href" target="_blank">{{item.title}}</v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <br/>

                    <v-row>
                        <v-col align="center">
                        <span><b id="verify-message"></b></span>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col align="center">
                        <p v-if='networkMessage.success'><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
                        <p v-if='networkMessage.processing' class='g-deepblue--text'>
                            <v-progress-circular :rotate="-90" :value="uploadProgress">{{uploadProgress}}%</v-progress-circular>

                            Sending...
                        </p>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col align="center">
                        <h3 v-if='errorMessage'><h2>{{emoji.emojify(':warning:')}}</h2> {{`${ errorMessage}`}}</h3>
                        </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-btn @click="goBack()">
          <v-icon>mdi-left-arrow</v-icon>
          back
        </v-btn>
      </v-col>

      <v-col align="center">
        <v-btn @click='send()'>
          send
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
import Notification from '../classes/Notification'
import firebase from 'firebase'
import {storage} from '../firebase'

export default {
  name: 'g-message-viewer',

  data: () => ({
    display: false,
    verificationCode: '',
    recaptchaVerifierRendered: false,
    networkMessage: {
      processing: null,
      success: null
    },

    errorMessage: null,

    uploadProgress: 0,

    content: [
      {
        type: 'paragraph',
        content: ''
      }
    ],
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},
    notification() {
      let value = new Notification()

      this.$store.getters.getState.viewMessage._id
      ? value = this.$store.getters.getState.viewMessage
      : value = Object.assign(value, JSON.parse(sessionStorage.getItem('viewMessage')))

      return value
    },

    serialNumber() {
      let value, date = new Date(), year, month, day

      year = date.getUTCFullYear()
      month = date.getUTCMonth()
      day = date.getUTCDate()

      value = parseInt(`${year}${month}${day}`)

      return value
    }
  },

  watch: {
    notification() {
      this.display = false
      this.display = true
    }
  },

  methods: {
    goBack() {
      window.history.go(-1)
    },

    checkHeader() {
      if (this.title === '') {
        this.errorMessage = 'Message title has not been set'
        return 0
      } else if (this.sender === '') {
        this.errorMessage = 'Sender name has not been set'
        return 0
      } else {
        return true
      }
    },

    send() {
      if (this.checkHeader()) {
        let notification

        if (!this.recaptchaVerifierRendered && this.verificationCode === '') {
          // display recaptcha challenge
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('verify-message', {
            'callback': (response) => {
              this.verificationCode = response
              this.send()
            },
            'expired-callback': () => {
              // Response expired. Ask user to solve reCAPTCHA again.
              window.location.reload()
            }
          })

          window.recaptchaVerifier.render()
          this.recaptchaVerifierRendered = true
        }
        

        if (this.recaptchaVerifierRendered && this.verificationCode !== '') {
          this.networkMessage.processing = true

          // extract content for processing
          this.content = this.notification.getContent()

          // set serial number (for sorting)
          this.notification.setSn(this.serialNumber)

          for (let i in this.content) {
            if (this.content[i].type === 'image') {
              let format = this.content[i].format,
              storageRef = storage.child(`notificationImages/${this.notification._id}${i}.${format}`),
              upload = storageRef.putString(this.content[i].content, 'data_url')

              upload.then(() => {
                this.content[i].content = ''
                this.content[i].format = format
                this.content[i].content = `notificationImages/${this.notification._id}${i}.${format}`
                this.content[i].imageFile = null
              }).then(() => {
                // set notification content
                this.notification.setContent(this.content)

                // encrypt notification
                notification = {data: this.$Encrypt(JSON.stringify(this.notification)).token}

                // upload notification
                this.$Upload(`notify${this.notification.getAudience()}`, `${this.notification._id}`, notification).then(() => {
                  this.networkMessage.success = 'Message sent'

                  // clear notification
                  this.clear()
                  window.history.go(-1)
                })
              })

              let ROOT = this

              upload.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                ROOT.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              })
            }
          }
        }
      }
    },

    clear() {
      this.title = ''
      this.subHead = ''
      this.sender = ''
      this.content.length = 0
      sessionStorage.clearItem('viewMessage')
    }
  },

  mounted() {
    this.notification._id ? this.display = true : this.display = false
  }
}
</script>

<style>

</style>