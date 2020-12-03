<template>
  <div class="home">
    <div>
      <!--<CurrencyConverter />-->


      <v-row>
        <v-col
        class="col-md-12">
          <v-row>
            <v-col
            cols="12"
            md="6">
              <MainDoviz />

            </v-col>

            <v-col cols="12" md="6">
              <Golds />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <CurrencyConverter />
      <MainCryptoCurrency />
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
/*import IzlemeSecenek from "@/components/IzlemeSecenek.vue";*/
import MainCryptoCurrency from "@/components/MainCryptoCurrency.vue";
import Golds from "@/components/Golds.vue";
import MainDoviz from "@/components/MainDoviz.vue";
import CurrencyConverter from "@/components/CurrencyConverter.vue";
/*import CurrencyMatrixTable from "@/components/CurrencyMatrixTable.vue";
import TCMBCurrencyTable from "@/components/TCMBCurrencyTable.vue";*/

export default {
  name: "Home",
  components: {
    //IzlemeSecenek,
    MainCryptoCurrency,
    Golds,
    CurrencyConverter,
    MainDoviz,
    //CurrencyMatrixTable,
    //TCMBCurrencyTable
  }
};
</script>
