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
    activeSessions: []
  }),

  firestore: {
    liveSessions: db.collection('forum')
  },

  watch: {
    liveSessions() {
      this.liveSessions.forEach((item) => {
        let session = new InteractiveSession()

        Object.assign(session, item)

        this.activeSessions.push(session)
      })
    }
  },

  methods: {
    enterClass(id) {
      this.$store.dispatch('setValue', {name: 'forumId', newVal: id})
      sessionStorage.setItem('forumId', id)
      this.$router.push('interactive-forum')
    }
  }
}
</script>
