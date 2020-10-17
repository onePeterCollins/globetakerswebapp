<template>
  <div class="g-admin-msg-viewer">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Contact Message</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-card class="col-lg-10 col-11">
          <v-card-title class="g-darkblue">
            <v-row>
              <v-col class="col-12 col-lg-6" align="left">
                <h3 class="g-deepblue-text">Title: {{message._subject}}</h3>
                <h3 class="g-deepblue-text">From: {{message._name}}</h3>
                <h3 class="g-deepblue-text">Email: {{message._email}}</h3>

                <v-btn class="mx-2" @click="reply(message._email)">
                  <v-icon>mdi-reply</v-icon>
                  Reply
                </v-btn>
              </v-col>

              <v-col class="col-12 col-lg-6" align="left">
                <h3 class="g-deepblue-text">Date: {{message._date}}</h3>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col align="left">
                <p>{{message._message}}</p>
              </v-col>
            </v-row>
          </v-card-text> 
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'g-admin-message-viewer',

  data: () => ({
    message: {},
    inbox: []
  }),

  firestore: {
    inbox: db.collection('inbox') 
  },

  watch: {
    inbox() {
      this.inbox.forEach((item) => {
        let message = JSON.parse(this.$Decrypt(item.data).token)
        if (message._id === sessionStorage.getItem('contact-message') || this.$store.getters.getUserData.contactMessage) {
          this.message = message
        }
      })
    }
  },

  methods: {
    reply(email) {
      window.location.assign = `mailto:${email}`
    }
  }
}
</script>

<style>

</style>