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
                  <v-col v-for="(item, sn) in content" :key="sn" class="col-12">
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
                          :src="item.imageFile"
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
import {storage} from '../firebase'

export default {
  name: 'g-message-viewer',

  data: () => ({
    display: false,
    content: []
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
    }
  },

  mounted() {
    this.notification._id ? this.display = true : this.display = false

    let ROOT = this

    for (let i in this.notification.getContent()) {
      if (this.notification.getContent()[i].type === 'image') {
        storage.child(this.notification.getContent()[i].content).getDownloadURL().then((url) => {
          let xhr = new XMLHttpRequest()

          xhr.responseType = 'blob'

          xhr.onload = function() {
            let blob = xhr.response,
            reader = new FileReader()

            reader.onload = () => {
              ROOT.content[i] = JSON.parse(JSON.stringify(ROOT.notification._content[i]))
              ROOT.content[i].content = reader.result
              ROOT.display = false
              ROOT.display = true
            }

            reader.readAsDataURL(blob)
          }

          xhr.open('GET', url)
          xhr.send()
        })
      } else {
        ROOT.content[i] = ROOT.notification._content[i]
        ROOT.display = false
        ROOT.display = true
      }
    }

    if (this.notification._unread) {
      let encryptedData, encryptedToken

      if (this.user._id) {
        let notificationDetails = {title: this.notification.getTitle(), id: this.notification._id}
        this.$User = this.user

        // add notification title and id to the list of viewed notifications
        this.$User.addSeenNotification(notificationDetails)

        // check users login persistence
        if (this.$User._persist) {
          // Encrypt and upload new user object
          encryptedData = this.$Encrypt(JSON.stringify(this.$User), localStorage.getItem('userToken'))
        } else {
          // Encrypt and upload new user object
          encryptedData = this.$Encrypt(JSON.stringify(this.$User), sessionStorage.getItem('userToken'))
        }

        encryptedToken = {data: encryptedData.token}

        this.$Upload('users', `${this.$User._id}`, encryptedToken).then(() => {
          // set the global user object in the store
          this.$store.dispatch('setValue', {name: 'user', newVal: this.$User})
        })
      }
    }
  }
}
</script>

<style>

</style>