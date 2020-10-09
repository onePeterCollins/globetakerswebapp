<template>
  <div class="g-admin-msg-viewer">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">Contact Messages</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="center">
        <v-card class="col-11 col-lg-10">
          <v-row>
            <v-col class="col-12 col-lg-6" align="left">
              <h2 class="g-deepblue--text ml-3">title</h2>
              <v-row v-if="!mobile">
                <v-col class="ml-3">
                  <v-btn class="mx-2">
                    <v-icon>mdi-pen</v-icon>
                    Edit
                  </v-btn>

                  <v-btn class="mx-2">
                    <v-icon>mdi-message</v-icon>
                    Reply
                  </v-btn>

                  <v-btn class="mx-2">
                    <v-icon>mdi-cancel</v-icon>
                    Delete
                  </v-btn>
                </v-col>
              </v-row>

              <v-row v-else>
                <v-col class="ml-3">
                  <v-btn @click="edit(sn)">
                    <v-icon>mdi-pen</v-icon>
                    Edit
                  </v-btn>
                </v-col>

                <v-col class="mr-3">
                  <v-btn @click="comment(sn)">
                    <v-icon>mdi-message</v-icon>
                    Reply
                  </v-btn>
                </v-col>
              </v-row>

              <v-row v-if="mobile">
                <v-col class="ml-3">
                  <v-btn @click="deleteLecture(sn)">
                    <v-icon>mdi-cancel</v-icon>
                    Delete
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
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'g-admin-message-list',

  data: () => ({
    messages: []
  }),

  computed: {
    mobile()  {return this.$store.getters.getLocalData.device.mobile()}
  },

  firestore: {
    messages: db.collection('inbox')
  }
}
</script>

<style>

</style>