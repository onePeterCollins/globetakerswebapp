<template>
  <div class="about">
    <v-row class="g-cream">
      <v-col align="center">
        <h2 class="g-deepblue--text dosis">About Us</h2>
      </v-col>
    </v-row>

    <br/>

    <v-card class="col-11 col-lg-10 px-0 pt-0 center g-white g-deepblue--text" align="center">
      <v-img
        :src="require('../assets/images/cover-photo.jpg')"
        cover
        width="100%"
        height="50%"
        transition="scale-transition" />
      <v-row>
        <v-col>
          <h3 class="underline  dosis">Who we are</h3>
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
            We are comprised of 17 seasoned trainers who have been hand picked to facilitate the training with 
            high integrity, quality and a professional training process.
          </p>
        </v-col>
      </v-row>
    </v-card>

    <br/>

    <v-card class="col-11 col-lg-10 px-0 center g-white g-deepblue--text" align="center">
      <v-row>
        <v-col>
          <h3 class="underline dosis">What we do</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-7" align="left">
          <p>
            Globe Takers team is made up of over 100,000 highly motivated entrepreneurs who are determined to help 
            many live their dreams. Adding value to people's lives is what we do. We help you bring out the best in you.
          </p>
          <p>Let's show you where the stones are laid so you too can walk on water.</p>
        </v-col>
      </v-row>
    </v-card>

    <br/>

    <v-card class="col-11 col-lg-10 center g-white g-deepblue--text" align="center">
      <v-row>
        <v-col>
          <h3 class="underline dosis">Our team</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-7">
          <v-row justify="center">
            <v-col class="col-lg-4 g-cream px-1 py-1 mb-5 mx-lg-12">
              <v-card class="py-3 mb-5 social-media-sketch-pattern">
                <v-avatar height="200" width="200" class="round pb-9">
                  <v-img
                    :src="require('../assets/images/team-member-1.jpg')"
                    cover
                    height="290"
                    width="290"
                    transition="scale-transition" />
                </v-avatar>
              </v-card>
              <p>
                <b class="dosis">Ahaoma Mbadiwe-Maduforo</b>
                <br/>
                <b>Team Lead, Globe Takers Business School International</b>
              </p>
            </v-col>

            <v-col class="col-lg-4 red accent-2 px-1 py-1 mb-5 mx-lg-12">
              <v-card class="py-3 mb-5 social-media-sketch-pattern">
                <v-avatar height="200" width="200" class="round">
                  <v-img
                    :src="require('../assets/images/team-member-2.jpg')"
                    cover
                    height="200"
                    width="100"
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