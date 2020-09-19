<template>
  <div class="g-dashboard-content">
    <v-row class="g-cream">
      <v-col align="center" class="col-12">
        <h2 class="g-deepblue--text dosis">Welcome, {{$User.getFirstName()}}</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center" class="col-12">
        <h3 class="g-deepblue--text">What will you like to do?</h3>
      </v-col>
    </v-row>

    <br/>
    <br v-if="!mobile"/>
    <br v-if="!mobile"/>

    <v-row>
      <v-col class=col-12>
        <v-row>
          <v-col class="col-lg-6 col-12">
            <transition name="slideYneg">
              <v-card v-show="$keys[0]" class="col-10 col-lg-8 mb-10 center gray">
                <v-row class="g-rose">
                  <v-col align="left">
                    <v-row>
                      <v-col class="col-2" align="right">
                        <v-icon>mdi-account-tie</v-icon>
                      </v-col>
                      
                      <v-col class="col-8" align="center">
                        <h4 class="g-deepblue--text">Teach a Course</h4>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col class="col-lg-11 col-12" align="center">
                    <ul class="px-0">
                      <span><i class="g-rose--text">Create study material for students;</i></span>

                      <v-col class="px-5 g-deepblue--text" align="left">
                        <li>Create and modify lecture content</li>
                        <li>Upload an audio recorded lecture</li>
                        <li>Interact with the students</li>
                      </v-col>
                    </ul>
                  </v-col>
                  <v-col class="col-12" align="center">
                    <v-scale-transition>
                      <v-btn v-show="$keys[2]" class="success" link to="trainer-dashboard/lesson-option">Continue</v-btn>
                    </v-scale-transition>
                  </v-col>
                </v-row>
              </v-card>
            </transition>
          </v-col>


          <v-col class="col-lg-6 col-12">
            <transition name="slideYneg">
              <v-card v-show="$keys[1]" class="col-10 col-lg-8 mb-10 center gray">
                <v-row class="g-blue">
                  <v-col align="left">
                    <v-row>
                      <v-col class="col-2" align="right">
                        <v-icon>mdi-refresh</v-icon>
                      </v-col>
                      
                      <v-col class="col-8" align="center">
                        <h4 class="g-deepblue--text">Take refresher Course</h4>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col class="col-lg-11 col-12" align="center">
                    <ul class="px-0">
                      <span><i class="g-blue--text darken-5">Explore the student section;</i></span>

                      <v-col align="left" class="px-5 g-deepblue--text">
                        <li>View a new or existing course</li>
                        <li>Join the interactive video forum</li>
                        <li>Redo any course of your choice</li>
                      </v-col>
                    </ul>
                  </v-col>
                  <v-col class="col-12" align="center">
                    <v-scale-transition>
                      <v-btn v-show="$keys[3]" class="success" link to="student-dashboard">Continue</v-btn>
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
    <br v-if="!mobile"/>
    <br v-if="!mobile"/>
    <br v-if="!mobile"/>
  </div>
</template>

<script>
export default {
  name: 'g-trainer-dashboard-content',

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
