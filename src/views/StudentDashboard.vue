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
    user() {return this.$store.getters.getUserData},
    isOnline() {return this.user ? this.user._isOnline : false},
    profileUploaded() {
      let value

      if (this.user) {
        if (this.user.getProfile) {
          value = this.user.getProfile()
        }
      }

      return value
    }
  },

  watch: {
    user() {
      if (this.user) {
        if (this.user._isOnline) {
          this.loadDashbord()
          this.$forceUpdate()
        } else {
          this.$router.push('/')
        }
      }
    },

    profileUploaded() {
      if (this.profileUploaded) {
        this.loadDashbord()
      }
    }
  },

  methods: {
    loadDashbord() {
      this.$Download(this.user).then((result) => {
        if (!result) {
          this.$router.push('/')
        } else {
          this.$User = result
          this.showContent = false
          this.$forceUpdate()
          this.showContent = true
        }
      })
    }
  },

  mounted() {
    if (this.user) {
      if (this.user._isOnline) {
        this.loadDashbord()
      } else {
        this.$router.push('/')
      }
    } else {
      this.$router.push('/')
    }
  },

  hasAnim: true
}
</script>
