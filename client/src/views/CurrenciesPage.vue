<template>
  <div class="home">
    <v-container>
      <MainDoviz />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainDoviz from "@/components/MainDoviz.vue";

export default {
  name: "GoldsPage",
  components: {
    MainDoviz,
  }
};
</script>
