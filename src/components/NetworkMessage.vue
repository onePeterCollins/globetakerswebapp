<template>
  <div v-if="showNetworkMessage" class="network-message">
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
    showNetworkMessage() {return this.$store.getters.getNetworkData.showNetworkMessage}
  },

  methods: {
    acknowledge() {
      this.$store.dispatch('setValue', {name: 'network', newVal: false, child: ['showNetworkMessage']})
    }
  }
}
</script>
