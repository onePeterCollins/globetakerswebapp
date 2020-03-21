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
      <v-card height="400" class="col-10 col-lg-3 mb-5">
        <v-row class="orange">
          <v-col align="center">
            <v-avatar>
              <v-img :src="require('../assets/images/logo.jpg')"/>
            </v-avatar>
            <h4>Audio</h4>
          </v-col>
        </v-row>
      </v-card>

      <v-card height="400" class="col-10 col-lg-3 mb-5">
        <v-row class="orange">
          <v-col align="center">
            <v-avatar>
              <v-img :src="require('../assets/images/logo.jpg')"/>
            </v-avatar>
            <h4>Video</h4>
          </v-col>
        </v-row>
      </v-card>

      <v-card height="400" class="col-10 col-lg-3 mb-5">
        <v-row class="orange">
          <v-col align="center">
            <v-avatar>
              <v-img :src="require('../assets/images/logo.jpg')"/>
            </v-avatar>
            <h4>Text</h4>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Learning-option'
}
</script>

<style>

</style>