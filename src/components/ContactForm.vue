<template>
  <v-form class="col-lg-5 col-10 contact-form center cyan lighten-5">
    <v-row justify="center">
        <h2 class="form-title">CONTACT</h2>
    </v-row>

    <v-row>
        <v-text-field prepend-icon="mdi-account" label="Name" hint="max 30 characters"  height="30" :value="username"/>
    </v-row>

    <br />

    <v-row>
        <v-text-field prepend-icon="mdi-email" label="Email" hint="max 30 characters"  height="30" :value="email"/>
    </v-row>

    <br />

    <v-row>
        <v-text-field prepend-icon="mdi-pen" label="Subject" hint="max 30 characters"  height="30" :value="subject"/>
    </v-row>

    <br />
    <br />
    <br />

    <v-row>
        <v-textarea prepend-icon="mdi-pencil" label="Type your message here" hint="max 300 characters"  height="30" :value="message"/>
    </v-row>

    <br />

    <span class="verification">Code: {verification code}</span>

    <br />

    <v-row>
        <v-text-field prepend-icon="mdi-tag" label="Enter code" hint="enter the code above"  height="30" :value="code"/>
    </v-row>

    <br />

    <v-row justify="center">
        <v-btn>Submit</v-btn>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'g-contact-form'

}
</script>
