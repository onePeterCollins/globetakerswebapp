<template>
  <div class="GT-S-dashboard">
    <v-row>
      <v-col align="center">
        <h3>Welcome <span>{Username}</span></h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <h2>What would you like to do?</h2>
      </v-col>
    </v-row>

    <v-row>
      <transition name="slideYneg">
        <v-card v-show="animate" class="col-10 col-lg-4 mb-5 center gray">
          <v-row class="yellow">
            <v-col align="center">
              <h4><span class="green--text">(free)</span> Beginner Course</h4>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="col-lg-11 col-12" align="center">
              <ul>
                <span><i class="green--text">Get to know the basics;</i></span>
                <li align="left">Mindset paradigm shift (PT 1)</li>
                <li align="left">Mindset paradigm shift (PT 2)</li>
                <li align="left">Basic orientation uplines need to give downlines</li>
              </ul>
            </v-col>
            <v-col class="col-12" align="center">
              <p class="white"><i>6 lectures</i></p>
              <v-scale-transition>
                <v-btn v-show="anim[1]" class="success" link to="student-dashboard/learning-option">Continue</v-btn>
              </v-scale-transition>
            </v-col>
          </v-row>
        </v-card>
      </transition>

      <br/>

      <transition name="slideYneg">
        <v-card v-show="anim[1]" class="col-10 col-lg-4 mb-5 center gray">
          <v-row class="purple lighten-2">
            <v-col align="center">
              <h4><span class="yellow--text">(paid)</span> Advanced Course</h4>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="col-lg-11 col-12" align="center">
              <ul>
                <span><i class="green--text">Get exclusive business insights;</i></span>
                <li align="left">Teamwork, the right strategy for MLM</li>
                <li align="left">Cotinual improvement, the leaders favourite</li>
                <li align="left">The 21st century business: pros &amp; cons</li>
              </ul>
            </v-col>

            <v-col class="col-12" align="center">
              <p class="white"><i>4 lectures</i></p>
              <v-scale-transition>
                <v-btn v-show="anim[2]" class="success" link :to="advancedCourseAccess">Continue</v-btn>
              </v-scale-transition>
            </v-col>
          </v-row>
        </v-card>
      </transition>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br v-if="!mobile"/>
        
    <g-student-counter />
  </div>
</template>

<script>
export default {
  name: 'Student-dashboard',

  data: () => ({
    animate: '',
    anim: []
  }),

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    },

    userType () {
      return this.$store.getters.getUserData.type
    },

    advancedCourseAccess () {
      let value

      this.userType === 'trainer'
      ? value = 'student-dashboard/learning-option'
      : value = 'student-dashboard/course-access-denied'

      return value
    }
  },

  watch: {
    animate() {
      let ROOT = this;

      (function anim() {
        if (ROOT.anim[2]) {
          clearTimeout(anim, 300)
        } else {
          ROOT.anim.push(true)
          setTimeout(anim, 300)
        }
      })()
    }
  },

  mounted() {
    this.animate = true

    if (this.userType !== 'trainer') {
      let userType = {name: 'user', newVal: 'student', child: ['type']}

      this.$store.dispatch('setValue', userType)
    }
  }
}
</script>

<style>

</style>