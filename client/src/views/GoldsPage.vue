 <template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <Golds />
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
import Golds from "@/components/Golds.vue";
//import Calculator from "@/components/Calculator.vue";
import BinTLTable from "@/components/BinTLTable.vue";
export default {
  name: "GoldsPage",
  metaInfo() {
    return {
      title: "Para.Guru | Altın Fiyatları. Çeyrek Altın Ne Kadar?",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Altın fiyatlarını canlı takip edebilir, gerçek fiyatlar üzerinden yatırım oyunu oynayabilirsiniz."
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "Altın fiyatları, altın ne kadar, altın canlı alış fiyatı, altın canlı satış fiyatı, çeyrek altın ne kadar, gram altın ne kadar, ons altın fiyatı, çeyrek altın serbest piyasa fiyatı, altın al sat, gram altın al, gümüş ne kadar, kapalı çarşı altın fiyatı, serbest piyasa altın fiyatları, çeyrek al, çeyrek altın al"
        }
      ]
    };
  },
  components: {
    Golds,
    //Calculator,
    BinTLTable
  }
};
</script>
