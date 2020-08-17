<template>
  <div v-if="display" class="notifications social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Notifications</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-card v-for="(item, sn) in userNotifications" :key="sn" class="col-11 col-lg-10" @click="openNotification()">
          <v-row>
            <v-col>
              <v-card-title>
                <v-row>
                  <v-col class="col-10" align="left">
                    <v-badge content="unread">
                      <h3>{{item.getTitle()}}</h3>
                    </v-badge>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-10" align="left">
                    <h3>{{item.getTitle()}}</h3>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="col-12 my-0 py-0" align="left">
                    <small>{{item.getDate()}}</small>
                  </v-col>

                  <v-col class="col-12 my-0 py-0" align="left">
                    <small>{{item.getSender()}}</small>
                  </v-col>

                  <v-col class="col-12 my-0 py-0" align="left">
                    <small>{{item.getAudience()}}</small>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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
        for (let item in this.tutorNotifications) {
          this.userNotifications.push(this.tutorNotifications[item])
        }

        for (let item in this.generalNotifications) {
          this.userNotifications.push(this.generalNotifications[item])
        }

        this.sortNotifications()
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

      this.userNotifications = notifications
      this.$forceUpdate()
      this.display = false
      this.display = true
    },

    openNotification(item) {
      this.notification = item
      this.$store.dispatch('setValue', {name: 'viewMessage', newVal: this.notification})
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