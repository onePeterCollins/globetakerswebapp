<template>
  <v-row justify="center">
    <v-col align="center" class="col-4 col-lg-2 green--text accent-4">
    <b>active: </b>
    <span>500</span>
    </v-col>

    <v-col align="center" class="col-4 col-lg-2 pink--text lighten-4">
    <b>inactive: </b>
    <span>700</span>
    </v-col>

    <v-col align="center" class="col-4 col-lg-2 cyan--text">
    <b>total: </b>
    <span>1200</span>
    </v-col>
</v-row>
</template>

<script>
export default {
  name: 'g-student-counter'
}
</script>
