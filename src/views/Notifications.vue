<template>
  <div v-if="display" class="notifications social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Notifications</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-card v-for="(item, sn) in userNotifications" :key="sn" class="col-11 col-lg-10 mb-5" @click="openNotification(item)">
          <v-row>
            <v-col>
              <v-card-title>
                <v-row v-if="item._unread">
                  <v-col class="col-10 pl-lg-12 g-deepblue--text" align="left">
                    <v-badge content="unread">
                      <h3>{{item.getTitle()}}</h3>
                    </v-badge>
                  </v-col>
                </v-row>

                <v-row v-if="!item._unread">
                  <v-col class="col-10 pl-lg-12 grey--text" align="left">
                    <h3>{{item.getTitle()}}</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 my-0 py-0 px-lg-12 px-8 g-deepblue--text" align="right">
                    <small>{{item.getDate()}}</small>
                  </v-col>

                  <v-col class="col-12 my-0 py-0 px-lg-12 px-4 g-deepblue--text" align="right">
                    <small class="px-2 round mx-2 gray">from: {{item.getSender()}}</small>
                    <small class="px-2 round ml-2 gray">to: {{item.getAudience()}}</small>
                  </v-col>

                </v-row>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
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
import {db} from '../firebase'
import Notification from '../classes/Notification'

export default {
  name: 'g-notifications',

  data: () => ({
    display: false,
    notification: null,
    userNotifications: [],
    studentNotifications: [],
    tutorNotifications: [],
    generalNotifications: []
  }),

  computed: {
    user() {return this.$store.getters.getUserData}
  },

  firesore: {
    studentNotifications: db.collection('notifystudents'),
    tutorNotifications: db.collection('notifytutors'),
    generalNotifications: db.collection('notifygeneral')
  },

  watch: {
    studentNotifications() {
      this.loadNotifications()
    },

    tutorNotifications() {
      this.loadNotifications()
    },

    generalNotifications() {
      this.loadNotifications()
    }
  },

  methods: {
    loadNotifications() {
      this.$User = this.user

      
      if(this.$User.getUserType() === 'student') {
        db.collection('notifystudents').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            this.userNotifications.push(item.data())
          })
        }).then(() => {
          db.collection('notifygeneral').get().then((querySnapshot) => {
            querySnapshot.forEach((item) => {
              this.userNotifications.push(item.data())
            })
          }).then(() => {
            this.sortNotifications()
          })
        })
      } else if (this.$User.getUserType() === 'tutor') {
        db.collection('notifytutors').get().then((querySnapshot) => {
          querySnapshot.forEach((item) => {
            this.userNotifications.push(item.data())
          })
        }).then(() => {
          db.collection('notifygeneral').get().then((querySnapshot) => {
            querySnapshot.forEach((item) => {
              this.userNotifications.push(item.data())
            })
          }).then(() => {
            this.sortNotifications()
          })
        })
      }
    },

    sortNotifications() {
      let notifications = [], token = new Notification(), serializer = []

      while(this.userNotifications.length > 0) {
        let sn = serializer.length > 0 ? serializer[serializer.length - 1] : 0,
        index

        // sort the serial numbers
        for (let i in this.userNotifications) {

          Object.assign(token, JSON.parse(this.$Decrypt(this.userNotifications[i].data).token))

          if (sn === 0) {
            sn = token.getSn()
          } else if (token.getSn() >= sn) {
            sn = token.getSn()
            index = i
          }
          
          if (i == (this.userNotifications.length - 1)) {
            let sortedNotification = new Notification()

            notifications.push(Object.assign(sortedNotification, JSON.parse(this.$Decrypt(this.userNotifications.splice(index, 1)[0].data).token)))
            serializer.push(sn)
          }
        }
      }

      this.userNotifications = this.filterNotifications(notifications)
      this.$forceUpdate()
      this.display = false
      this.display = true
    },

    filterNotifications(notifications) {
      let filteredNotifications = [], ROOT = this

      // filter unread notifications from a sorted array
      function filterUnread(array, callback) {
        for (let i in array) {
          let unread = true

          for (let item in ROOT.$User.getNotifications()) {
            if (array[i].getTitle().replace(/ /g, "") === ROOT.$User.getNotifications()[item].title.replace(/ /g, "") && array[i]._id === ROOT.$User.getNotifications()[item]._id) {
              unread = false
            }
          }

          if (unread) {
            if (array[i].getAudienceTeam() !== '') {
              filterBySubTeam(array, filteredNotifications)
            } else {
              filteredNotifications.push(array[i])
            }
          }
        }

        callback(notifications)
      }

      // filter read notifications from a sorted array (callback after filtering unread)
      function filterRead(array) {
        for (let i in array) {
          let read = false

          for (let item in ROOT.$User.getNotifications()) {
            if (array[i].getTitle().replace(/ /g, "") === ROOT.$User.getNotifications()[item].title.replace(/ /g, "") && array[i]._id === ROOT.$User.getNotifications()[item].id) {
              read = true
            }
          }

          if (read) {
            array[i]._unread = false

            if (array[i].getAudienceTeam() !== '') {
              filteredNotifications.push(array[i])
            }
          }
        }
      }

      function filterBySubTeam(array, outputArray) {
        for (let i in array) {
          if (ROOT.$User.getSubTeam().replace(/ /g, "").toUpperCase() === array[i].getAudienceTeam().replace(/ /g, "").toUpperCase()) {
            outputArray.push(array[i])
          }
        }
      }

      filterUnread(notifications, filterRead)

      return filteredNotifications
    },

    openNotification(item) {
      // assign item to a variable
      this.notification = item

      // send notification object to the store
      this.$store.dispatch('setValue', {name: 'viewMessage', newVal: this.notification})

      // save notification in session storage
      sessionStorage.setItem('viewMessage', JSON.stringify(this.notification))

      // open notification viewer
      this.$router.push('notifications/view-notification')
    }
  },

  mounted() {
    if (this.user) {
      if (this.user._isOnline) {
        this.loadNotifications()
      } else {
        this.$router.push('/')
      }
    } else {
      this.$router.push('/')
    }
  },

  updated() {
    // alert(this.studentNotifications.length)
  }
}
</script>

<style>

</style>