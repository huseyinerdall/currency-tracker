<template>
  <div class="home">
    <v-container>
      <MainCryptoCurrency :coin="coin" />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainCryptoCurrency from "@/components/MainCryptoCurrency.vue";

export default {
  name: "Home",
  props: {
    coin: {
      type:String
    }
  },
  components: {
    MainCryptoCurrency,
  }
};
</script>
