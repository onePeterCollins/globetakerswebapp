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
    mobile() {return this.$store.getters.getLocalData.device.mobile()},
    user() {return this.$store.getters.getUserData ? this.$store.getters.getUserData : JSON.parse(localStorage.getItem('userPayload'))},
    isOnline() {return this.user ? this.user._isOnline : false}
  },

  mounted() {
    this.$Download(this.user).then((result) => {
      if (!result._isOnline) {
        this.$router.push('/not-found')
      } else if (result.getFirstName() === '') {
        this.$router.push('/not-found')
      } else {
        this.$User = result
        this.showContent = true
      }
    })
  },

  hasAnim: true
}
</script>
