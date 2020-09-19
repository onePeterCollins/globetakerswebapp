<template>
  <div class="session-menu">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Interactive video forums</h2>
      </v-col>
    </v-row>

    <v-row v-if="activeSessions.length > 0">
      <v-col v-for="(item, sn) in activeSessions" :key="sn" align="center" class="col-12">
        <v-card class="col-11 col-lg-10 g-white px-0 py-0" @click="enterClass(item._id)">
          <v-card-text>
            <v-row>
              <v-col align="left" class="col-12">
                <h3 class="g-deepblue--text">
                  Title: {{item.getTitle()}}
                  <v-icon>mdi-video</v-icon>
                </h3>
              </v-col>
            </v-row>

            <v-row>
              <v-col align="left" class="col-12">
                <span class="g-deepblue--text">Participants: {{item.getParticipants().length}}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col align="center">
        <p class="mt-12">No active video forums now</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from '../firebase'
import InteractiveSession from '../classes/InteractiveSession' 

export default {
  name: 'g-interactive-session-menu',

  data: () => ({
    liveSessions: [],
    activeSessions: [],
    sessionId: ''
  }),

  computed: {
    user() {return this.$store.getters.getUserData}
  },

  firestore: {
    liveSessions: db.collection('forum')
  },

  watch: {
    liveSessions() {
      this.liveSessions.forEach((item) => {
        let session = new InteractiveSession()

        Object.assign(session, item)
        
        if (session._active) {
          this.activeSessions.push(session)
        }
      })
    }
  },

  methods: {
    enterClass(id) {
      this.sessionId = id

      for (let item in this.activeSessions) {
        if (this.activeSessions[item]._id === id) {
          this.addParticipant(this.activeSessions[item], `${this.user.getName()}${this.user._id}`)
        }
      }
    },

    addParticipant(session, username) {
      let matchFound, ROOT = this

      for (let item in session.getParticipants()) {
        if (session.getParticipants()[item] === username) {
          matchFound = true
        }
      }

      if (!matchFound) {

        session.addParticipant(username)

        this.$Upload('forum', `${session._title}${session._id}`,JSON.parse(JSON.stringify(session))).then(() => {
          this.$store.dispatch('setValue', {name: 'forumId', newVal: ROOT.sessionId})
          sessionStorage.setItem('forumId', ROOT.sessionId)
          this.$router.push('interactive-forum')
        })
      } else {
        this.$store.dispatch('setValue', {name: 'forumId', newVal: ROOT.sessionId})
        sessionStorage.setItem('forumId', ROOT.sessionId)
        this.$router.push('interactive-forum')
      }
    }
  }
}
</script>
