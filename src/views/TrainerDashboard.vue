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

    <br/>

    <v-row>
      <transition name="slideYneg">
        <v-card v-show="animate" class="col-10 col-lg-4 mb-5 center gray">
          <v-row class="blue lighten-2">
            <v-col align="center">
              <h4>Teach a Course</h4>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="col-lg-11 col-12" align="center">
              <ul>
                <span><i class="green--text">Provide study material for students;</i></span>
                <li align="left">Create and modify lecture content</li>
                <li align="left">Upload and link a lecture video</li>
                <li align="left">Answer questions asked by students</li>
              </ul>
            </v-col>

            <v-col class="col-12" align="center">
              <v-scale-transition>
                <v-btn v-show="anim[1]" class="success" link to="student-dashboard/course-access-denied">Continue</v-btn>
              </v-scale-transition>
            </v-col>
          </v-row>
        </v-card>
      </transition>

      <br/>

      <transition name="slideYneg">
        <v-card v-show="anim[1]" class="col-10 col-lg-4 mb-5 center gray">
          <v-row class="pink lighten-3">
            <v-col align="center">
              <h4>Take a Refresher Course</h4>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col class="col-lg-11 col-12" align="center">
              <ul>
                <span><i class="green--text">Explore the lectures section;</i></span>
                <li align="left">View a new or existing course</li>
                <li align="left">Redo any course of your choice</li>
                <li align="left">Gain access to advanced courses</li>
              </ul>
            </v-col>
            <v-col class="col-12" align="center">
              <v-scale-transition>
                <v-btn v-show="anim[2]" class="success" link to="student-dashboard">Continue</v-btn>
              </v-scale-transition>
            </v-col>
          </v-row>
        </v-card>
      </transition>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>
    <br v-if="!mobile" />
        
    <g-student-counter />
  </div>
</template>

<script>
export default {
  name: 'Trainer-dashboard',

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
    let userType = {name: 'user', newVal: 'trainer', child: ['type']}

    this.$store.dispatch('setValue', userType)

    this.animate = true
  }
}
</script>
