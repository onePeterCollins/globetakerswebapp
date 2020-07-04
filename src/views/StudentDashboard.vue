<template>
  <div v-if="showContent" class="g-student-dashboard">
    <g-awaiting-verification v-if="$User.getFirstName() && !$User.verified()" />

    <g-profile-setup v-if="$User.getFirstName() && $User.verified() && !$User.getProfile()" />

    <g-student-dashboard-content v-if="$User.getFirstName() && $User.verified() && $User.getProfile()" />
        
    <g-student-counter />

    <br/>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'Student-dashboard',

  data: () => ({
    anim: {
      delay: 100,
      limit: 4
    },

    showContent: false
  }),

  computed: {
    mobile() {return this.$store.getters.getLocalData.device.mobile()}
  },

  mounted() {
    this.$User = this.$store.getters.getState.user

    if (!this.$User.getFirstName) {
      this.$router.push('/not-found')
    } else {
      this.showContent = true
    }
  },

  hasAnim: true
}
</script>
