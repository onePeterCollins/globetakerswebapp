<template>
  <div class="g-lecture-viewer social-media-sketch-pattern">
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
                <v-row v-if="display">
                  <v-col v-for="(item, sn) in content" :key="sn" class="col-12">
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

                <v-row v-else>
                  <v-col>
                    <v-dialog v-model="displayLoader" :width="dialogWidth" class="px-0">
                      <v-card class="px-3 py-3">
                        <v-card-title class="alert">Loading lecture</v-card-title>
                        <v-card-text>please wait...</v-card-text>
                          <v-row>
                            <v-col align="center">
                              <v-progress-circular indeterminate />
                            </v-col>
                          </v-row>
                      </v-card>
                    </v-dialog>
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

              <v-row justify="center">
                <v-col class="col-12 mt-12">
                  <h3>Comments</h3>
                </v-col>

                <v-col v-for="(item, sn) in comments" :key="sn" class="col-11 mb-3 g-white" align="left">
                  <v-card v-if="item.userType === 'tutor'" class="g-rose">
                    <h3>{{item.user}}</h3>
                    <p>{{item.comment}}</p>
                    <p>{{item.date}}</p>
                  </v-card>

                  <v-card v-else>
                    <h3>{{item.user}}</h3>
                    <p>{{item.comment}}</p>
                    <p>{{item.date}}</p>
                  </v-card>
                </v-col>

                <v-col v-if="user.getUserType() === 'student'" class="col-11">
                  <v-textarea cols="30" rows="3" :persistent-hint='true' hint="Type your comment or question" placeholder="Comment or question" v-model="comment" />
                </v-col>

                <v-col v-if="user.getUserType() === 'student'" class="col-11">
                  <v-btn @click="postComment()">
                    Post comment
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-col>

                <v-col v-if="user.getUserType() === 'tutor'" class="col-11">
                  <v-textarea cols="30" rows="3" :persistent-hint='true' hint="Type your reply" placeholder="Reply to comment or question" v-model="reply" />
                </v-col>

                <v-col v-if="user.getUserType() === 'tutor'" class="col-11">
                  <v-btn @click="postReply()">
                    Reply
                    <v-icon>mdi-send</v-icon>
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
import {db} from '../firebase'
import {storage} from '../firebase'
import Lecture from '../classes/Lecture'

export default {
  name: 'g-lecture-viewer',

  data: () => ({
    display: false,
    audioLectures: [],
    textLectures: [],
    lecture: null,
    content: [],
    comments: [],
    comment: '',
    reply: ''
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData},
    lectureId() {
      let value = new Lecture()

      value = sessionStorage.getItem('viewLecture') || this.$store.getters.getState.viewLecture

      return value
    },
    lectureType() {
      let value = sessionStorage.getItem('lectureType')

      return value
    },
    date() {return this.$store.getters.getState.dateString()},
    time() {return this.$store.getters.getState.timeString()},
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
    },
    displayLoader() {
      return !this.display
    }
  },

  firestore: {
    audioLectures: db.collection('audiolectures'),
    textLectures: db.collection('textlectures')
  },

  watch: {
    audioLectures() {
      let lecture

      if (this.lectureType === 'Audio') {
        this.audioLectures.forEach ((item) => {
          lecture = JSON.parse(this.$Decrypt(item.data).token)

          if (lecture._id === this.lectureId) {
            this.lecture = new Lecture()
            Object.assign(this.lecture, lecture)
          }
        })
      }
    },

    textLectures() {
      let lecture

      if (this.lectureType === 'Text') {
        this.textLectures.forEach ((item) => {
          lecture = JSON.parse(this.$Decrypt(item.data).token)

          if (lecture._id === this.lectureId) {
            this.lecture = new Lecture()
            Object.assign(this.lecture, lecture)
          }
        })
      }
    },

    lecture() {
      this.loadLecture()
      this.refreshComments()
    }
  },

  methods: {
    goBack() {
      window.history.go(-1)
    },

    refreshComments() {
      this.comments = this.lecture.getQuestions()
    },

    postComment() {
      let ROOT = this,
      comment = {
        type: 'comment',
        user: ROOT.user.getName(),
        comment: ROOT.comment,
        date: ROOT.date + ' ' + ROOT.time
      },
      encryptedData, encryptedToken

      this.lecture.addQuestion(comment)

      encryptedData = ROOT.$Encrypt(JSON.stringify(ROOT.lecture))

      encryptedToken = {data: encryptedData.token}

      this.$Upload(`${ROOT.lecture.getFormat()}lectures`, `${ROOT.lecture._id}`, encryptedToken).then(() => {
        this.comment = ''
      })
    },

    postReply() {
      let ROOT = this,
      comment = {
        type: 'reply',
        user: ROOT.user.getName(),
        userType: ROOT.user.getUserType(),
        comment: ROOT.reply,
        date: ROOT.date + ' ' + ROOT.time
      },
      encryptedData, encryptedToken

      this.lecture.addQuestion(comment)

      encryptedData = ROOT.$Encrypt(JSON.stringify(ROOT.lecture))

      encryptedToken = {data: encryptedData.token}

      this.$Upload(`${ROOT.lecture.getFormat()}lectures`, `${ROOT.lecture._id}`, encryptedToken).then(() => {
        this.reply = ''
      })
    },

    loadLecture() {
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
                ROOT.content[i] = JSON.parse(JSON.stringify(ROOT.lecture._content[i]))
                ROOT.content[i].content = reader.result
                ROOT.display = false
                ROOT.display = true
              }

              reader.readAsDataURL(blob)
            }

            xhr.open('GET', url)
            xhr.send()
          })
        } else {
          ROOT.content[i] = ROOT.lecture._content[i]
          ROOT.display = false
          ROOT.display = true
        }
      }

      (function addViewer () {
        let viewed, encryptedData, encryptedToken

        for (let i in ROOT.lecture.getViewerDetails()) {
          if (ROOT.user.getUserType === 'student') {
            if (ROOT.lecture.getViewerDetails()[i].id === ROOT.user._id) {
              viewed = true
              return
            }
          } else {
            // Trainer views don't count
            viewed = true
          }
        }

        if (!viewed && ROOT.user.getUserType === 'student') {
          let viewerDetails = {id: ROOT.user._id, date: ROOT.date, time: ROOT.time}

          ROOT.lecture.addViewer(viewerDetails)

          ROOT.lecture.addView()

          encryptedData = ROOT.$Encrypt(JSON.stringify(ROOT.lecture))

          encryptedToken = {data: encryptedData.token}

          ROOT.$Upload(`${ROOT.lecture.getFormat()}lectures`, `${ROOT.lecture._id}`, encryptedToken)
        }
      })()
    }
  },
}
</script>

<style>

</style>