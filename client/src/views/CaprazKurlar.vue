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
            return {}
        },
        components: {
          MatrisTable,
          CurrencyConverter,
          CaprazKurlarTable,
          BinTLTable,
        },
        computed: {},
        methods: {}
    };
</script>