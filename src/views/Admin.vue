<template>
  <div class="Admin-panel">
    <v-row class="yellow">
      <v-col align="center">
        <h1>Admin Control Panel</h1>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>

    <v-row justify="center">
      <v-col v-for="(link, sn) in navLinks" :key="sn" align="center" class="col-lg-6 px-lg-10 col-11">
        <v-list-item link :to="link.route" class="g-white">
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>
    <br v-if="!mobile" />
    <br v-if="!mobile" />
    <br v-if="!mobile" />
    <br v-if="!mobile" />

    <g-student-counter />

    <br/>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'g-admin-panel',

  computed: {
    mobile() {return this.$store.getters.getLocalData.device.mobile()},
    navLinks() {
      let value

      value = [
        {sn: 1, title: 'Manage Students', route: 'proprietor/student-manager', icon: 'mdi-account-group'},
        {sn: 2, title: 'Manage Teams', route: 'proprietor/team-manager', icon: 'mdi-account-group'},
        {sn: 3, title: 'Manage Trainers', route: 'proprietor/trainers-manager', icon: 'mdi-account-group'},
        {sn: 4, title: 'Manage Lectures', route: 'proprietor/lecture-manager', icon: 'mdi-book'},
        {sn: 5, title: 'Video Forum', route: 'proprietor/forum-manager', icon: 'mdi-video'},
        {sn: 6, title: 'Messages', route: 'proprietor/message-manager', icon: 'mdi-email'}
      ]

      return value
    }
  }
}
</script>

<style>

</style>