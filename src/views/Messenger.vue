<template>
  <div class="messenger social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Compose Message</h2>
      </v-col>
    </v-row>

    <br/>
    <br/>

    <v-row>
      <v-col align="center">
        <v-form class="col-11 col-lg-10 g-white">
          <v-row>
            <v-col class="col-12 px-0">
              <v-card class="col-12 col-lg-10">
                <h3 class="form-title g-deepblue--text">Meta data</h3>

                <v-row>
                  <v-col class="px-1 px-lg-12">
                    <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-text" label="Title"  height="30" v-model="title" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="px-1 px-lg-12">
                    <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-text" label="Sub head"  height="30" v-model="subHead" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="px-1 px-lg-12">
                    <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Sender"  height="30" v-model="sender" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 col-lg-6 px-1 px-lg-12" align="left">
                    <p>
                      <v-icon class="mr-2">mdi-account-group</v-icon>
                      Audience: 
                      <b class="g-rose--text">{{notification.getAudience()}}</b>
                    </p>
                  </v-col>

                  <v-col class="col-12 col-lg-6">
                    <v-btn v-if="notification.getAudience() !== 'students'" class="mx-2 mb-3 g-deepblue--text" @click="setAudience(0)">
                      <v-icon class="mr-2">mdi-account-group</v-icon>
                      Students
                    </v-btn>

                    <v-btn v-if="notification.getAudience() === 'students'" class="mx-2 mb-3 g-rose--text" @click="setAudience(0)">
                      <v-icon class="mr-2">mdi-account-group</v-icon>
                      Students
                    </v-btn>

                    <v-btn v-if="notification.getAudience() !== 'general'" class="mx-2 mb-3 g-deepblue--text" @click="setAudience(2)">
                      <v-icon class="mr-2">mdi-account-group</v-icon>
                      General
                    </v-btn>

                    <v-btn v-if="notification.getAudience() === 'general'" class="mx-2 mb-3 g-rose--text" @click="setAudience(2)">
                      <v-icon class="mr-2">mdi-account-group</v-icon>
                      General
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <br/>

          <v-row>
            <v-col class="col-12 px-0">
              <v-card class="col-12 col-lg-10">
                <h3 class="form-title g-deepblue--text">Content</h3>

                <v-row>
                  <v-col>
                    <!-- add widgets for inserting text, images and buttons here -->

                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attr}">
                        <v-btn v-on="on" v-bind="attr" class="mx-2 mb-2" @click="addItem(contentType.paragraph)">
                          <v-icon>mdi-format-paragraph</v-icon>
                        </v-btn>
                      </template>

                      <span>New paragraph</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attr}">
                        <v-btn v-on="on" v-bind="attr" class="mx-2 mb-2" @click="addItem(contentType.image)">
                          <v-icon>mdi-image</v-icon>
                        </v-btn>
                      </template>

                      <span>Insert image</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attr}">
                        <v-btn v-on="on" v-bind="attr" class="mx-2 mb-2" @click="addItem(contentType.bold)">
                          <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                      </template>

                      <span>Insert bold text</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attr}">
                        <v-btn v-on="on" v-bind="attr" class="mx-2 mb-2" @click="addItem(contentType.italic)">
                          <v-icon>mdi-format-italic</v-icon>
                        </v-btn>
                      </template>

                      <span>Insert italic text</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attr}">
                        <v-btn v-on="on" v-bind="attr" class="mx-2 mb-2" @click="addItem(contentType.link)">
                          <v-icon>mdi-link</v-icon>
                        </v-btn>
                      </template>

                      <span>Insert link</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{on, attr}">
                        <v-btn v-on="on" v-bind="attr" class="mx-2 mb-2" @click="addItem(contentType.button)">
                          <v-icon>mdi-cursor-default-click</v-icon>
                        </v-btn>
                      </template>

                      <span>Insert button</span>
                    </v-tooltip>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col class="col-11 px-0 px-lg-5 my-5 g-white" v-for="(item, sn) in content" :key="sn">
                    <v-col align="right">
                      <v-row>
                        <v-col align="left" class="col-10">item {{sn + 1 + '.' + ' ' + item.type}}</v-col>

                        <v-col class="col-2" align="center">
                          <v-btn x-small fab top class="red" @click="removeItem(sn)">
                            <v-icon class="white--text">mdi-close</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-textarea v-if="item.type === 'paragraph'" class="mx-1 mx-lg-5" prepend-icon="mdi-text" rows="3" label="Type paragraph text" v-model="content[sn].content" />
                    <v-textarea v-if="item.type === 'bold'" class="mx-1 mx-lg-5" rows="3" prepend-icon="mdi-text" label="Type bold text" v-model="content[sn].content" />
                    <v-textarea v-if="item.type === 'italic'" class="mx-1 mx-lg-5" rows="3" prepend-icon="mdi-text" label="Type italic text" v-model="content[sn].content" />

                    <v-col v-if="item.type === 'image'">
                      <v-file-input class="mx-1 mx-lg-5" label="Attach image" show-size v-model="content[sn].content"/>
                      <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter image title" height="30" v-model="content[sn].title" />
                      <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter image description" height="30" v-model="content[sn].alt" />
                    </v-col>

                    <v-col v-if="item.type === 'link'">
                      <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter link address" persistent-hint hint="https://address.com" height="30" v-model="content[sn].href" />
                      <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter link text" height="30" v-model="content[sn].title" />
                    </v-col>

                    <v-col v-if="item.type === 'button'">
                      <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter button address" persistent-hint hint="https://address.com" height="30" v-model="content[sn].href" />
                      <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter button text" height="30" v-model="content[sn].title" />
                    </v-col>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <br/>

          <v-row>
            <v-col align="center">
              <span><b id="verify-message"></b></span>
            </v-col>
          </v-row>

          <v-row>
            <v-col align="center">
              <p v-if='networkMessage.success'><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
              <p v-if='networkMessage.processing' class='g-deepblue white--text'>
                <v-progress-circular />
                Sending...
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col align="right">
              <v-btn class="g-darkblue--text" @click="preview()">
                <v-icon>mdi-preview</v-icon>
                preview
              </v-btn>
            </v-col>

            <v-col align="left">
              <v-btn class="g-darkblue--text" @click="send()">
                Send
                <v-icon class="pl-5">mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
import Notification from '../classes/Notification'
import firebase from 'firebase'

export default {
  name: 'g-messenger',

  data: () => ({
    title: '',
    subHead: '',
    sender: '',
    verificationCode: '',
    recaptchaVerifierRendered: false,

    networkMessage: {
      processing: null,
      success: null
    },

    content: [
      {
        type: 'paragraph',
        content: ''
      }
    ],
    contentType: {
      paragraph: {
        type: 'paragraph',
        content: ''
      },

      bold: {
        type: 'bold',
        content: ''
      },

      italic: {
        type: 'italic',
        content: ''
      },

      image: {
        type: 'image',
        content: {},
        title: '',
        alt: ''
      },

      link: {
        type: 'link',
        href: '',
        title: ''
      },

      button: {
        type: 'button',
        href: '',
        title: ''
      }
    },

    notification: new Notification()
  }),

  computed: {
    date() {return this.$store.getters.getState.dateString()},

  },

  methods: {
    setAudience(index) {
      this.notification.setAudienceIndex(index)
    },

    addItem(item) {
      this.content.push(item)
    },

    removeItem(index) {
      this.content.splice(index, 1)
    },

    send() {
      let notification

      this.processing = true

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
        // set title
        this.notification.setTitle(this.title)

        // set subhead
        this.notification.setSubHead(this.subHead)

        // set sender
        this.notification.setSender(this.sender)

        // set notification content
        this.notification.setContent(this.content)

        // set notification ID
        this.notification._id = `${this.notification.getTitle() + this.generateId()}`

        // set notification date
        this.notification.setDate(this.date)

        // encrypt notification
        notification = {data: this.$Encrypt(JSON.stringify(this.notification)).token}

        // upload notification
        this.$Upload(`notify${this.notification.getAudience()}`, `${this.notification._id}`, notification).then(() => {
          this.networkMessage.success = 'Message sent'
          window.location.reload()
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

    preview() {

    }
  },

  mounted() {
    this.notification.setAudienceIndex(0)
  }
}
</script>

<style>

</style>
