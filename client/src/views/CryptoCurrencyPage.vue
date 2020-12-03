<template>
  <div class="home">
    <v-container>
      <MainCryptoCurrency />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainCryptoCurrency from "@/components/MainCryptoCurrency.vue";

export default {
  name: "Home",
  components: {
    MainCryptoCurrency,
  }
};
</script>
