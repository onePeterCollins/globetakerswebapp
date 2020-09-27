<template>
  <div class="g-lecture-viewer">
    <v-row class="g-cream">
      <v-col>
        <h3 align="center">{{lectureType}} lectures</h3>
      </v-col>
    </v-row>

    <v-row class="g-deepblue">
      <v-col align="center">
        <v-btn v-if="lectureType === 'Text'" @click="lectureType = 'Audio'">
          Audio Lectures
        </v-btn>

        <v-btn v-else @click="lectureType = 'Audio'" class="g-white g-darkblue--text">
          Audio Lectures
        </v-btn>
      </v-col>

      <v-col align="center">
        <v-btn v-if="lectureType === 'Audio'" @click="lectureType = 'Text'">
          Text Lectures
        </v-btn>

        <v-btn v-else @click="lectureType = 'Text'" class="g-white g-darkblue--text">
          Text Lectures
        </v-btn>
      </v-col>
    </v-row>

    <br />
    <br />
    <br />
    <br />

    <v-row v-if="lectureType === 'Audio'">
      <v-col v-for="(lecture, sn) in myAudioLectures" :key="sn" class="col-12" align="center">
        <v-card class="my-5 col-11 col-lg-10">
          <v-row>
            <v-col class="col-12 col-lg-6" align="left">
              <h2 class="g-deepblue--text ml-3">{{lecture.getTitle()}}</h2>
              <v-row>
                <v-col class="ml-3">
                  <v-btn @click="edit(sn)" class="mx-2">
                    <v-icon>mdi-pen</v-icon>
                    Edit
                  </v-btn>

                  <v-btn @click="comment(sn)" class="mx-2">
                    <v-icon>mdi-message</v-icon>
                    Comment
                  </v-btn>

                  <v-btn @click="deleteLecture(sn)" class="mx-2">
                    <v-icon>mdi-cancel</v-icon>
                    Delete
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="col-12 col-lg-6">
              <v-row>
                <v-col align="right">
                  <span class="g-deepblue--text round gray px-2 mx-3">By: {{lecture.getAuthor()}}</span>
                  <span class="g-deepblue--text round gray px-2 mx-3">Posted: {{lecture.getDate()}}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="right">
                  <span v-if="lecture._approved" class="green--text mx-3" align="left">Approved</span>
                  <span v-else class="red--text mx-3" align="left">Not Approved</span>

                  <span class="g-deepblue--text round gray px-2 mx-3">Views: {{lecture.getViews()}}</span>
                  <span class="g-deepblue--text round gray px-2 mx-3">Format: <v-icon class="mx-2">mdi-headset</v-icon>{{lecture.getFormat()}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="lectureType === 'Text'">
      <v-col v-for="(lecture, sn) in myTextLectures" :key="sn" align="center" class="col-12">
        <v-card class="my-5 col-11 col-lg-10">
          <v-row>
            <v-col class="col-12 col-lg-6" align="left">
              <h2 class="g-deepblue--text ml-3">{{lecture.getTitle()}}</h2>
              <v-row>
                <v-col class="ml-3">
                  <v-btn @click="edit(sn)" class="mx-2">
                    <v-icon>mdi-pen</v-icon>
                    Edit
                  </v-btn>

                  <v-btn @click="comment(sn)" class="mx-2">
                    <v-icon>mdi-message</v-icon>
                    Comment
                  </v-btn>

                  <v-btn @click="deleteLecture(sn)" class="mx-2">
                    <v-icon>mdi-cancel</v-icon>
                    Delete
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="col-12 col-lg-6">
              <v-row>
                <v-col align="right">
                  <span class="g-deepblue--text round gray px-2 mx-3">By: {{lecture.getAuthor()}}</span>
                  <span class="g-deepblue--text round gray px-2 mx-3">Posted: {{lecture.getDate()}}</span>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="right">
                  <span v-if="lecture._approved" class="green--text mx-3" align="left">Approved</span>
                  <span v-else class="red--text mx-3" align="left">Not Approved</span>

                  <span class="g-deepblue--text round gray px-2 mx-3">Views: {{lecture.getViews()}}</span>
                  <span class="g-deepblue--text round gray px-2 mx-3">Format: <v-icon class="mx-2">mdi-text</v-icon>{{lecture.getFormat()}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-dialog persistent v-model="deleteDialog" :width="dialogWidth">
          <v-card class="px-3 py-3">
            <v-card-title>Alert</v-card-title>
            <v-card-text>Are you sure you want to delete this lecture?</v-card-text>

            <v-row>
              <v-col class="mx-5">
                <v-btn @click="deleteLecture(lectureIndex)">
                  Delete
                </v-btn>
              </v-col>

              <v-col class="mx-5" align="right">
                <v-btn @click="deleteDialog = false">
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
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
import {db} from '../firebase'
import {storage} from '../firebase'
import Lecture from '../classes/Lecture'

export default {
  name: 'g-lecture-list',

  data: () => ({
    myAudioLectures: [],
    myTextLectures: [],
    audioLectures: [],
    textLectures: [],
    lectureType: 'Audio',
    lectureIndex: null,
    deleteDialog: false,
    alertMessage: 'hi'
  }),

  computed: {
    user() {return this.$store.getters.getUserData},
    dialogWidth() {
      let value

      if (window.innerWidth >= 1264) {
        value = '30vw'
      } else if (window.innerWidth < 1264 &&  window.innerWidth >= 960) {
        value = '50vw'
      } else {
        value = '90vw'
      }

      return value
    }
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
  },

  methods: {
    edit(index) {
      if (this.lectureType === 'Audio') {
        sessionStorage.setItem('editLecture', this.myAudioLectures[index])
      } else if (this.lectureType === 'Text') {
        sessionStorage.setItem('editLecture', this.myTextLectures[index])
      }
    },

    comment(index) {
      if (this.lectureType === 'Audio') {
        sessionStorage.setItem('editLecture', this.myAudioLectures[index])
      } else if (this.lectureType === 'Text') {
        sessionStorage.setItem('editLecture', this.myTextLectures[index])
      }
    },

    deleteLecture(index) {
      if (!this.deleteDialog) {
        this.lectureIndex = index
        this.deleteDialog = !this.deleteDialog
      } else {
        if (this.lectureType === 'Audio') {
          for (let i in this.myAudioLectures[index].getContent()) {
            let ref = storage.child(this.myAudioLectures[index].getContent()[i].content)

            ref.delete().then(() => {
              db.collection('audiolectures').doc(`${this.myAudioLectures[index]._id}`).delete().then(() => {
                this.deleteDialog = false
                this.alertMessage = 'Lecture successfully deleted!'
                this.lectureIndex = null
              })
            })
          }
        } else if (this.lectureType === 'Text') {
          for (let i in this.myTextLectures[index].getContent()) {
            if (this.myTextLectures[index].getContent()[i].type === 'image') {
              let ref = storage.child(this.myTextLectures[index].getContent()[i].content)

              ref.delete().then(() => {
                db.collection('textlectures').doc(`${this.myTextLectures[index]._id}`).delete().then(() => {
                  this.deleteDialog = false
                  this.alertMessage = 'Lecture successfully deleted!'
                  this.lectureIndex = null
                })
              })
            }
          }
        }
      }
    }
  }
}
</script>

<style>

</style>