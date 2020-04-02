<template>
  <div>
    <v-row>
      <h3 class="yellow z3 wide" align="center">Lectures</h3>
    </v-row>

    <transition name="slideYpos">
      <v-row v-if="$keys[0]" justify="center">
        <v-col class="col-12 black z2">
          <p>
            <b class="ml-lg-12 ml-2 gray--text">Before taking a lecture, make sure you have your writing materials.</b>
          </p>
          
          <v-fab-transition>
            <p>
              <b v-if="more" class="ml-lg-12 ml-2 gray--text">Take a break every 30 minutes to review what has been covered in the lecture.</b>
            </p>
          </v-fab-transition>

          <v-fade-transition>
            <p>
              <b v-if="more" class="ml-lg-12 ml-2 gray--text">Write down your questions if any, and send them to your trainer.</b>
            </p>
          </v-fade-transition>

          <v-fab-transition>
            <p>
              <b v-if="more" class="ml-lg-12 ml-2 gray--text">Learning is a process, give yourself some time. <span>{{emoji.emojify(':wink:')}}</span> </b>
            </p>
          </v-fab-transition>
        </v-col>

        <transition name="slideYpos">
          <v-btn v-if="more === '' && $keys[2]" @click="showMore" class="cyan--text z1">
            <v-icon small class="mr-2">mdi-arrow-down</v-icon> more tips
          </v-btn>
        </transition>
      </v-row>
    </transition>

    <br/>
    <br/>
    <br/>

    <v-row>
      <v-card v-for="(lecture, sn) in lectures" :key="sn" class="col-10 col-lg-5 center mb-5 gray">
        <v-row>
          <v-col class="col-9">
            <h4 class="ml-2">{{lecture.title + ' ' + lecture.sn}}</h4>
            <span class="ml-2">Trainer: </span><span class="dosis-semibold">{{lecture.trainer}}</span>
          </v-col>
          <!-- popover menu -->
          <v-col align="right">
            <v-btn
              v-if="mobile"
              fab
              color="transparent"
              depressed
              small
              @click="setPopmenuName('popmenu', sn)"
              v-popover:popmenu.left
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <v-btn
              v-else-if="!mobile"
              class="mr-5"
              fab
              color="transparent"
              depressed
              small
              @click="setPopmenuName('popmenu', sn)"
              v-popover:popmenu.bottom
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <popover v-if="popmenuSN == sn" :class="popoverClass" :name="popmenuName">
              <v-list dense align="center">
                <v-list-item link to="/home">
                  <v-list-item-action>
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Open</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/home">
                  <v-list-item-action>
                    <v-icon>mdi-help</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Ask question</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </popover>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col align="left">
            <p class="ml-2">{{lecture.summary + ' ' + lecture.sn}}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

    <br/>
    <br/>
    <br/>
    <br/>
    
  </div>
</template>

<script>
export default {
  name: 'Lectures',

  data: () => ({
    more: '',
    tip: true,
    menuVisible: false,
    lectures: [
      {sn: 1, title: 'demo lecture', trainer: 'trainer 1', summary: 'one line summary of lecture'},
      {sn: 2, title: 'demo lecture', trainer: 'trainer 1', summary: 'one line summary of lecture'},
      {sn: 3, title: 'demo lecture', trainer: 'trainer 1', summary: 'one line summary of lecture'},
      {sn: 4, title: 'demo lecture', trainer: 'trainer 1', summary: 'one line summary of lecture'},
      {sn: 5, title: 'demo lecture', trainer: 'trainer 1', summary: 'one line summary of lecture'},
      {sn: 6, title: 'demo lecture', trainer: 'trainer 1', summary: 'one line summary of lecture'}
    ],
    popmenuName: '',
    popmenuSN: ''
  }),

  computed: {
    mobile: () => {
      let value

      window.innerWidth < 1024
      ? value = true
      : value = false

      return value
    },

    popoverClass: () => {
      let value

      window.innerWidth < 1024
      ? value = 'mobile-popover-menu'
      : value = 'desktop-popover-menu'

      return value
    }
  },

  methods: {
    showMore() {
      this.more = true
    },

    setPopmenuName(name, sn) {
      this.popmenuName = name
      this.popmenuSN = sn
    }
  },

  hasAnim: true
}
</script>

<style scoped>
.mobile-popover-menu {
  left: 25% !important;
  top: 5% !important;
}

.desktop-popover-menu {
  left: 75% !important;
  top: 45% !important;
}
</style>
