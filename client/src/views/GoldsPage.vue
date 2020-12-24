<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <Golds />
        </v-col>
        <v-col cols="12" md="4">
          <TCMBCurrencyTable />
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>
<script>
    // @ is an alias to /src
    import Golds from "@/components/Golds.vue";
    import TCMBCurrencyTable from "@/components/TCMBCurrencyTable.vue";
    export default {
        name: "GoldsPage",
        components: {
          Golds,
          TCMBCurrencyTable
        }
    };
</script>