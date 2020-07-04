<template>
  <div class="g-dashboard-content">
    <v-row>
      <v-col align="center">
        <h3>Welcome {{$User.getFirstName()}}</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <h2>What would you like to do?</h2>
      </v-col>
    </v-row>

    <v-row>
      <transition name="slideYneg">
        <v-card v-show="$keys[0]" class="col-10 col-lg-4 mb-5 center gray">
          <v-row class="yellow">
            <v-col align="center">
              <h4>Take Beginner Course</h4>
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
                <v-btn v-show="$keys[2]" class="success" link to="student-dashboard/learning-option">Continue</v-btn>
              </v-scale-transition>
            </v-col>
          </v-row>
        </v-card>
      </transition>

      <br/>

      <!-- <transition name="slideYneg">
        <v-card v-show="$keys[1]" class="col-10 col-lg-4 mb-5 center gray">
          <v-row class="purple lighten-2">
            <v-col align="center">
              <h4 class="white--text"><span class="yellow--text">(paid)</span> Advanced Course</h4>
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
                <v-btn v-show="$keys[3]" class="success" link to="student-dashboard/learning-option">Continue</v-btn>
              </v-scale-transition>
            </v-col>
          </v-row>
        </v-card>
      </transition> -->
    </v-row>

    <br/>
    <br/>
    <br/>
    <br v-if="!mobile"/>
  </div>
</template>

<script>
export default {
  name: 'g-student-dashboard-content',

  data: () => ({
    anim: {
      delay: 100,
      limit: 4
    }
  }),

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    }
  },

  mounted() {
    
  },

  hasAnim: true
}
</script>
