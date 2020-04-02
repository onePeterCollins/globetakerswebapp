<template>
  <div class="upload-lesson">
    <transition name="slideYpos">
      <v-row v-if="$keys[0]" class="yellow">
        <v-col>
          <h3 align="center">Upload your {lecture type} lecture</h3>
        </v-col>
      </v-row>
    </transition>

      <br/>
      <br/>
      <br v-if="mobile"/>
      <br v-if="mobile"/>
      <br v-if="mobile"/>
      <br v-if="mobile"/>

      <v-carousel-transition>
        <form class="col-lg-5 col-10  green lighten-4 lesson-upload-form">
          <v-row justify="center">
            <v-fade-transition>
              <h3  v-if="$keys[0]" class="form-title"><v-icon class="green--text">mdi-upload</v-icon> UPLOAD AUDIO LESSON</h3>
            </v-fade-transition>
          </v-row>
          

          <v-scale-transition>
            <v-file-input v-if="$keys[2]"
            background-color="white"
            label="select audio file"/>
          </v-scale-transition>

          <v-row justify="center">
            <v-scale-transition>
              <v-btn v-if="$keys[4]" class="cyan">
                <v-icon class="green--text">mdi-upload</v-icon> upload
              </v-btn>
            </v-scale-transition>
          </v-row>
          
        </form>
      </v-carousel-transition>
      
  </div>
</template>

<script>
export default {
    name: 'g-upload-lesson',

    computed: {
      mobile: () => {
        let value

        window.innerWidth < 1024
        ? value = true
        : value = false

        return value
      }
    },

    hasAnim: true

}
</script>

<style>
.lesson-upload-form {
    margin-left: auto;
    margin-right: auto
}
</style>
