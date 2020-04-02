<template>
  <div class="learning-option">
    <v-row class="yellow banner fixed">
      <v-col align="center">
        <h2>Choose your preferred learning option</h2>
      </v-col>
    </v-row>

    <transition name="slideYpos">
      <v-parallax v-if="$keys[0]" class="col-12" height="400" :src="src" />
    </transition>

    <br/>

    <v-row justify="center">
      <transition name="slideYneg">
        <v-card v-if="$keys[2]" @click="takeLecture" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
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
        <v-card v-if="$keys[4]" @click="takeLecture" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
          <v-row class="orange">
            <v-col align="center">
              <h2>
                <v-avatar>
                  <v-icon class="white">mdi-desktop-mac</v-icon>
                </v-avatar>
                Video
              </h2>
            </v-col>
          </v-row>
          <v-row class="highlight">
            <v-col align="center">
              <v-avatar height="150" width="150" class="mt-6 cyan">
                <v-img :src="require('../assets/images/video1.jpg')"/>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </transition>

      <transition name="slideYneg">
        <v-card v-if="$keys[6]" @click="takeLecture" height="300" class="col-10 col-lg-3 mb-5 choose-learning-mode">
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
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>

    <g-student-counter />
  </div>
</template>

<script>
import desktopImg from '@/assets/images/books.jpg'
import mobileImg from '@/assets/images/books1.png'

export default {
  name: 'Learning-option',

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
    }
  },

  methods: {
    takeLecture(type) {
      !type
      ? this.$router.push('lectures')
      : this.$router.push('lectures')
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