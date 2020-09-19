<template>
  <div class="GT-T-dashboard">
    <g-trainer-dashboard-content />

    <br/>
    <br/>
    <br/>
    <br/>
    <br v-if="!mobile" />
        
    <g-student-counter />
  </div>
</template>

<script>
export default {
  name: 'g-trainer-dashboard',

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
