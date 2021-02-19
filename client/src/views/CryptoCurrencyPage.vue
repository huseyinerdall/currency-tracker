<template>
  <div class="home">
    <v-container>
      <MainCryptoCurrency :coin="coin" />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainCryptoCurrency from "@/components/MainCryptoCurrency.vue";

export default {
  name: "Home",
  props: {
    coin: {
      type:String
    }
  },
  metaInfo () {
    return {
      title: "Para.Guru | Kripto Para Piyasası. Bitcoin Ne Kadar? Ethereum ve XRP Canlı Fiyatlar",
      meta: [
        { vmid: 'description', name: 'description', content: "Bitcoin başta olmak üzere kripto para piyasasının en güncel fiyatlarını takip edebilir, fiyat grafiklerini analiz edebilirsiniz." },
        { vmid: 'keywords', name: 'keywords', content: "Kripto para fiyatları, sanal para fiyatları, kripto para piyasası, sanal para piyasasi, bitcoin ne kadar, bitcoin kaç dolar, bitcoin kaç lira, bitcoin canlı fiyatı, ethereum canlı fiyatı, bitcoin al, ethereum al, ripple ne kadar, dogecoin ne kadar, bitcoin fiyatı, btcturk fiyatı, bitcoin al sat, bitcoin satın al, ripple satın al, bitcoin kaç lira oldu, bitcoin son fiyatı, bitcoin hemen satın al, bitcoin hemen sat" }
      ]
    }
  },
  components: {
    MainCryptoCurrency,
  }
};
</script>
