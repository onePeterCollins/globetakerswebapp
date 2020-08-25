<template>
  <div class="session-monitor social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Session monitor</h2>
      </v-col>
    </v-row>

    <v-row class="full-height">
      <v-col class="col-12 col-lg-6 px-0 py-0">
        <h3 align="center">
          <v-btn class="g-rose white--text" @click="endSession()">End session</v-btn>
        </h3>
        <iframe id="youtubeplayer" type="text/html" width="100%" height="100%"
          :src="src"
          frameborder="0">
        </iframe>
      </v-col>

      <v-col class="col-12 col-lg-6 g-deepblue pt-0" align="center">
        <v-row>
          <v-col align="center" class="col-12 px-5 g-blue">
            <h3 class="g-white--text dosis">Questions</h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="overflow-scroll-y px-5 chat-panel">
            <v-card class="col-8 px-1 py-0 my-3 left" align="left">
              <v-card-title class="py-0">
                <h4>Username</h4>
              </v-card-title>

              <v-card-text class="pb-0">
                <span>question</span>
                
                <br/>
                
                <span>
                  <small>time</small>
                </span>
              </v-card-text>
            </v-card>

            <v-card class="col-8 px-1 py-0 my-3 right" align="left">
              <v-card-title class="py-0">
                <h4>Username</h4>
              </v-card-title>

              <v-card-text class="pb-0">
                <span>response</span>
                
                <br/>
                
                <span>
                  <small>time</small>
                </span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="col-12 pl-3 pl-lg-0">
            <div class="bottom col-12 col-lg-6 white">
              <v-row justify="space-between">
                <v-col class="col-2 px-0" align="center">
                  <v-icon class="mb-12">mdi-forum-outline</v-icon>
                </v-col>

                <v-textarea rows="3" class="px-0" label="type your response"></v-textarea>

                <v-col class="col-2 px-0" align="center">
                  <v-btn fab small elevation="0">
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>        
      </v-col>
    </v-row>

  </div>
</template>

<script>
import {db} from '../firebase'
import InteractiveSession from '../classes/InteractiveSession'

export default {
  name: 'g-session-monitor',

  data: () => ({
    stream: null,
    streams: []
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    forumId() {
      let value = (sessionStorage.getItem('forumId') || this.$store.getters.getState.forumId)

      return value
    },
    src() {return `https://www.youtube.com/embed/${this.link}?autoplay=0&origin=${window.location.href}`},
    link() {
      let value = this.stream ? this.stream.getURL() : 'Ll0MTsMP_Gk'

      return value
    }
  },

  firestore: {
    streams: db.collection('forum')
  },

  watch: {
    streams() {
      this.streams.forEach((item) => {
        if(item._id === this.forumId && item._active) {
          this.stream = new InteractiveSession()
          this.stream = Object.assign(this.stream, item)
        } else if (item._id === this.forumId && !item.active) {
          this.$router.push('forum-manager')
        }
      })
    }
  },

  methods: {
    endSession() {
      this.streams.forEach((item) => {
        let stream = item

        if(stream._id === this.forumId && stream._active) {
          this.stream = new InteractiveSession()
          this.stream = Object.assign(this.stream, stream)

          // deactivate the video stream
          this.stream.setState(false)

          // upload deactivated video stream (NO encryption)
          this.$Upload('forum', `${this.stream._title}${this.stream._id}`, JSON.parse(JSON.stringify(this.stream))).then(() => {
            this.$router.push('forum-manager')
          })
        }
      });
    }
  },

  mounted() {
    
  }
}
</script>

<style scoped>
.full-height {
  height: 80vh
}

.chat-panel {
  max-height: 50vh !important;
}

.bottom {
  position: fixed;
  bottom: 5vh;
}

.left-chat-msg:before {

}

.right-chat-msg:before {

}

.overflow-y-scoped {
  overflow-y: auto;
}

@media screen and (max-width: 1024px) {
  .chat-panel {
    max-height: 100vh !important;
  }

  .full-height {
    height: 120vh
  }
}
</style>