<template>
  <div class="teaching-option social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Choose your lecture format</h2>
      </v-col>
    </v-row>

    <transition name="slideYpos">
      <v-parallax v-if="$keys[0]" class="col-12" height="400" :src="src" />
    </transition>

    <br/>

    <v-row justify="center">
      <transition name="slideYneg">
        <v-card v-if="$keys[2]" @click="uploadLecture('audio')" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
          <v-row class="orange">
            <v-col align="center">
              <h2>
                <v-avatar>
                  <v-icon class="white">mdi-headset</v-icon>
                </v-avatar>
                Audio
              </h2>
            </v-col>
          </v-row>
          <v-row class="highlight">
            <v-col align="center">
              <v-avatar height="150" width="150" class="mt-6 cyan">
                <v-img :src="require('../assets/images/audio1.jpg')"/>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </transition>

      <transition name="slideYneg">
        <v-card v-if="$keys[4]" @click="uploadLecture('text')" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
          <v-row class="orange">
            <v-col align="center">
              <h2>
                <v-avatar>
                  <v-icon class="white">mdi-text</v-icon>
                </v-avatar>
                Text
              </h2>
            </v-col>
          </v-row>
          <v-row class="highlight">
            <v-col align="center">
              <v-avatar height="150" width="150" class="mt-6 cyan option">
                <v-img :src="require('../assets/images/text1.jpg')"/>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </transition>

      <transition name="slideYneg">
        <v-card v-if="$keys[2]" @click="goLive(user.getName())" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
          <v-row class="orange">
            <v-col align="center">
              <h2>
                <v-avatar>
                  <v-icon class="white">mdi-video</v-icon>
                </v-avatar>
                Go Live
              </h2>
            </v-col>
          </v-row>
          <v-row class="highlight">
            <v-col align="center">
              <v-avatar height="150" width="150" class="mt-6 cyan">
                <v-img :src="require('../assets/images/video-forum.png')"/>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </transition>

      <transition name="slideYneg">
        <v-card v-if="$keys[4]" @click="viewLectures()" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
          <v-row class="orange">
            <v-col align="center">
              <h2>
                <v-avatar>
                  <v-icon class="white">mdi-book</v-icon>
                </v-avatar>
                My Lectures
              </h2>
            </v-col>
          </v-row>
          <v-row class="highlight">
            <v-col align="center">
              <v-avatar height="150" width="150" class="mt-6 cyan option">
                <v-img :src="require('../assets/images/teach-online.jpg')"/>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </transition>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>

    <g-student-counter />
  </div>
</template>

<script>
import desktopImg from '@/assets/images/teach-desktop.png'
import mobileImg from '@/assets/images/teach-mobile.png'

export default {
  name: 'Teaching-option',

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    },

    src: () => {
      let value

      window.innerWidth < 1024
      ? value = mobileImg
      : value = desktopImg

      return value
    },
    user() {return this.$store.getters.getUserData}
  },

  methods: {
    uploadLecture(type) {
      if (type === 'audio') {
        this.$store.dispatch('setValue', {name: 'createLecture', newVal: 'audio'})
        this.$router.push('upload-lesson')
      } else if (type === 'text') {
        this.$store.dispatch('setValue', {name: 'createLecture', newVal: 'text'})
        this.$router.push('upload-lesson')
      }
    },

    goLive(username) {
      sessionStorage.removeItem('hostName')
      sessionStorage.setItem('hostName', username)
      this.$router.push('forum-manager')
    },

    viewLectures() {
      this.$router.push('my-lectures')
    }
  },

  hasAnim: true
}
</script>

<style scoped>
.choose-learning-mode {
  filter: grayscale(70%);
  transition: 1s;
}

.choose-learning-mode:hover {
  filter: grayscale(0%)
}

.highlight {
  filter: blur(2px);
  transition: 1s;
}

.highlight:hover {
  background: url('../assets/images/tutor1.jpg'), rgba(0, 0, 0, 0.75);
  background-size: cover;
  background-repeat: none;
  background-blend-mode: multiply;
  filter: blur(0px);
  transition: 1s;
}
</style>
