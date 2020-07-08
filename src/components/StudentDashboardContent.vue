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
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
  },

  mounted() {
    
  },

  hasAnim: true
}
</script>
