<template>
  <div class="g-dashboard-content">
    <v-row>
      <v-col align="center" class="col-12">
        <h4 class="dosis">Welcome, {{$User.getFirstName()}}</h4>
      </v-col>

      <v-col align="center" class="col-12">
        <h3>What will you like to do?</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col class=col-12>
        <v-row>
          <v-col class="col-lg-6 col-12">
            <transition name="slideYneg">
              <v-card v-show="$keys[0]" class="col-10 col-lg-8 mb-10 center gray">
                <v-row class="g-blue">
                  <v-col align="left">
                    <v-row>
                      <v-col class="col-2" align="right">
                        <v-icon>mdi-book</v-icon>
                      </v-col>
                      
                      <v-col class="col-8" align="center">
                        <h4 class="g-deepblue--text">Take Beginner Course</h4>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col class="col-lg-11 col-12" align="center">
                    <ul class="px-0">
                      <span><i class="g-blue--text darken-5">Get to know the basics;</i></span>

                      <v-col align="left" class="px-5 g-deepblue--text">
                        <li>Mindset paradigm shift (PT 1)</li>
                        <li>Mindset paradigm shift (PT 2)</li>
                        <li>Basic orientation uplines need to give downlines</li>
                      </v-col>
                    </ul>
                  </v-col>
                  <v-col class="col-12" align="center">
                    <v-scale-transition>
                      <v-btn v-show="$keys[2]" class="success" link to="student-dashboard/learning-option">Continue</v-btn>
                    </v-scale-transition>
                  </v-col>
                </v-row>
              </v-card>
            </transition>
          </v-col>

          <v-col class="col-lg-6 col-12">
            <transition name="slideYneg">
              <v-card v-show="$keys[1]" class="col-10 col-lg-8 mb-10 center gray">
                <v-row class="g-rose">
                  <v-col align="left">
                    <v-row>
                      <v-col class="col-2" align="right">
                        <v-icon>mdi-video</v-icon>
                      </v-col>
                      
                      <v-col class="col-8" align="center">
                        <h4 class="g-deepblue--text">Join interactive forum</h4>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col class="col-lg-11 col-12" align="center">
                    <ul class="px-0">
                      <span><i class="g-rose--text">Watch live lecture sessions;</i></span>

                      <v-col class="px-5 g-deepblue--text" align="left">
                        <li>Interact with the trainer</li>
                        <li>Ask your questions</li>
                        <li>Watch previous lecture videos</li>
                      </v-col>
                    </ul>
                  </v-col>
                  <v-col class="col-12" align="center">
                    <v-scale-transition>
                      <v-btn v-show="$keys[3]" class="success" link to="student-dashboard/interactive-forum">Continue</v-btn>
                    </v-scale-transition>
                  </v-col>
                </v-row>
              </v-card>
            </transition>
          </v-col>
        </v-row>
      </v-col> 
      

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
    user() {return this.$store.getters.getUserData}
  },

  watch: {
    user() {
      if (this.user) {
        this.$User = this.user
        this.$forceUpdate()
      }
    }
  },

  mounted() {
    this.$User = this.user
    this.$forceUpdate()
  },

  hasAnim: true
}
</script>
