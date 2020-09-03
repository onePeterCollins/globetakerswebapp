<template>
  <div class="interactive-forum">
    <v-row class="full-height">
      <v-col class="col-12 col-lg-6 px-0 py-0">
        <v-row class="py-0">
          <v-col align="left" class="col-12 col-lg-4 g-blue px-8 py-0">
            <h3>
              <v-btn class="g-rose--text mt-2" @click="endSession()">Leave</v-btn>
            </h3>
          </v-col>

          <v-col class="col-12 col-lg-4 g-blue">
            <h3 class="g-deepblue--text">Title: {{title}}</h3>
          </v-col>

          <v-col class="col-12 col-lg-4 g-blue">
            <h3 class="g-deepblue--text">Participants: {{participants}}</h3>
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

        <iframe v-if="stream && stream.getSource() === 'instagram'" id="instagramplayer" type="text/html" width="100%" height="100%"
          :src="instagramSrc"
          frameborder="0">
        </iframe>
      </v-col>

      <v-col class="col-12 col-lg-6 g-deepblue pt-0" align="center">
        <v-row>
          <v-col align="center" class="col-12 px-5 g-blue">
            <h3 class="g-deepblue--text dosis">Chat</h3>
          </v-col>
        </v-row>

        <v-row v-if="stream">
          <v-col v-for="(item, sn) in stream.getConversation()" :key="sn" class="overflow-scroll-y px-5 chat-panel col-12">
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

                <v-textarea rows="3" class="px-0" label="type your question" v-model="response"></v-textarea>

                <v-col class="col-2 px-0" align="center">
                  <v-btn fab small elevation="0" @click="respond()">
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
export default {
  name: 'g-interactive-forum',

  data: () => ({
    
  }),

  computed: {
    youtubeSrc() {return `https://www.youtube.com/embed/${this.link}?autoplay=0&origin=${window.location.href}`},
    facebookSrc() {return `https://web.facebook.com/plugins/video.php?href=${this.link}&show_text=0`},
    instagramSrc() {return null},
    src() {return `https://www.youtube.com/embed/${this.link}?autoplay=0&origin=${window.location.href}`},
    link() {return 'Ll0MTsMP_Gk'},
    forumId() {
      let value = (sessionStorage.getItem('forumId') || this.$store.getters.getState.forumId)

      return value
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
