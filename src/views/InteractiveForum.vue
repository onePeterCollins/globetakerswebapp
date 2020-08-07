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
        <v-row justify="space-between">
            <v-col class="col-2 px-0" align="center">
              <v-icon class="mb-12">mdi-forum-outline</v-icon>
            </v-col>

            <textarea rows="3" cols="20" class="px-3 mt-2 deepblue-border" placeholder="type your question"></textarea>

            <v-col class="col-2 px-0" align="center">
              <v-btn fab small elevation="0">
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
  .deepblue-border {
    border: 1px solid rgb(9, 50, 67);
  }
</style>
