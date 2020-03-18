<template>
  <div class="uncharted">
    <v-row class="display-1"></v-row>

    <v-row>
      <v-col>
        <span>Sorry this page is currently unavailable</span>
        <span class="display-2">{{emoji.emojify(':confused:')}}</span>
      </v-col>
    </v-row>

    <v-row>
        <v-btn>go back</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Uncharted',

  data: () => ({

  }),

  mounted() {
      alert(this.emoji.emojify(':confused:'))
  }
}
</script>

<style>

</style>