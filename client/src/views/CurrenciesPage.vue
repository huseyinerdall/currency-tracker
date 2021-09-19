<template>
  <div class="home">
    <v-container class="pt-lg-4">
      <v-row>
        <v-col
          cols="12"
          md="8"
          :class="[$vuetify.breakpoint.smAndDown ? 'pa-0' : '']"
        >
          <MainDoviz />
        </v-col>
        <v-col
          cols="12"
          md="4"
          :class="[$vuetify.breakpoint.smAndDown ? 'pa-0' : '']"
        >
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
  name: "CurrenciesPage",
  metaInfo() {
    return {
      title: "Para.Guru | Döviz Fiyatları. Dolar Ne Kadar? Euro Fiyatı",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Dolar, Euro, Sterlin ve diğer dövizlerin canlı fiyatlarını takip edebilirsiniz."
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "Döviz fiyatları, döviz ne kadar, döviz canlı alış fiyatı, döviz canlı satış fiyatı, dolar ne kadar, euro ne kadar, dolar al sat, euro al sat, sterlin al sat, kapalı çarşı döviz fiyatları, serbest piyasa döviz fiyatları"
        }
      ]
    };
  },
  components: {
    MainDoviz,
    BinTLTable
  }
};
</script>
