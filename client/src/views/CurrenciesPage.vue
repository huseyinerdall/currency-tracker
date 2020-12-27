<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <MainDoviz />
        </v-col>
        <v-col cols="12" md="4">
          <BinTLTable />
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainDoviz from "@/components/MainDoviz.vue";
import BinTLTable from "@/components/BinTLTable.vue";

export default {
  name: "GoldsPage",
  components: {
    MainDoviz,
    BinTLTable,
  }
};
</script>
