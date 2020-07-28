<template>
  <div class="about g-white">
    <v-row class="yellow">
      <v-col align="center">
        <h2>Profile Setup</h2>
      </v-col>
    </v-row>

    <br/>

    <v-card class="col-11 col-lg-10 px-0 pt-0 center g-deepblue--text" align="center">
      <v-card-title class="g-blue" align="center">
        <!-- <v-col align="center"> -->
          <!-- <h3> -->
          {{$User.getFirstName()}} Please provide the following information
          <!-- </h3> -->
        <!-- </v-col> -->
      </v-card-title>

      <br/>

      <v-row justify="center">
        <v-carousel-transition>
          <v-form v-if="$keys[1]" class="col-lg-5 col-11" align="center">

            <transition name="slideYneg">
              <v-row v-if="$keys[2]">
                <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-email" label='Email' v-model="email" />
              </v-row>
            </transition>

            <transition name="slideYneg">
              <v-row v-if="$keys[3]">
                <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-mapbox" label='Country of residence' v-model="country" />
              </v-row>
            </transition>

            <transition name="slideYneg">
              <v-row v-if="$keys[4]" justify="center">
                <v-date-picker dark :reactive="true" :show-current="true" type='date' v-model="newDate" />
              </v-row>
            </transition>

            <transition name="slideYneg">
              <v-row v-if="$keys[5]" justify="center">
                <v-btn class="g-white">Submit</v-btn>
              </v-row>
            </transition>
          </v-form>
        </v-carousel-transition>
      </v-row>
    </v-card>

    <br/>
    <br/>

  </div>
</template>

<script>
export default {
  name: 'g-profile-setup',

  data: () => ({
    anim: {
      delay: 100,
      limit: 5
    },

    email: '',
    country: '',
    newDate: ''
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData}
  },

  watch: {
    user() {
      this.$User = this.user
    }
  },

  mounted() {
    this.$User = this.user
  },

  hasAnim: true
}
</script>