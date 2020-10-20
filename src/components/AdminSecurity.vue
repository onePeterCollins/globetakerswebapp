<template>
  <div class="g-admin-security">
    <createAdmin />
  </div>
</template>

<script>
import createAdmin from './CreateAdmin'

export default {
  name: 'g-admin-security',

  data: () => ({
    
  }),

  mounted() {
    if (!sessionStorage.getItem('adminId') && sessionStorage.getItem('adminAccess') !== 'true') {
      this.$router.push('proprietor')
    }
  },

  components: {
    createAdmin: createAdmin
  }
}
</script>
