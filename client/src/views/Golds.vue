<template>
  <div class="coins">
    <SinglePageGraphGold :gold="gold" />
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="pa-0">
          <Description :gold="gold" />
        </v-col>
      </v-row>
    </v-container>
    <!--    <CommentSidebar />-->
  </div>
</template>

<script>
import SinglePageGraphGold from "@/components/SinglePageGraphGold.vue";
import Description from "@/components/Description.vue";
/*import CommentSidebar from "@/components/common/CommentSidebar";*/
export default {
  name: "Coins",
  props: {
    gold: {
      type: String
    }
  },
  components: {
    SinglePageGraphGold,
    Description
    /*CommentSidebar*/
  },
  created() {}
};
</script>
