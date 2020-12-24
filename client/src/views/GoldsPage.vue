<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <Golds />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    // @ is an alias to /src
    import Golds from "@/components/Golds.vue";

    export default {
        name: "GoldsPage",
        components: {
            Golds,
        }
    };
</script>