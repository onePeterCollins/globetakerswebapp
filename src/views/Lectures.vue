<template>
  <div>
    <v-row class="yellow" justify="center">
      <h3>Lectures</h3>
    </v-row>

    <v-row justify="center">
      <v-col class="col-12 gray">
        <p class="ml-2">Before taking a lecture, make sure you have your writing materials.</p>
        <p v-if="more" class="ml-2">Take a break every 30 minutes to go over what has been covered in the lecture.</p>
        <p v-if="more" class="ml-2">Write down your questions if any, and send them to your trainer.</p>
        <p v-if="more" class="ml-2">Learning is a process, give yourself some time. <span>{{emoji.emojify(':wink:')}}</span> </p>
      </v-col>

      <v-btn v-if="more === ''" @click="showMore" class="cyan--text">
          <v-icon small class="mr-2">mdi-more</v-icon> more tips
      </v-btn>
    </v-row>

    <br/>
    <br/>
    <br/>

    <v-row>
      <v-card class="col-10 col-lg-3 mb-5 center gray">
        <v-row>
          <v-col class="col-9">
            <h4 class="ml-2">{Lecture Title}</h4>
            <span class="ml-2">Trainer: </span><span class="bangers">{trainer name}</span>
          </v-col>
          <v-col align="right">
            <v-btn fab color="transparent" depressed small>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-col>

          <!-- <v-col class= "col-11 col-lg-4"> 
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>material-icons code</v-icon>
                </v-btn>
              </template>

              <span>Source</span>
            </v-tooltip>

            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/WVbPgz"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>material-icons computer</v-icon>
                </v-btn>
              </template>

              <span>Codepen</span>
            </v-tooltip> 
          </v-col> -->
        </v-row>

        <v-row justify="center">
          <v-col align="center">
            <p>One line summary of the lecture</p>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="col-10 col-lg-3 mb-5 center gray">
        <v-row>
          <v-col class="col-9">
            <h4 class="ml-2">{Lecture Title}</h4>
            <span class="ml-2">Trainer: </span><span class="bangers">{trainer name}</span>
          </v-col>
          <v-col align="right">
            <v-btn fab color="transparent" depressed small>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col align="center">
            <p>One line summary of the lecture</p>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="col-10 col-lg-3 mb-5 center gray">
        <v-row>
          <v-col class="col-9">
            <h4 class="ml-2">{Lecture Title}</h4>
            <span class="ml-2">Trainer: </span><span class="bangers">{trainer name}</span>
          </v-col>
          <v-col align="right">
            <v-btn fab color="transparent" depressed small>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col align="center">
            <p>One line summary of the lecture</p>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Lectures',

  data: () => ({
    more: ''
  }),

  methods: {
    showMore() {
      this.more = true
    }
  }
}
</script>

<style>

</style>