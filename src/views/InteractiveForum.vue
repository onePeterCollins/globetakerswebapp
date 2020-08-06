<template>
  <div class="interactive-forum">
    <v-row class="my-0 py-0">
      <v-col class="col-12 my-0 py-0">
        <video width="100%" height="100%" controls autoplay>
          <source src="../assets/videos/Tutorial.mp4" type="video/mp4" />
          Sorry, your browser does not support the video tag
        </video>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center" fixed bottom class="col-12 px-5">
        <h4 class="v-deepblue--text">Questions</h4>
      </v-col>
    </v-row>

    <v-footer fixed class="pb-3 mb-12">
        <v-row>
            <v-col class="col-2">
            <v-icon class="mb-12">mdi-help</v-icon>
            </v-col>

            <textarea rows="3" cols="25" class="px-3 mt-2" placeholder="type your question"></textarea>

            <v-col class="col-2">
            <v-btn fab small elevation="3" direction="top">
                <v-icon>mdi-send</v-icon>
            </v-btn>
            </v-col>
        </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'g-interactive-forum'
}
</script>

<style>

</style>