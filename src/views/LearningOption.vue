<template>
  <div class="learning-option">
    <v-row class="yellow">
      <v-col align="center">
        <h2>Choose your preferred learning option</h2>
      </v-col>
    </v-row>

    <v-parallax class="col-12" height="400" :src="require('../assets/images/learn.jpg')" />

    <br/>

    <v-row justify="center">
      <v-card @click="takeLecture" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
        <v-row class="orange">
          <v-col align="center">
            <h2>
              <v-avatar class="mr-5">
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

      <v-card @click="takeLecture" height="300" class="col-10 col-lg-3 mb-5 mr-lg-5 choose-learning-mode">
        <v-row class="orange">
          <v-col align="center">
            <h2>
              <v-avatar class="mr-5">
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

      <v-card @click="takeLecture" height="300" class="col-10 col-lg-3 mb-5 choose-learning-mode">
        <v-row class="orange">
          <v-col align="center">
            <h2>
              <v-avatar class="mr-5">
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
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'Learning-option',

  methods: {
    takeLecture(type) {
      !type
      ? window.location.href = 'lectures'
      : window.location.href = 'lectures'
    }
  }
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
  background: url('../assets/images/tutor1.jpg');
  background-size: cover;
  background-repeat: none;
  filter: blur(0px);
  transition: 1s;
}
</style>