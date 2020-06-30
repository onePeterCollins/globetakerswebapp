<template>
  <v-carousel-transition>
    <v-form v-if="$keys[1]" class="col-lg-10 col-11 reg-form g-white">
      
      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
          <h2 class="form-title">-- REGISTER --</h2>
        </v-row>
      </transition>
      
      <transition name="slideYneg">
        <v-row v-if="$keys[2]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" :hint='errorMessages.username'  height="30" v-model='username' :value='$User.getName()' @input="update('name', username)"/>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="NG **** ****" :hint="errorMessages.longrichCode"  height="30" v-model='longrichCode' :value="$User.getLongrichCode()" @input="update('longrichCode', longrichCode)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[4]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-star" label="Team leaders rank" :hint="errorMessages.teamLeadsRank"  height="30" v-model='teamLeadsRank' :value="$User.getTeamLeadsRank()" @input="update('teamLeadsRank', teamLeadsRank)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[5]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account-outline" label="Team leaders name" :hint="errorMessages.teamLeadsName"  height="30" v-model='teamLeadsName' :value="$User.getTeamLeadsName()" @input="update('teamLeadsName', teamLeadsName)" />
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[6]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-pen" label="sub-team name" :hint="errorMessages.subTeam"  height="30" v-model='subTeam' :value="$User.getSubTeam()" @input="update('subTeam', subTeam)" />
        </v-row>
      </transition>

      <br />

      <p v-if="errorMessages.generalErrorMessage" class="g-deepblue g-cream--text px-2">{{errorMessages.generalErrorMessage}}</p>

      <v-scale-transition>
        <v-row v-if="$keys[6]" justify="center">
          <v-btn @click="register()" class="g-cream g-darkblue--text">Register</v-btn>
        </v-row>
      </v-scale-transition>
    </v-form>
  </v-carousel-transition>
</template>

<script>
import newEntry from '../form_validation/RegistrationForm'

export default {
  name: 'g-registration-form',

  data: () => ({
    username: '',
    longrichCode: '',
    teamLeadsRank: '',
    teamLeadsName: '',
    subTeam: '',

    errorMessages: {
      username: 'Name and surname max 30 characters',
      longrichCode: 'Your Longrich code',
      teamLeadsRank: 'Example: D5, D6, D7 ...',
      teamLeadsName: 'Fullname of your team leader',
      subTeam: 'The name of your sub-team',
      generalErrorMessage: null
    }
  }),

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    }
  },

  methods: {
    update(field, value) {
      // Validate and update input
      newEntry(this, field, value)
    },

    register() {
      alert(this.$user)
      // Check for empty fields
      // Compare data on all fields to what exists on database
      // if(matchFound) then load student dashboard
    },

    usernameHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.username = 'Name and surname max 30 characters'
      : this.errorMessages.username = errorMessage
    },

    longrichCodeHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.longrichCode = 'Your Longrich code'
      : this.errorMessages.longrichCode = errorMessage
    },

    teamLeadsRankHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.teamLeadsRank = 'Example: D5, D6, D7 ...'
      : this.errorMessages.teamLeadsRank = errorMessage
    },

    teamLeadsNameHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.teamLeadsName = 'Fullname of your team leader'
      : this.errorMessages.teamLeadsName = errorMessage
    },

    subTeamHint(errorMessage) {
      !errorMessage
      ? this.errorMessages.subTeam = 'The name of your sub-team'
      : this.errorMessages.subTeam = errorMessage
    }
  },

  mounted() {

  },

  hasAnim: true
}
</script>

<style scoped>
.reg-form {
  padding: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5rem;
  box-shadow: -0.5px 1.5px 0.25rem 0.5px rgba(0,0,0,0.25)
}
</style>