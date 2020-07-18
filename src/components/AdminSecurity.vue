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

  components: {
    createAdmin: createAdmin
  }
}
</script>
