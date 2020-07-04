<template>
  <div class="about g-white">
    <v-row class="yellow">
      <v-col align="center">
        <h1>About Us</h1>
      </v-col>
    </v-row>

    <br/>

    <v-card class="col-11 col-lg-10 px-0 pt-0 center g-deepblue--text" align="center">
      <v-img
        :src="require('../assets/images/cover-photo.jpg')"
        cover
        width="100%"
        height="50%"
        transition="scale-transition" />
      <v-row>
        <v-col>
          <h2>Who we are</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-7" align="left">
          <p>
            <span class="blue--text">
              <b>Globe Takers Business School International</b>
            </span>
             was born out of a sincere and burning desire to raise vibrant, excellent,
            fierce and smart 21st century entrepreneurs who can weather any storm in the business world.
          </p>
          <p>
            We are comprised of about 17 seasoned trainers who have been hand picked to facilitate the training with 
            high integrity, quality and a professional training process.
          </p>
        </v-col>
      </v-row>
    </v-card>

    <br/>

    <v-card class="col-11 col-lg-10 px-0 center g-deepblue--text" align="center">
      <v-row>
        <v-col>
          <h2>What we do</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-7" align="left">
          <p>
            Globe Takers team is a team of over 100,000 highly motivated entrepreneurs who are determined to help 
            many live their dreams. Adding value to people's lives is what we do. We help you bring out the best in you.
          </p>
          <p>Let's show you where the stones are laid so you too can walk on water.</p>
        </v-col>
      </v-row>
    </v-card>

    <br/>

    <v-card class="col-11 col-lg-10 center g-deepblue--text" align="center">
      <v-row>
        <v-col>
          <h2>Our team</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-7">
          <v-row justify="center">
            <v-col class="col-lg-6 yellow px-1 py-1 mb-3">
              <v-card class="py-3 mb-5">
                <v-avatar height="200" width="200" class="round">
                  <v-img
                    :src="require('../assets/images/team-member-1.jpg')"
                    cover
                    height="300"
                    width="300"
                    transition="scale-transition" />
                </v-avatar>
              </v-card>
              <p>
                <b class="dosis">Ahaoma Mbadiwe-Maduforo</b>
                <br/>
                <b>Team Lead, Globe Takers Business School International</b>
              </p>
            </v-col>

            <v-col class="col-lg-6 red lighten-1 px-1 py-1 mb-3">
              <v-card class="py-3 mb-5">
                <v-avatar height="200" width="200" class="round pt-8">
                  <v-img
                    :src="require('../assets/images/team-member-2.jpg')"
                    cover
                    height="300"
                    width="150"
                    transition="scale-transition" />
                </v-avatar>
              </v-card>
              <p>
                <b class="white--text dosis">Akunna Chukwuma-Mbele ( MMCI )</b>
                <br/>
                <b class="white--text">Vice Chancellor, Globe Takers Business School International</b>
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

    <br/>
    <br/>
    <br/>
    <br/>

  </div>
</template>
