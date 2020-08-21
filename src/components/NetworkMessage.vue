<template>
  <div v-if="showNetworkMessage" :width="dialogWidth" class="network-message">
    <v-dialog persistent v-model="showNetworkMessage">
      <v-card>
        <v-card-title class="yellow--text darken-4 g-deepblue">Network Alert</v-card-title>
        <v-card-text align="center">
          <h3 class="pt-3">{{networkMessage}}</h3>
        </v-card-text>

        <v-row>
          <v-col align="center">
            <v-btn @click="acknowledge()">Ok</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'g-network-message',

  computed: {
    networkMessage() {return this.$store.getters.getNetworkData.networkMessage},
    showNetworkMessage() {return this.$store.getters.getNetworkData.showNetworkMessage},
    dialogWidth() {
      let value

      if (window.innerWidth >= 1264) {
        value = '30vw'
      } else if (window.innerWidth < 1264 &&  window.innerWidth >= 960) {
        value = '50vw'
      } else {
        value = '90vw'
      }

      return value
    }
  },

  methods: {
    acknowledge() {
      this.$store.dispatch('setValue', {name: 'network', newVal: false, child: ['showNetworkMessage']})
    }
  }
}
</script>
