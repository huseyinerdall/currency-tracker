<template>
  <div class="home">
    <div class="mt-4">
      <v-row>
        <v-col class="col-md-12">
          <v-row>
            <v-col cols="12" md="6">
              <MainDoviz :gold="gold" />
            </v-col>

            <v-col cols="12" md="6">
              <Golds :gold="gold" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <CurrencyConverter class="mt-4" />
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
      type: String
    },
    gold: {
      type: String
    }
  },
  metaInfo() {
    return {
      title: "Para.guru | Altın, Döviz ve Kripto Para Fiyatları",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Altın, döviz ve kripto para canlı fiyatları. Canlı fiyatlar üzerinden alım satım oyunu oynayan herkesi bir araya getiren bir sosyal ağdır."
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "Altın fiyatları, döviz fiyatları, kripto para fiyatları, altın ne kadar, döviz ne kadar, kripto para ne kadar, altın al sat, döviz al sat, kripto para al sat"
        }
      ]
    };
  },
  components: {
    MainCryptoCurrencyForHomePage,
    Golds,
    CurrencyConverter,
    MainDoviz
  }
};
</script>
