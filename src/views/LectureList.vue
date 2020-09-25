<template>
  <div class="g-lecture-viewer">
    <v-row class="g-cream">
      <v-col>
        <h3 align="center">{{lectureType}} lectures</h3>
      </v-col>
    </v-row>

    <v-row class="g-deepblue">
      <v-col align="center">
        <v-btn @click="lectureType = 'audio'">
          Audio Lectures
        </v-btn>
      </v-col>

      <v-col align="center">
        <v-btn @click="lectureType = 'text'">
          Text Lectures
        </v-btn>
      </v-col>
    </v-row>

    <br />
    <br />
    <br />
    <br />

    <v-row v-if="lectureType === 'audio'">
      <v-col v-for="(lecture, sn) in myAudioLectures" :key="sn" align="center">
        <v-card class="my-5 col-11 col-lg-10">
          <v-row>
            <v-col class="col-12 col-lg-6" align="left">
              <h2 class="g-deepblue--text ml-3">{{lecture.getTitle()}}</h2>
            </v-col>

            <v-col class="col-12 col-lg-6">
              <v-row>
                <v-col align="right">
                  <span class="g-deepblue--text mx-2">By: {{lecture.getAuthor()}}</span>
                  <span class="g-deepblue--text mx-2">Date: {{lecture.getDate()}}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="right">
                  <span class="g-deepblue--text mx-2">Views: {{lecture.getViews()}}</span>
                  <span class="g-deepblue--text mx-2">Format: {{lecture.getFormat()}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="lectureType === 'text'">
      <v-col v-for="(lecture, sn) in myTextLectures" :key="sn" align="center">
        <v-card class="my-5 col-11 col-lg-10">
          <v-row>
            <v-col class="col-12 col-lg-6" align="left">
              <h2 class="g-deepblue--text ml-3">{{lecture.getTitle()}}</h2>
            </v-col>

            <v-col class="col-12 col-lg-6">
              <v-row>
                <v-col align="right">
                  <span class="g-deepblue--text mx-2">By: {{lecture.getAuthor()}}</span>
                  <span class="g-deepblue--text mx-2">Date: {{lecture.getDate()}}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="right">
                  <span class="g-deepblue--text mx-2">Views: {{lecture.getViews()}}</span>
                  <span class="g-deepblue--text mx-2">Format: {{lecture.getFormat()}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from '../firebase'
import Lecture from '../classes/Lecture'

export default {
  name: 'g-lecture-list',

  data: () => ({
    myAudioLectures: [],
    myTextLectures: [],
    audioLectures: [],
    textLectures: [],
    lectureType: 'audio'
  }),

  computed: {
    user() {return this.$store.getters.getUserData},
  },

  firestore: {
    audioLectures: db.collection('audiolectures'),
    textLectures: db.collection('textlectures')
  },

  watch: {
    audioLectures() {
      let lectures = []


      this.audioLectures.forEach((item) => {
        let audioLecture = new Lecture()

        Object.assign(audioLecture, JSON.parse(this.$Decrypt(item.data).token))

        if (audioLecture.getAuthor() === this.user.getName()) {
          lectures.push(audioLecture)
        }
      })

      this.myAudioLectures = lectures
    },

    textLectures() {
      let lectures = []

      this.textLectures.forEach((item) => {
        let textLecture = new Lecture()

        Object.assign(textLecture, JSON.parse(this.$Decrypt(item.data).token))

        if (textLecture.getAuthor() === this.user.getName()) {
          lectures.push(textLecture)
        }
      })

      this.myTextLectures = lectures
    }
  }
}
</script>

<style>

</style>