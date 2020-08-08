<template>
  <div class="notifications social-media-sketch-pattern">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Notifications</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-card class="col-11 col-lg-10">
          <v-row>
            <v-col>
              <v-card-title>
                <h3></h3>
                <p></p>
              </v-card-title>

              <v-card-title>
                <h3></h3>
                <p></p>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'g-notifications',

  data: () => ({
    studentNotifications: [],
    tutorNotifications: [],
    generalNotifications: []
  }),

  computed: {
    
  },

  firesore: {
    studentNotifications: db.collection('notifications').doc('students'),
    tutorNotifications: db.collection('notifications').doc('tutors'),
    generalNotifications: db.collection('notifications').doc('general')
  },

  methods: {

  },

  mounted() {

  }

}
</script>

<style>

</style>