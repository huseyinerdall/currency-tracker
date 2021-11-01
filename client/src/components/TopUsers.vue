<template>
  <v-container
      class="ma-0 mt-4 pa-2"
      style="border: 1px solid #ddd;min-height: 48px;"
      :style="[
      $store.state.isLight
        ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
        : 'color:#ffffff !important;background-color:rgba(0,0,0,.3);'
    ]"
      :dark="!$store.state.isLight"
      :light="$store.state.isLight"
  >
    <div class="d-flex flex-row justify-space-between">
      <div v-for="user in topUsers" style="width: calc(100%/7)" :key="user.sirano">
        <v-img :src="user.profileImage" width="140" style="border:1px solid #000;min-height: 160px;"></v-img>
        <p style="max-width: 110px;font-size: 12px;color:rgba(255,255,255,.8)" class="text-truncate text-capitalize ma-0 pa-0">{{user.fullName}}</p>
        <p style="max-width: 110px;font-size: 12px;color:rgba(255,255,255,.8)" class="ma-0 pa-0">₺ {{ new Intl.NumberFormat("tr-TR").format(user.balanceNow)}}</p>
      </div>

        <div style="height: 160px;width: 140px;border:1px solid #ffc107;"
             class="d-flex align-center justify-center block"
             @mouseover="focused = true" @mouseleave="focused = false">
          <div class="d-flex flex-column justify-center">
            <v-btn
                class="mx-auto"
                fab
                dark
                small
                :plain="!focused"
                color="pink"
            >
              <v-icon color="white" >
                mdi-plus
              </v-icon>
            </v-btn>
            <v-btn tile color="transparent" class="white--text mx-auto">OYUNA GİR</v-btn>
          </div>

        </div>

    </div>
  </v-container>
</template>

<script>
import axios from "axios";

let alertoptions = {
  type: "error",
  icon: "error",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "red accent-3 text-center",
  className: "text-center"
}
export default {
  name: "TopUsers",
  data: () => ({
    topUsers: [],
    focused: false
  }),
  created() {
    this.getTopUsers()
  },
  components: {
  },
  props: {
  },
  methods: {
    getTopUsers: function() {
      axios
          .get(`${this.$store.state.api}/gettopusers/light`)
          .then(response => {
            this.topUsers = response.data;
            console.log(response.data)
          })
          .catch(err => {
            this.$toasted.show(`${err}`, alertoptions);
          });
    },
  }
};
</script>
<style>
.block {
  position: relative;
}

.block:before, .block:after {
  content: '';
  position: absolute;
  left: -2px;
  top: -2px;
  background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00,#ffff00, #ff0000, #fb0094,
  #0000ff, #00ff00,#ffff00, #ff0000);
  background-size: 400%;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
  animation: steam 20s linear infinite;
}

@keyframes steam {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.block:after {
  filter: blur(50px);
}
</style>
