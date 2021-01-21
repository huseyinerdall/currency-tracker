<template>
  <div class="home">
    <div>
      <v-row>
        <v-col
        class="col-md-12">
          <v-row>
            <v-col
            cols="12"
            md="6">
              <MainDoviz :gold="gold" />

            </v-col>

            <v-col cols="12" md="6">
              <Golds :gold="gold" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <CurrencyConverter />
      <MainCryptoCurrencyForHomePage :coin="coin" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/*import IzlemeSecenek from "@/components/IzlemeSecenek.vue";*/
import MainCryptoCurrencyForHomePage from "@/components/MainCryptoCurrencyForHomePage.vue";
import Golds from "@/components/Golds.vue";
import MainDoviz from "@/components/MainDoviz.vue";
import CurrencyConverter from "@/components/CurrencyConverter.vue";
/*import Calculator from "@/components/Calculator.vue";*/
/*import CurrencyMatrixTable from "@/components/CurrencyMatrixTable.vue";
import TCMBCurrencyTable from "@/components/TCMBCurrencyTable.vue";*/

export default {
  name: "Home",
  props: {
    coin: {
      type:String
    },
    gold: {
      type:String
    }
  },
  components: {
    MainCryptoCurrencyForHomePage,
    Golds,
    CurrencyConverter,
    MainDoviz
  }
};
</script>
