<template>
  <v-carousel-transition>
    <v-form v-if="$keys[1]" class="col-lg-4 col-11 reg-form g-white">
      <transition name="slideYneg">
        <v-row v-if="$keys[1]" justify="center">
          <h2 class="form-title">-- LOGIN --</h2>
        </v-row>
      </transition>

      <br/>

      <transition name="slideYneg">
        <v-row v-if="$keys[2]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-account" label="Full name" :hint='errorMessages.username'  height="30" v-model='username' @input="update('name', username)"/>
        </v-row>
      </transition>

      <br />

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <v-text-field color="rgb(255, 127, 165)" prepend-icon="mdi-lock" label="**** ****" :hint="errorMessages.password"  height="30" v-model='password' @input="update('longrichCode', password)" />
        </v-row>
      </transition>

      <br/>

      <transition name="slideYneg">
        <v-row v-if="$keys[3]">
          <span>
            <b id="adminVerification"></b>
          </span>
        </v-row>
      </transition>

      <br/>

      <v-row v-if="errorMessages.generalErrorMessage" class="mb-5">
        <v-col v-for="(errorMessage, sn) in errorMessages.generalErrorMessage" :key="sn" class="g-deepblue g-cream--text col-12 px-2 mb-2">
          {{errorMessages.generalErrorMessage[sn]}}
        </v-col>
      </v-row>

      <v-row v-if="networkMessage" class="mb-5">
        <v-col class="col-12">
          <p v-if="networkMessage.success"><span class='green'>{{emoji.emojify(':white_check_mark:')}}</span> {{`${ networkMessage.success}`}}</p>
          <p v-if="networkMessage.error"><span class='red'>{{emoji.emojify(':x:')}}</span> {{`${ networkMessage.error}`}}</p>
        </v-col>
      </v-row>

      <v-scale-transition>
        <v-row v-if="$keys[6]" justify="center">
          <v-btn @click="login()" link to='/admin-dashboard' class="g-cream g-darkblue--text">Login</v-btn>
        </v-row>
      </v-scale-transition>
    </v-form>
  </v-carousel-transition>
</template>

<script>
export default {
  name: 'g-admin-login-form',

  data: () => ({
    username: '',
    password: '',

    errorMessages: {
      username: 'Administrator username',
      password: 'Enter your password'
    },

    errorFields: null,
    networkMessage: null
  }),

  computed: {
    modile() {return this.$store.getters.getLocalData.device.mobile()}
  },

  methods: {
    login() {
      //do something
    }
  },

  mounted() {
    
  },

  hasAnim: true
}
</script>

<style>

</style>