<template>
  <div class="interactive-forum">
    <v-row class="mt-0 mb-10 py-0">
      <v-col class="col-12 my-0 py-0">
        <iframe id="youtubeplayer" type="text/html" width="100%" height="130%"
          :src="src"
          frameborder="0">
        </iframe>

      </v-col>
    </v-row>

    <v-row>
      <v-col align="center" fixed bottom class="col-12 px-5 g-cream">
        <h4 class="g-deepblue--text dosis">Questions</h4>
      </v-col>
    </v-row>

    <v-footer fixed class="pb-3 mb-6">
        <v-row justify="space-between">
            <v-col class="col-2 px-0" align="center">
              <v-icon class="mb-12">mdi-forum-outline</v-icon>
            </v-col>

            <v-textarea rows="3" class="px-0" label="type your question"></v-textarea>

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
  name: 'g-interactive-forum',

  data: () => ({
    
  }),

  computed: {
    src() {return `https://www.youtube.com/embed/${this.link}?autoplay=0&origin=${window.location.href}`},
    link() {return 'Ll0MTsMP_Gk'}
  },
  
  mounted() {
    
  }
}
</script>

<style>
  .deepblue-border {
    border: 1px solid rgb(9, 50, 67);
  }
</style>
