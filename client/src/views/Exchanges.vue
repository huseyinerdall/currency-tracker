<template>
  <div class="home">
    <v-container class="pa-0 pt-4">
      <CryptoExchangesTable />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CryptoExchangesTable from "@/components/CryptoExchangesTable";

export default {
  name: "Exchanges",
  metaInfo() {
    return {
      title: "Para.Guru | Kripto Para Borsaları Binance Paribu Bitexen",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "Kripto para borsaları hakkında bilgiler."
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: "Kripto para borsaları"
        }
      ]
    };
  },
  components: {
    CryptoExchangesTable
  }
};
</script>
