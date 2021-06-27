<template>
  <div id="app">
    <MatrisTable />
    <CurrencyConverter />
    <v-row>
      <v-col cols="12" sm="6">
        <CaprazKurlarTable />
      </v-col>
      <v-col cols="12" sm="6">
        <BinTLTable />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MatrisTable from "@/components/MatrisTable.vue";
import CaprazKurlarTable from "@/components/CaprazKurlarTable.vue";
import CurrencyConverter from "@/components/CurrencyConverter.vue";
import BinTLTable from "@/components/BinTLTable.vue";
export default {
  name: "CaprazKurlar",
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: "Para.Guru | Çapraz Kurlar. Dolar ve Euro ve Tüm Döviz Pariteleri",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Dolar ve Euro paritelerini tablolar halinde ya da matris üzerinden seçerek takip edebilirsiniz."
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "Dolar euro, euro dolar, dolar lira, euro lira, sterlin dolar, dolar sterlin, lira dolar, lira euro, lira sterlin, kanada doları dolar, dolar kanada doları, çapraz kurlar, dolar pariteleri, euro pariteleri, dolar euro paritesi, euro dolar paritesi, dolar lira paritesi, euro lira paritesi, sterlin dolar paritesi, dolar sterlin paritesi, lira dolar paritesi, lira euro paritesi, lira sterlin paritesi, ters parite, kanada doları dolar paritesi, dolar kanada doları paritesi, çapraz kurlar ne oldu, dolar pariteleri ne kadar, euro pariteleri ne oldu, amerikan doları euro çapraz kur, euro dolar çapraz kuru"
        }
      ]
    };
  },
  components: {
    MatrisTable,
    CurrencyConverter,
    CaprazKurlarTable,
    BinTLTable
  },
  computed: {},
  methods: {}
};
</script>
