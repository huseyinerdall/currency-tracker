<template>
  <div class="coins">
    <SinglePageGraph :coin="coin" />
    <v-container>
      <v-row>
        <v-col
        cols="12" md="12" class="pa-0">
          <Description :coin="coin" />
        </v-col>
      </v-row>
    </v-container>
    <CommentSidebar />
  </div>
</template>

<script>
import SinglePageGraph from "@/components/SinglePageGraphCoin.vue";
import Description from "@/components/Description.vue";
import CommentSidebar from "@/components/common/CommentSidebar.vue";
export default {
  name: "Coins",
  props: {
    coin: {
      type:String
    }
  },
  components: {
    SinglePageGraph,
    Description,
    CommentSidebar,
  },
  created() {
  },
};
</script>
