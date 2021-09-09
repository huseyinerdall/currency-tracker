<template>
  <v-container
      class="ma-0 mt-4 pa-0"
      style="border: 1px solid #ddd;min-height: 48px;"
      :style="[
                          $store.state.isLight
                            ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
                            : 'color:#ffffff !important;background-color:rgba(0,0,0,.3);'
                        ]"
      :dark="!$store.state.isLight"
      :light="$store.state.isLight"
  >
    <v-row class="global">
      <div>
        <span class="amber--text">Aktif Sayı:</span>
        {{ data != null ? data["active_cryptocurrencies"] : 1000 }}
      </div>
      <div>
        <span class="amber--text">Toplam Hacim:</span>
        %{{ data["market_cap_change_percentage_24h_usd"] | signint }}
      </div>
      <div v-for="(v,k) in data['dominance']" :key="k">
        <span class="amber--text">{{ k | uppercase }}</span>
        %{{ v | tofixedftwo }}
      </div>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "GlobalInfos",
  data: () => ({
    data: null
  }),
  methods: {
    getGlobalInfos() {
      axios
          .get(`${this.$store.state.api}/global`)
          .then(res => {
            this.data = res.data;
          })
      .catch(err=>{
        this.$toasted.show(err,{fullWidth:true})
      })
    }
  },
  created() {
    this.getGlobalInfos();
  }
};
</script>
<style>
.global{
  width: 100%;
  justify-content: space-around;
  margin-left:0 !important;
}
.global div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: thin solid rgba(255, 255, 255, 0.12);
  margin: 10px 0;
  padding: 4px 10px;
  color: #fff;
  font-size: 14px;
}
.global div span{

}
</style>
