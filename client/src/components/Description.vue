<template>

  <v-card
      style="border: 1px solid #ddd;border-radius:0;background-color:transparent;"
      :style="$store.state.isLight ? 'color:rgba(0,0,0,0.87);' : 'color:#fff;'">
    <v-card-title v-if="$route.params.coin">{{$route.params.coin}} Hakkında</v-card-title>
    <v-card-title v-else-if="$route.params.gold">{{$route.params.gold}} Hakkında</v-card-title>
    <v-card-text :style="$store.state.isLight ? 'color:rgba(0,0,0,0.87);' : 'color:#fff;'" v-html="description">
      {{description}}
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Description",
  data: () => ({
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dicta distinctio dolorem esse nisi quasi suscipit! Cupiditate ipsam, similique. Aspernatur culpa debitis eveniet facere fugit, hic impedit neque porro velit.\n' +
        '      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur debitis dolore dolores dolorum eius labore laudantium minus neque nihil quo quod reiciendis, saepe. Aut iure laboriosam magnam sapiente vel?',

  }),
  created() {
    console.log(this.$route.params.coin)
    if(this.$route.params.coin){
      axios.post(`${this.$store.state.admin}/cryptocoindescriptions`, {
        coinName: this.$route.params.coin,
      })
          .then((response) => {
            console.log(response.data)
            this.description = response.data;
          })
    }else if(this.$route.params.gold){
      console.log(this.$route.params.gold);
    }
  },
};
</script>