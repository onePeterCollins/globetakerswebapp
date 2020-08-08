<template>
  <v-form class="col-lg-5 col-11 contact-form center cyan lighten-5">
    <v-row justify="center">
        <h2 class="form-title g-deepblue--text">-- CONTACT US--</h2>
    </v-row>

    <br/>

    <transition name="slideYneg">
      <v-row v-if="$keys[1]">
        <v-text-field color="g-rose" prepend-icon="mdi-account" label="Name" hint="max 30 characters"  height="30" :value="username"/>
      </v-row>
    </transition>

    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[2]">
        <v-text-field color="g-rose" prepend-icon="mdi-email" label="Email" hint="max 30 characters"  height="30" :value="email"/>
      </v-row>
    </transition>

    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[3]">
        <v-text-field color="g-rose" prepend-icon="mdi-pen" label="Subject" hint="max 30 characters"  height="30" :value="subject"/>
      </v-row>
    </transition>

    <br />
    <br />
    <br />
    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[4]">
        <v-textarea color="g-rose" prepend-icon="mdi-pencil" label="Type your message here" hint="max 300 characters"  height="30" :value="message"/>
      </v-row>
    </transition>

    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[5]">
        <span>
          <b id="loginVerification"></b>
        </span>
      </v-row>
    </transition>

    <br />

    <transition name="slideYneg">
      <v-row v-if="$keys[6]" justify="center">
        <v-btn class="white g-darkblue--text">Submit</v-btn>
      </v-row>
    </transition>
  </v-form>
</template>

<script>
export default {
  name: 'g-contact-form',

  data: () => ({
    username: '',
    email: '',
    subject: '',
    message: ''
  }),

  hasAnim: true
}
</script>
