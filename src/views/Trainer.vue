<template>
  <div class="trainers">
    <v-row>
      <v-col v-if="!mobile" class="col-11 ml-5">
        <h2 class="cyan--text">Globetakers Business School</h2>
        <h3>Trainers portal</h3>
      </v-col>

      <v-col v-else-if="mobile" align="center">
        <h2 class="cyan--text">Globetakers Business School</h2>
        <h3>Trainers Portal</h3>
      </v-col>
    </v-row>

    <v-row>
      <g-trainer-login-form />
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'trainer',

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    }
  }
}
</script>

<style>

</style>
