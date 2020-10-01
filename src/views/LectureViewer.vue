<template>
  <div v-if="display" class="g-lecture-viewer social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">{{lecture._title}}</h2>
      </v-col>
    </v-row>

    <br />

    <v-row>
      <v-col align="center">
        <v-card class="col-11 col-lg-10">
          <v-row v-if="!mobile">
            <v-col class="g-blue col-6 px-5" align="left">
              <h2 v-if="lecture._title !== ''" class="g-deepblue--text">Title: {{lecture.getTitle()}}</h2>
              <h3 v-if="lecture._author !== ''" class="g-deepblue--text">By: {{lecture.getAuthor()}}</h3>
            </v-col>

            <v-col class="g-blue col-6 px-5" align="right">
              <h4 v-if="lecture._date !== ''" class="g-deepblue--text">Date: {{lecture.getDate()}}</h4>
            </v-col>
          </v-row>

          <v-row v-if="mobile">
            <v-col class="g-blue px-3" align="left">
              <h2 v-if="lecture._title !== ''" class="g-deepblue--text">Title: {{lecture.getTitle()}}</h2>
              <h3 v-if="lecture._author !== ''" class="g-deepblue--text">By: {{lecture.getAuthor()}}</h3>
              <h4 v-if="lecture._date !== ''" class="g-deepblue--text">Date: {{lecture.getDate()}}</h4>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="col-12" align="center">
              <v-card class="col-12">
                <v-row>
                  <v-col v-for="(item, sn) in lecture.getContent()" :key="sn" class="col-12">
                    <p v-if="item.type === 'text'" class="g-deepblue--text dosis px-5" align="left">{{item.content}}</p>
                    
                    <v-tooltip top>
                      <template v-slot:activator="{on, attr}">
                        <v-img v-on="on" v-bind="attr" v-if="item.type === 'image' && !mobile" class="mt-12 g-white"
                          height="500"
                          width="500"
                          contain
                          :src="item.content"
                          :alt="item.alt" />

                        <v-img v-on="on" v-bind="attr" v-if="item.type === 'image' && mobile" class="mt-12 g-white"
                          height="300"
                          width="300"
                          contain
                          :src="item.content"
                          :alt="item.alt" />
                      </template>

                      <span>{{item.alt}}</span>
                    </v-tooltip>

                    <p v-if="item.type === 'image'" class="g-deepblue--text dosis">Image title: {{item.title}}</p>

                    <audio v-if="item.type === 'audio'" controls>
                      <source :src="item.content" :type="`audio/${item.format}`">
                      Your browser does not support the audio tag.
                    </audio>
                  </v-col>
                </v-row>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn @click="goBack()" class="g-blue">
                    Back
                  </v-btn>
                </v-col>

              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import {storage} from '../firebase'
import Lecture from '../classes/Lecture'

export default {
  name: 'g-lecture-viewer',

  data: () => ({
    display: false
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},
    lecture() {
      let value = new Lecture()

      this.$store.getters.getState.viewLecture._id
      ? value = this.$store.getters.getState.viewLecture
      : value = Object.assign(value, JSON.parse(sessionStorage.getItem('viewLecture')))

      return value
    },
    date() {return this.$store.getters.getState.dateString()},
    time() {return this.$store.getters.getState.timeString()}
  },

  methods: {
    goBack() {
      window.history.go(-1)
    }
  },

  mounted() {
    let ROOT = this

    for (let i in this.lecture.getContent()) {
      if (this.lecture.getContent()[i].type !== 'text') {
        storage.child(this.lecture.getContent()[i].content).getDownloadURL().then((url) => {
          let xhr = new XMLHttpRequest()

          xhr.responseType = 'blob'

          xhr.onload = function() {
            let blob = xhr.response,
            reader = new FileReader()

            reader.onload = () => {
              ROOT.lecture._content[i].content = reader.result
              ROOT.$store.dispatch('setValue', {name: 'viewLecture', newVal: ROOT.lecture})
              ROOT.display = true
            }

            reader.readAsDataURL(blob)
          }

          xhr.open('GET', url)
          xhr.send()
        })
      }
    }

    (function addViewer () {
      let viewed, encryptedData, encryptedToken

      for (let i in this.lecture.getViewerDetails()) {
        if (this.user.getUserType === 'student') {
          if (this.lecture.getViewerDetails()[i].id === this.user._id) {
            return
          }
        }
      }

      if (!viewed) {
        let viewerDetails = {id: ROOT.user._id, date: ROOT.date, time: ROOT.time}

        this.lecture.addViewer(viewerDetails)

        encryptedData = this.$Encrypt(JSON.stringify(this.lecture))

        encryptedToken = {data: encryptedData.token}

        this.$Upload(`${this.lecture.getFormat()}lectures`, `${this.lecture._id}`, encryptedToken)
      }
    })
    
  }
}
</script>

<style>

</style>