<template>
  <div class="upload-lesson social-media-sketch-pattern">
    <transition name="slideYpos">
      <v-row v-if="$keys[0]" class="yellow">
        <v-col>
          <h3 align="center">Upload your {{lectureType}} lecture</h3>
        </v-col>
      </v-row>
    </transition>

      <br/>
      <br/>
      <br v-if="mobile"/>
      <br v-if="mobile"/>
      <br v-if="mobile"/>
      <br v-if="mobile"/>

      <v-row>
        <v-col>
          <v-carousel-transition>
            <form v-if="lectureType && lectureType === 'audio'" class="col-lg-5 col-11  green lighten-4 lesson-upload-form">
              <v-row justify="center">
                <v-fade-transition>
                  <h3  v-if="$keys[0]" class="form-title"><v-icon class="green--text">mdi-upload</v-icon> NEW AUDIO LESSON</h3>
                </v-fade-transition>
              </v-row>

              <v-row justify="center">
                <v-col class="col-12">
                  <v-fade-transition>
                    <v-text-field v-if="$keys[1]" prepend-icon="mdi-pen" hint="lecture title" label="lecture title" v-model="title" @input="setTitle()"/>
                  </v-fade-transition>
                </v-col>
              </v-row>

              <v-scale-transition>
                <v-row>
                  <v-col>
                    <v-btn @click="addAudio(contentType.audio)">
                      <v-icon class="green--text">mdi-plus</v-icon>
                      add audio file
                    </v-btn>
                  </v-col>
                </v-row>
              </v-scale-transition>

              <v-scale-transition v-for="(item, sn) in content" :key="sn">
                <v-row>
                  <v-col v-if="item.type === 'audio'">
                    <v-col align="right">
                      <v-btn x-small right fab top class="red" @click="removeAudio(sn)">
                        <v-icon class="white--text">mdi-close</v-icon>
                      </v-btn>
                    </v-col>

                    

                    <v-file-input 
                    background-color="white"
                    label="select audio file"
                    v-model="item.audioFile" @change="setAudioContent(item, sn)"/>

                    <b>(4 minutes max)</b>

                    <audio v-if="item.content" controls>
                      <source :src="item.content" type="audio/mp3">
                      Your browser does not support the audio tag.
                    </audio>
                  </v-col>
                </v-row>
              </v-scale-transition>

              <transition name="slideYneg">
                <v-row v-if="$keys[3]">
                  <span>
                    <b id="verify-lecture"></b>
                  </span>
                </v-row>
              </transition>

              <v-row>
                <v-col align="center">
                  <p v-if='networkMessage.success'><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
                  <p v-if='networkMessage.processing' class='g-deepblue--text'>
                    <v-progress-circular :rotate="-90" :value="uploadProgress">{{uploadProgress}}%</v-progress-circular>

                    Sending...
                  </p>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="center">
                  <h3 v-if='errorMessage'><h2>{{emoji.emojify(':warning:')}}</h2> {{`${ errorMessage}`}}</h3>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-scale-transition>
                  <v-btn v-if="$keys[4]" class="cyan mt-5" @click="send()">
                    <v-icon class="green--text">mdi-upload</v-icon> upload
                  </v-btn>
                </v-scale-transition>
              </v-row>
            </form>
          </v-carousel-transition>

          <!-- TEXT LECTURE FORM -->
          <v-carousel-transition>
            <v-form v-if="lectureType && lectureType === 'text'" class="col-lg-8 col-11  green lighten-4 lesson-upload-form">
              <v-row justify="center">
                <v-fade-transition>
                  <h3  v-if="$keys[0]" class="form-title"><v-icon class="green--text">mdi-upload</v-icon> NEW TEXT LESSON</h3>
                </v-fade-transition>
              </v-row>

              <v-row justify="center">
                <v-col class="col-12">
                  <v-fade-transition>
                    <v-text-field v-if="$keys[1]" prepend-icon="mdi-pen" hint="lecture title" label="lecture title" v-model="title" @input="setTitle()"/>
                  </v-fade-transition>
                </v-col>
              </v-row>

              <v-scale-transition>
                <v-row>
                  <v-col v-if="!mobile" align="center">
                    <v-btn @click="addText(contentType.text)" class="mx-2">
                      <v-icon class="green--text">mdi-plus</v-icon>
                      add paragraph
                    </v-btn>

                    <v-btn @click="addImage(contentType.image)" class="mx-2">
                      <v-icon class="green--text">mdi-plus</v-icon>
                      add image
                    </v-btn>
                  </v-col>

                  <v-col v-if="mobile" align="center">
                    <v-btn @click="addText(contentType.text)" class="mx-2">
                      <v-icon class="green--text">mdi-plus</v-icon>
                      add paragraph
                    </v-btn>
                  </v-col>

                  <v-col v-if="mobile" align="center">
                    <v-btn @click="addImage(contentType.image)" class="mx-2">
                      <v-icon class="green--text">mdi-plus</v-icon>
                      add image
                    </v-btn>
                  </v-col>
                </v-row>
              </v-scale-transition>

              <v-scale-transition v-for="(item, sn) in content" :key="sn">
                <v-row>
                  <v-col v-if="item.type === 'text'">
                    <v-col align="right">
                      <v-btn x-small right fab top class="red" @click="removeText(sn)">
                        <v-icon class="white--text">mdi-close</v-icon>
                      </v-btn>
                    </v-col>

                    <v-textarea class="mx-1 mx-lg-5" prepend-icon="mdi-text" rows="3" label="Type paragraph text" v-model="item.content" />
                  </v-col>

                  <v-col v-if="item.type === 'image'">
                    <v-col align="right">
                      <v-btn x-small right fab top class="red" @click="removeImage(sn)">
                        <v-icon class="white--text">mdi-close</v-icon>
                      </v-btn>
                    </v-col>

                    <v-file-input 
                    background-color="white"
                    label="select image file"
                    v-model="item.imageFile" @change="setImageContent(item, sn)"/>

                    <v-row>
                      <v-col align="center">
                        <v-img v-if="item.content" :src="item.content" height="300" width="300" contain />
                      </v-col>
                    </v-row>
                    
                    <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter image title" height="30" v-model="item.title" />
                    <v-text-field class="mx-1 mx-lg-5" prepend-icon="mdi-text" label="Enter image description" height="30" v-model="item.alt" />
                  </v-col>
                </v-row>
              </v-scale-transition>

              <v-scale-transition v-for="(item, sn) in content" :key="sn">
                
              </v-scale-transition>

              <transition name="slideYneg">
                <v-row v-if="$keys[3]">
                  <span>
                    <b id="verify-lecture"></b>
                  </span>
                </v-row>
              </transition>

              <v-row>
                <v-col align="center">
                  <p v-if='networkMessage.success'><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
                  <p v-if='networkMessage.processing' class='g-deepblue--text'>
                    <v-progress-circular :rotate="-90" :value="uploadProgress">{{uploadProgress}}%</v-progress-circular>

                    Sending...
                  </p>
                </v-col>
              </v-row>

              <v-row>
                <v-col align="center">
                  <h3 v-if='errorMessage'><h2>{{emoji.emojify(':warning:')}}</h2> {{`${ errorMessage}`}}</h3>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-scale-transition>
                  <v-btn v-if="$keys[4]" class="cyan mt-5" @click="send()">
                    <v-icon class="green--text">mdi-upload</v-icon> upload
                  </v-btn>
                </v-scale-transition>
              </v-row>
            </v-form>
          </v-carousel-transition>
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
import Lecture from '../classes/Lecture'
import firebase from 'firebase'
import {storage} from '../firebase'

export default {
    name: 'g-upload-lesson',

    data: () => ({
      title: '',
      lecture: new Lecture(),
      networkMessage: {
        processing: null,
        success: null
      },
      errorMessage: null,
      recaptchaVerifierRendered: false,
      verificationCode: '',
      uploadProgress: 0,
      content: [],

      contentType: {
        audio: {
          type: 'audio',
          audioFile: null,
          format: '',
          content: null
        },

        text: {
          type: 'text',
          content: ''
        },

        image: {
          type: 'image',
          imageFile: null,
          format: '',
          content: null,
          title: '',
          alt: ''
        },
      }
    }),

    computed: {
      mobile: () => {
        let value

        window.innerWidth < 1024
        ? value = true
        : value = false

        return value
      },

      lectureType () {
        return this.$store.getters.getState.createLecture || sessionStorage.getItem('lectureType')
      },
      date() {return this.$store.getters.getState.dateString()},
      serialNumber() {
        let value, date = new Date(), year, month, day

        year = date.getUTCFullYear()
        month = date.getUTCMonth()
        day = date.getUTCDate()

        value = parseInt(`${year}${month}${day}`)

        return value
      },
      user() {return this.$store.getters.getUserData},
    },

    methods: {
      setTitle() {
        this.lecture.setTitle(this.title)
      },

      addAudio(item) {
        let value = JSON.parse(JSON.stringify(item))
        this.content.push(value)
      },

      addText(item) {
        let value = JSON.parse(JSON.stringify(item))
        this.content.push(value)
      },

      addImage(item) {
        let value = JSON.parse(JSON.stringify(item))
        this.content.push(value)
      },

      removeAudio(sn) {
        this.content.splice(sn, 1)
      },

      removeText(sn) {
        this.content.splice(sn, 1)
      },

      removeImage(sn) {
        this.content.splice(sn, 1)
      },

      setImageContent(item, sn) {
        this.content[sn].content = this.processImage(item.imageFile, sn)
      },

      processImage(item, sn) {
        let reader = new FileReader()

        reader.onload = () => {
          this.content[sn].content = reader.result
        }

        reader.readAsDataURL(item)
      },

      setAudioContent(item, sn) {
        this.content[sn].content = this.processAudio(item.audioFile, sn)
      },

      processAudio(item, sn) {
        let reader = new FileReader()

        reader.onload = () => {
          this.content[sn].content = reader.result
        }

        reader.readAsDataURL(item)
      },

      send() {
        let lecture

        if (!this.recaptchaVerifierRendered && this.verificationCode === '') {
          // display recaptcha challenge
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('verify-lecture', {
            'callback': (response) => {
              this.verificationCode = response
              this.send()
            },
            'expired-callback': () => {
              // Response expired.
              null
            }
          })

          window.recaptchaVerifier.render()
          this.recaptchaVerifierRendered = true
        }

        if (this.recaptchaVerifierRendered && this.verificationCode !== '') {
          this.networkMessage.processing = true

          if (this.title === '') {
            this.errorMessage = "Enter lecture title"
            this.networkMessage.processing = false
            return
          }

          // set title
          this.lecture.setTitle(this.title)

          // set author
          this.lecture.setAuthor(this.user.getName())

          // set id
          this.lecture._id = `${this.title}${this.generateId()}`

          // set date
          this.lecture.setDate(this.date)

          // set serial number (for sorting)
          this.lecture._sn = this.serialNumber

          // upload all audio and image files
          for (let i in this.content) {
            if (this.content[i].type === 'audio') {
              let format = this.getFileExtension(this.content[i].audioFile.name),
              storageRef = storage.child(`audioLectures/${this.lecture._id}${i}.${format}`),
              upload = storageRef.putString(this.content[i].content, 'data_url')
              
              upload.then(() => {
                this.content[i].content = ''
                this.content[i].format = format
                this.content[i].content = `audioLectures/${this.lecture._id}${i}.${format}`
                this.content[i].audioFile = null
              }).then(() => {
                // set content
                this.lecture._content = this.content

                // encrypt lecture
                lecture = {data: this.$Encrypt(JSON.stringify(this.lecture)).token}

                // upload lecture
                this.$Upload(`${this.lecture.getFormat()}lectures`, `${this.lecture._id}`, lecture).then(() => {
                  this.networkMessage.processing = false
                  this.networkMessage.success = 'Lecture uploaded'
                  // clear lecture
                  this.clear()
                  window.history.go(-1)
                })
              })

              let ROOT = this

              upload.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                ROOT.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              })
            } else if (this.content[i].type === 'image') {
              let format = this.getFileExtension(this.content[i].imageFile.name),
              storageRef = storage.child(`lectureImages/${this.lecture._id}${i}.${format}`),
              upload = storageRef.putString(this.content[i].content, 'data_url')

              upload.then(() => {
                this.content[i].content = ''
                this.content[i].format = format
                this.content[i].content = `lectureImages/${this.lecture._id}${i}.${format}`
                this.content[i].imageFile = null
              }).then(() => {
                // set content
                this.lecture._content = this.content

                // encrypt lecture
                lecture = {data: this.$Encrypt(JSON.stringify(this.lecture)).token}

                // upload lecture
                this.$Upload(`${this.lecture.getFormat()}lectures`, `${this.lecture._id}`, lecture).then(() => {
                  this.networkMessage.processing = false
                  this.networkMessage.success = 'Lecture uploaded'
                  // clear lecture
                  this.clear()
                  window.history.go(-1)
                })
              })

              let ROOT = this

              upload.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                ROOT.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              })
            }
          }
        }
      },

      generateId() {
        let charCode,
        value = ''

        for (let i=0; i<12; i++) {
          charCode = Math.floor(Math.random() * 10)
          value += charCode.toString()
        }

        return value
      },

      getFileExtension(fileName) {
        let nameString = fileName.split('').reverse(), extension = '', stop = false

        nameString.forEach((item) => {
          if (item !== '.' && !stop) {
            extension += item
          } else {
            stop = true
          }
        })

        return extension.split('').reverse().join('')
      },

      clear() {
        this.title = ''
        this.lecture = new Lecture()
      }
    },

    mounted() {
      if (this.lectureType === 'audio') {
        sessionStorage.removeItem('lectureType')
        sessionStorage.setItem('lectureType', 'audio')
        this.lecture.setFormat(1)
        this.content.push(JSON.parse(JSON.stringify(this.contentType.audio)))
      } else {
        sessionStorage.removeItem('lectureType')
        sessionStorage.setItem('lectureType', 'text')
        this.lecture.setFormat(0)
        this.content.push(JSON.parse(JSON.stringify(this.contentType.text)))
      }
    },

    hasAnim: true

}
</script>

<style>
.lesson-upload-form {
    margin-left: auto;
    margin-right: auto
}
</style>
