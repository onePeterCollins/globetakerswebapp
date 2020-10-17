<template>
  <div class="g-admin-msg-viewer">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Contact Messages</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-card v-for="(item, sn) in inbox" :key="sn" class="col-11 col-lg-10 mb-5">
          <v-row>
            <v-col class="col-12 col-lg-6" align="left">
              <h2 class="g-deepblue--text ml-3">{{item._subject}}</h2>
              <v-row v-if="!mobile">
                <v-col class="ml-3">
                  <v-btn class="ml-2 mr-12" @click="open(sn)">
                    Open
                  </v-btn>
                  
                  <v-btn class="mx-12" @click="deleteMessage(sn)">
                    <v-icon>mdi-cancel</v-icon>
                    Delete
                  </v-btn>
                </v-col>
              </v-row>

              <v-row v-else>
                <v-col class="ml-3">
                  <v-btn class="mr-3" @click="open(sn)">
                    Open
                  </v-btn>
                </v-col>
              </v-row>

              <v-row v-if="mobile">
                <v-col class="ml-3">
                  <v-btn class="mr-3" @click="deleteMessage(sn)">
                    <v-icon>mdi-cancel</v-icon>
                    Delete
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'g-admin-message-list',

  data: () => ({
    messages: [],
    inbox: [],
    replyLink: ''
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()}
  },

  firestore: {
    messages: db.collection('inbox')
  },

  watch: {
    messages() {
      this.messages.forEach((item) => {
        this.inbox.push(JSON.parse(this.$Decrypt(item.data).token))
      })
    }
  },

  methods: {
    open(sn) {
      let ROOT = this
      this.$store.dispatch('setValue', {name: 'contactMessage', newVal: ROOT.inbox[sn]._id})
      sessionStorage.removeItem('contact-message')
      sessionStorage.setItem('contact-message', ROOT.inbox[sn]._id)

      this.$router.push('message-manager/view-message')
    },

    deleteMessage(sn) {
      db.collection('inbox').doc(`${this.inbox[sn]._id}`).delete()
    }
  }
}
</script>

<style>

</style>