<template>
  <div class="interactive-forum">
    <v-row class="full-height">
      <v-col class="col-12 col-lg-6 px-0 py-0">
        <v-row class="py-0">
          <v-col align="left" class="col-12 col-lg-4 g-blue px-8 py-0">
            <h3>
              <v-btn class="g-rose--text mt-2" @click="leave()">Leave</v-btn>
            </h3>
          </v-col>

          <v-col class="col-12 col-lg-4 g-blue">
            <h3 class="g-deepblue--text pl-5">Title: {{title}}</h3>
          </v-col>

          <v-col class="col-12 col-lg-4 g-blue">
            <h3 class="g-deepblue--text pl-5">Participants: {{participants}}</h3>
          </v-col>
        </v-row>
        
        <iframe v-if="stream && stream.getSource() !== 'instagram' && stream.getSource() !== 'facebook'" id="youtubeplayer" type="text/html" width="100%" height="100%"
          :src="youtubeSrc"
          frameborder="0">
        </iframe>

        <iframe v-if="stream && stream.getSource() === 'facebook'" width="100%" height="100%"
          :src="facebookSrc"
          style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true">
        </iframe>

        <!-- SnapWidget -->
        <div v-if="stream && stream.getSource() === 'instagram'" class="snapwidget-rpf" data-widget-id="868482"></div>
      </v-col>

      <v-col class="col-12 col-lg-6 g-deepblue pt-0" align="center">
        <v-row>
          <v-col align="center" class="col-12 px-5 g-blue">
            <h3 class="g-deepblue--text dosis">Chat</h3>
          </v-col>
        </v-row>

        <v-row v-show="stream" id="convo" class="chat-panel overflow-y-scroll">
          <v-col v-for="(item, sn) in conversation" :key="sn" class="px-5 col-12">
            <v-card v-if="item.type === 'question'" class="col-8 px-1 py-0 my-3 left" align="left">
              <v-card-title class="py-0">
                <h4>{{item.sender}}</h4>
              </v-card-title>

              <v-card-text class="pb-0">
                <span>{{item.content}}</span>
                
                <br/>
                
                <span>
                  <small>{{item.time}}</small>
                </span>
              </v-card-text>
            </v-card>

            <v-card v-if="item.type === 'response'" class="col-8 px-1 py-0 my-3 right" align="left">
              <v-card-title class="py-0">
                <h4>{{item.sender}}</h4>
              </v-card-title>

              <v-card-text class="pb-0">
                <span>{{item.content}}</span>
                
                <br/>
                
                <span>
                  <small>{{item.time}}</small>
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

                <v-textarea rows="3" class="px-0" label="type your question" v-model="question"></v-textarea>

                <v-col class="col-2 px-0" align="center">
                  <v-btn fab small elevation="0" @click="ask()">
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

<script>!function(s,n,ap){if(!s.getElementById(ap)){var a=s.createElement("script");a.id=ap,a.src="https://snapwidget.com/js/snapwidget-rpf.js",s.getElementsByTagName("head")[0].appendChild(a)}}(document,0,"snaprpf");</script>

<script>
import {db} from '../firebase'
import InteractiveSession from '../classes/InteractiveSession'

export default {
  name: 'g-interactive-forum',

  data: () => ({
    stream: null,
    streams: [],
    question: ''
  }),

  computed: {
    youtubeSrc() {return `https://www.youtube.com/embed/${this.link}?autoplay=0&origin=${window.location.href}`},
    facebookSrc() {return `https://web.facebook.com/plugins/video.php?href=${this.link}&show_text=0`},
    // instagramSrc() {return null},

    link() {
      let value = this.stream ? this.stream.getURL() : 'Ll0MTsMP_Gk'

      return value
    },

    forumId() {
      let value = (sessionStorage.getItem('forumId') || this.$store.getters.getState.forumId)

      return value
    },

    user() {return this.$store.getters.getUserData},
    participants() {return this.stream ? this.stream.getParticipants().length : 0},
    title() {return this.stream ? this.stream.getTitle() : ''},
    convoSheet() {return this.stream ? document.getElementById('convo') : null},
    conversation() {return this.stream ? this.stream.getConversation() : null},
    offsetHeight() {
      let value, ROOT = this

      if (this.convoSheet) {
        async function loadChat (ROOT) {
          await ROOT.convoSheet.innerHTML

          return ROOT.convoSheet.scrollHeight
        }

        value = loadChat(ROOT)
      } else {
        value = null
      }

      return value
    }
  },

  firestore: {
    streams: db.collection('forum')
  },

  watch: {
    streams() {
      this.streams.forEach((item) => {
        if (item._active && item._id === this.forumId) {
          this.stream = new InteractiveSession()
          Object.assign(this.stream, item)
        }
      })
    },

    offsetHeight () {
      this.offsetHeight.then((height) => {
        this.convoSheet.scroll({
          top: height,
          left: 0,
          behaviour: 'smooth'
        })
      })
    }
  },

  methods: {
    ask() {
      //Post question
      let stream = new InteractiveSession

      this.streams.forEach((item) => {
        if (item._id === this.forumId && item._active) {
          this.stream = Object.assign(stream, item)

          // create new message
          let question = this.question, date = new Date()
          let message = {
            type: 'question',
            sender: this.user.getName(),
            content: question,
            time: `${date.getUTCHours()}:${date.getUTCMinutes() > 9 ? date.getUTCMinutes() : '0' + date.getUTCMinutes()}`
          }

          // push new message
          this.stream.addMessage(message)

          // upload updated video stream (NO encryption)
          this.$Upload('forum', `${this.stream._title}${this.stream._id}`,JSON.parse(JSON.stringify(this.stream))).then(() => {
            this.question = ''
          })
        }
      })
    },

    leave() {
      // Remove user ID from participants list
      for (let item in this.stream.getParticipants()) {
        if (this.stream.getParticipants()[item] === `${this.user.getName()}${this.user._id}`) {
          this.stream._participants.splice(item, 1)
        }
      }

      this.$Upload('forum', `${this.stream._title}${this.stream._id}`, JSON.parse(JSON.stringify(this.stream))).then(() => {
        // Clear Forum ID in the store and local storage
        this.$store.dispatch('setValue', {name: 'forumId', newVal: ''})

        // Clear forum ID from session storage
        sessionStorage.removeItem('forumId')

        // Go back to the active forums page
        this.$router.push('active-forums')
      })
    }
  },
  
  mounted() {
    
  }
}
</script>

<style>
  .deepblue-border {
    border: 1px solid rgb(9, 50, 67);
  }

  .full-height {
  height: 80vh
}

.chat-panel {
  max-height: 65vh !important;
}

.bottom {
  position: fixed;
  bottom: 5vh;
}

.overflow-y-scroll {
  overflow-y: scroll !important;
}

@media screen and (max-width: 1024px) {
  .chat-panel {
    max-height: 40vh !important;
    padding-bottom: 15vh !important;
  }

  .full-height {
    height: 120vh
  }

  .bottom {
    position: fixed;
    bottom: 0vh;
  }
}
</style>
